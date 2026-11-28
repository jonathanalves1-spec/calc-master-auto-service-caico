const CHAVE = 'masterauto_orcamento_v2';
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arred = (n) => Math.round(n * 100) / 100;
const formatarBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const ITENS_PADRAO = [
  { descricao: 'Troca de Óleo 5W30 + Filtro', qtd: 1, valor: 280.0 },
  { descricao: 'Alinhamento e Balanceamento 3D', qtd: 1, valor: 120.0 }
];
let itens = ITENS_PADRAO.map((i) => ({ ...i }));
let codigo = novoCodigo();

function novoCodigo() { return Math.floor(1000 + Math.random() * 9000); }

/* ---------- Salvamento automático ---------- */
function estado() {
  return {
    cliente: $('inp-cliente').value, carro: $('inp-carro').value, placa: $('inp-placa').value,
    pagamento: $('inp-pagamento').value, desconto: $('inp-desconto').value,
    repassar: $('inp-repassar-taxa').value, parcelas: $('inp-parcelas').value, validade: $('inp-validade').value,
    obs: $('inp-obs').value, itens, codigo
  };
}

function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(estado())); } catch (e) {}
}

function aplicarEstado(d) {
  $('inp-cliente').value = d.cliente ?? '';
  $('inp-carro').value = d.carro ?? '';
  $('inp-placa').value = d.placa ?? '';
  $('inp-pagamento').value = d.pagamento;
  $('inp-desconto').value = d.desconto ?? 0;
  $('inp-repassar-taxa').value = d.repassar;
  $('inp-validade').value = d.validade;
  $('inp-parcelas').value = d.parcelas || '1';
  $('inp-obs').value = d.obs ?? '';
  if (Array.isArray(d.itens)) itens = d.itens.map((i) => ({ ...i }));
  if (d.codigo) codigo = d.codigo;
}

function carregar() {
  try {
    const d = JSON.parse(localStorage.getItem(CHAVE));
    if (d) aplicarEstado(d);
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  carregar();
  ['inp-cliente', 'inp-carro', 'inp-placa', 'inp-desconto', 'inp-obs'].forEach((id) => $(id).addEventListener('input', atualizarPreview));
  ['inp-pagamento', 'inp-parcelas', 'inp-repassar-taxa', 'inp-validade'].forEach((id) => $(id).addEventListener('change', atualizarPreview));

  $('btn-adicionar-item').addEventListener('click', adicionarItem);
  $('btn-copiar-wa').addEventListener('click', (e) => comCarregando(e.currentTarget, copiarImagemWhatsApp));
  $('btn-baixar-png').addEventListener('click', (e) => comCarregando(e.currentTarget, baixarImagemPNG));
  $('btn-compartilhar').addEventListener('click', (e) => comCarregando(e.currentTarget, compartilharImagem));
  $('btn-novo').addEventListener('click', novoOrcamento);

  $('btn-salvar').addEventListener('click', () => salvarHistorico(false));
  montarChips();
  renderHistorico();
  renderizarTabelaEditor();
  atualizarPreview();
});

/* ---------- Itens ---------- */
function renderizarTabelaEditor() {
  const tbody = $('tbody-itens');
  tbody.innerHTML = itens.map((item, i) => `
    <tr>
      <td><input type="text" value="${esc(item.descricao)}" data-campo="descricao" data-index="${i}" aria-label="Descrição"></td>
      <td><input type="number" min="1" step="1" inputmode="numeric" value="${item.qtd}" data-campo="qtd" data-index="${i}" aria-label="Quantidade"></td>
      <td><input type="number" min="0" step="0.01" inputmode="decimal" value="${item.valor}" data-campo="valor" data-index="${i}" aria-label="Valor unitário"></td>
      <td><button class="btn-remove" data-index="${i}" aria-label="Remover item">X</button></td>
    </tr>`).join('');

  tbody.querySelectorAll('input').forEach((inp) => inp.addEventListener('input', (e) => atualizarItem(+e.target.dataset.index, e.target.dataset.campo, e.target.value)));
  tbody.querySelectorAll('.btn-remove').forEach((b) => b.addEventListener('click', (e) => removerItem(+e.currentTarget.dataset.index)));
}

function adicionarItem() {
  itens.push({ descricao: 'Novo Serviço / Peça', qtd: 1, valor: 0 });
  renderizarTabelaEditor();
  atualizarPreview();
  $('tbody-itens').lastElementChild.classList.add('linha-nova');
  const inputs = $('tbody-itens').querySelectorAll('input[data-campo="descricao"]');
  const ultimo = inputs[inputs.length - 1];
  if (ultimo) { ultimo.focus(); ultimo.select(); }
}

function removerItem(i) { itens.splice(i, 1); renderizarTabelaEditor(); atualizarPreview(); }

function atualizarItem(i, campo, valor) {
  if (!itens[i]) return;
  itens[i][campo] = (campo === 'descricao') ? valor : Math.max(0, parseFloat(valor) || 0);
  atualizarPreview();
}

/* ---------- Preview e cálculos ---------- */
function celula(texto, classe, estilo) {
  const td = document.createElement('td');
  td.textContent = texto;
  if (classe) td.className = classe;
  if (estilo) td.style.textAlign = estilo;
  return td;
}

function atualizarPreview() {
  const pagamento = $('inp-pagamento').value;
  $('view-cliente').textContent = $('inp-cliente').value.trim() || '---';
  $('view-carro').textContent = $('inp-carro').value.trim() || '---';
  $('view-placa').textContent = $('inp-placa').value.trim().toUpperCase() || '---';
  $('view-codigo').textContent = codigo;

  const hoje = new Date();
  $('view-data').textContent = hoje.toLocaleDateString('pt-BR');
  const validade = new Date(hoje);
  validade.setDate(validade.getDate() + parseInt($('inp-validade').value, 10));
  $('view-validade').textContent = validade.toLocaleDateString('pt-BR');

  const obs = $('inp-obs').value.trim();
  $('row-obs').style.display = obs ? 'block' : 'none';
  $('view-obs').textContent = obs;

  const tbody = $('view-tbody');
  tbody.innerHTML = '';
  let subtotal = 0;
  itens.forEach((item) => {
    const totalItem = arred(item.qtd * item.valor);
    subtotal += totalItem;
    const tr = document.createElement('tr');
    tr.append(celula(item.descricao || '---'), celula(item.qtd, '', 'center'), celula(formatarBRL(item.valor), 'num'), celula(formatarBRL(totalItem), 'num'));
    tbody.appendChild(tr);
  });

  const desconto = Math.max(0, parseFloat($('inp-desconto').value) || 0);
  const base = Math.max(0, arred(subtotal - desconto));
  const temTaxa = pagamento.includes('Cartão');
  const repassar = $('inp-repassar-taxa').value === 'repassar';
  const taxa = temTaxa ? arred(base * 0.16) : 0;
  const total = temTaxa && repassar ? arred(base + taxa) : base;

  $('row-view-taxa').style.display = temTaxa ? 'flex' : 'none';
  $('view-taxa').textContent = temTaxa ? formatarBRL(taxa) + (repassar ? '' : ' (Oficina)') : '';
  $('view-subtotal').textContent = formatarBRL(subtotal);
  $('view-desconto').textContent = formatarBRL(desconto);
  ultimoTotal = total;
  const txtTotal = formatarBRL(total);
  if ($('view-total').textContent !== txtTotal) {
    $('view-total').textContent = txtTotal;
    $('view-total').classList.remove('pop');
    void $('view-total').offsetWidth;
    $('view-total').classList.add('pop');
  }

  // No cartão, o resumo mostra apenas o valor a digitar na maquininha
  $('row-view-subtotal').style.display = temTaxa ? 'none' : 'flex';
  $('row-view-desconto').style.display = temTaxa ? 'none' : 'flex';
  $('row-view-taxa').style.display = 'none';
  $('row-view-total').classList.toggle('solo', temTaxa);
  $('lbl-total').textContent = temTaxa ? 'Valor da maquininha:' : 'Total Final:';

  // Parcelas (somente no cartão, de 1x a 10x)
  $('grupo-parcelas').style.display = temTaxa ? 'flex' : 'none';
  Array.from($('inp-parcelas').options).forEach((op) => {
    const n = parseInt(op.value, 10);
    op.textContent = `${n}x de ${formatarBRL(arred(total / n))}`;
  });
  const parcelas = temTaxa ? parseInt($('inp-parcelas').value, 10) || 1 : 1;
  $('view-pagamento').textContent = temTaxa ? `${parcelas}x de ${formatarBRL(arred(total / parcelas))}` : pagamento;
  salvar();
}

function novoOrcamento() {
  if (!confirm('Começar um novo orçamento? Os dados atuais serão apagados.')) return;
  ['inp-cliente', 'inp-carro', 'inp-placa', 'inp-obs'].forEach((id) => ($(id).value = ''));
  $('inp-desconto').value = 0;
  $('inp-validade').value = '7';
  $('inp-parcelas').value = '1';
  itens = [{ descricao: 'Novo Serviço / Peça', qtd: 1, valor: 0 }];
  codigo = novoCodigo();
  renderizarTabelaEditor();
  atualizarPreview();
  $('inp-cliente').focus();
}

/* ---------- Imagem ---------- */
async function gerarBlob() {
  await Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {})));
  return html2canvas($('orcamento-preview'), { scale: 2, backgroundColor: '#0b0f19', useCORS: true })
    .then((canvas) => new Promise((ok, erro) => canvas.toBlob((b) => (b ? ok(b) : erro(new Error('blob'))), 'image/png')));
}

const nomeArquivo = () => `MasterAuto_${($('inp-placa').value.trim() || 'Orcamento').replace(/[^\w-]/g, '')}.png`;

async function comCarregando(btn, fn) {
  const texto = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = '⏳ Gerando imagem...';
  try { await fn(); salvarHistorico(true); } catch (e) { exibirToast('Não foi possível gerar a imagem. Tente novamente.', true); }
  btn.disabled = false;
  btn.innerHTML = texto;
}

async function copiarImagemWhatsApp() {
  if (!navigator.clipboard || !window.ClipboardItem) {
    exibirToast('Seu navegador não copia imagens. Use "Compartilhar" ou "Baixar".', true);
    return;
  }
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': gerarBlob() })]);
  exibirToast('Imagem copiada! Abra o WhatsApp e cole (Ctrl+V).');
}

async function baixarImagemPNG() {
  const blob = await gerarBlob();
  const link = document.createElement('a');
  link.download = nomeArquivo();
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 4000);
}

async function compartilharImagem() {
  const blob = await gerarBlob();
  const arquivo = new File([blob], nomeArquivo(), { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
    try { await navigator.share({ files: [arquivo], title: 'Orçamento Master Auto Service' }); } catch (e) {}
  } else {
    await baixarImagemPNG();
    exibirToast('Compartilhamento indisponível aqui. A imagem foi baixada.');
  }
}

let timerToast;
function exibirToast(msg, erro) {
  const t = $('toast');
  t.textContent = msg;
  t.style.borderLeftColor = erro ? '#ef4444' : '#25d366';
  t.style.display = 'block';
  clearTimeout(timerToast);
  timerToast = setTimeout(() => { t.style.display = 'none'; }, 4000);
}

/* ---------- Serviços rápidos (valores de exemplo, edite à vontade) ---------- */
let ultimoTotal = 0;
const SERVICOS_RAPIDOS = [
  ['Troca de óleo + filtro', 280], ['Alinhamento e balanceamento 3D', 120], ['Pastilhas de freio', 180],
  ['Revisão geral', 350], ['Diagnóstico com scanner', 100], ['Troca de correia dentada', 450],
  ['Bateria', 420], ['Mão de obra', 100]
];

function montarChips() {
  const box = $('chips-rapidos');
  box.innerHTML = '';
  SERVICOS_RAPIDOS.forEach(([nome, valor]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip-rapido';
    b.textContent = '+ ' + nome;
    b.addEventListener('click', () => {
      itens.push({ descricao: nome, qtd: 1, valor });
      renderizarTabelaEditor();
      $('tbody-itens').lastElementChild.classList.add('linha-nova');
      atualizarPreview();
    });
    box.appendChild(b);
  });
}

/* ---------- Histórico de orçamentos ---------- */
const CHAVE_HIST = 'masterauto_historico_v1';
function lerHist() { try { return JSON.parse(localStorage.getItem(CHAVE_HIST)) || []; } catch (e) { return []; } }

function salvarHistorico(silencioso) {
  try {
    let lista = lerHist().filter((x) => x.codigo !== codigo);
    lista.unshift({
      codigo, data: new Date().toISOString(), cliente: $('inp-cliente').value.trim(),
      carro: $('inp-carro').value.trim(), placa: $('inp-placa').value.trim().toUpperCase(),
      total: ultimoTotal, estado: estado()
    });
    localStorage.setItem(CHAVE_HIST, JSON.stringify(lista.slice(0, 20)));
    renderHistorico();
    if (!silencioso) exibirToast('Orçamento salvo no histórico.');
  } catch (e) {}
}

function renderHistorico() {
  const el = $('historico');
  const lista = lerHist();
  if (!lista.length) { el.innerHTML = '<p class="hist-vazio">Nenhum orçamento salvo ainda.</p>'; return; }
  el.innerHTML = lista.map((x, i) => `
    <div class="hist-item">
      <div class="hist-info">
        <strong>#${esc(x.codigo)} · ${esc(x.cliente || 'Sem nome')}</strong>
        <span>${esc(x.carro || '---')} ${esc(x.placa || '')} · ${formatarBRL(x.total || 0)} · ${new Date(x.data).toLocaleDateString('pt-BR')}</span>
      </div>
      <div class="hist-acoes">
        <button type="button" data-abrir="${i}">Abrir</button>
        <button type="button" data-del="${i}" class="del">Excluir</button>
      </div>
    </div>`).join('');
  el.querySelectorAll('[data-abrir]').forEach((b) => b.addEventListener('click', () => {
    const x = lerHist()[+b.dataset.abrir];
    if (!x) return;
    aplicarEstado(x.estado);
    renderizarTabelaEditor();
    atualizarPreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    exibirToast('Orçamento #' + x.codigo + ' carregado.');
  }));
  el.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => {
    if (!confirm('Excluir este orçamento do histórico?')) return;
    const l = lerHist(); l.splice(+b.dataset.del, 1);
    try { localStorage.setItem(CHAVE_HIST, JSON.stringify(l)); } catch (e) {}
    renderHistorico();
  }));
}

/* ---------- Assistente IA ---------- */
const FAQ_LOCAL = {
  'Como explicar a taxa de 16% do cartão ao cliente?': 'O acréscimo cobre a taxa que a maquininha cobra da oficina no parcelamento. Quem quer evitar pode pagar no PIX ou no dinheiro, sem acréscimo.',
  'Quando trocar a correia dentada?': 'Em geral entre 40 mil e 60 mil km ou a cada 4 a 5 anos, mas varia por modelo. Confira o manual do veículo.',
  'Com que frequência fazer a troca de óleo?': 'Em média a cada 5.000 a 10.000 km ou 6 a 12 meses, conforme o tipo de óleo e o manual do carro.',
  'Que serviços sugerir junto com alinhamento?': 'Balanceamento, rodízio e verificação dos pneus, e checagem de suspensão, pivôs e terminais.'
};
const conversaIA = [];

function sugestoesIA() {
  const lista = Object.keys(FAQ_LOCAL);
  const carro = $('inp-carro').value.trim();
  const ultimo = itens.length ? itens[itens.length - 1].descricao : '';
  if (carro) lista.unshift(`Que revisões sugerir para ${carro}?`);
  if (ultimo && ultimo !== 'Novo Serviço / Peça') lista.unshift(`Que serviços complementares sugerir com "${ultimo}"?`);
  return lista.slice(0, 4);
}

function renderSugestoesIA() {
  const box = $('ia-sugestoes');
  box.innerHTML = '';
  sugestoesIA().forEach((t) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = t;
    b.addEventListener('click', () => perguntarIA(t));
    box.appendChild(b);
  });
}

function balaoIA(texto, quem) {
  const d = document.createElement('div');
  d.className = 'ia-bolha ' + quem;
  d.textContent = texto;
  $('ia-msgs').appendChild(d);
  $('ia-msgs').scrollTop = $('ia-msgs').scrollHeight;
  return d;
}

function mostrarRespostaIA(bolha, texto) {
  const m = texto.match(/^\s*SERVICOS:\s*(.+)$/im);
  bolha.className = 'ia-bolha bot';
  bolha.textContent = texto.replace(/^\s*SERVICOS:.*$/im, '').trim();
  if (!m) return;
  const box = document.createElement('div');
  box.className = 'ia-add';
  m[1].split('|').map((n) => n.trim()).filter(Boolean).slice(0, 4).forEach((nome) => {
    nome = nome.slice(0, 80);
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = '+ ' + nome;
    b.addEventListener('click', () => {
      itens.push({ descricao: nome, qtd: 1, valor: 0 });
      renderizarTabelaEditor();
      $('tbody-itens').lastElementChild.classList.add('linha-nova');
      atualizarPreview();
      b.disabled = true;
      b.textContent = '✓ ' + nome;
      exibirToast('Serviço adicionado. Defina o valor na tabela.');
    });
    box.appendChild(b);
  });
  bolha.appendChild(box);
}

async function perguntarIA(texto) {
  texto = (texto || '').trim();
  if (!texto) return;
  $('ia-input').value = '';
  balaoIA(texto, 'user');
  conversaIA.push({ role: 'user', content: texto });
  const espera = balaoIA('Pensando...', 'bot digitando');
  try {
    const r = await fetch('/api/assistente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagens: conversaIA.slice(-10), contexto: { carro: $('inp-carro').value, itens: itens.map((i) => i.descricao) } })
    });
    if (!r.ok) throw new Error(String(r.status));
    const d = await r.json();
    mostrarRespostaIA(espera, d.resposta);
    conversaIA.push({ role: 'assistant', content: d.resposta });
  } catch (e) {
    espera.className = 'ia-bolha bot';
    espera.textContent = FAQ_LOCAL[texto] || (e.message === '429' ? 'Muitas perguntas seguidas. Aguarde alguns minutos e tente de novo.' : 'O assistente está indisponível no momento. Verifique a configuração da chave de IA no servidor.');
    conversaIA.push({ role: 'assistant', content: espera.textContent });
  }
  $('ia-msgs').scrollTop = $('ia-msgs').scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
  const abrir = (v) => {
    $('ia-panel').hidden = !v;
    $('ia-fab').classList.toggle('aberto', v);
    if (v) {
      if (!$('ia-msgs').children.length) balaoIA('Olá! Sou o assistente da Master Auto. Posso tirar dúvidas e sugerir serviços para o orçamento. Escolha uma sugestão ou escreva sua pergunta.', 'bot');
      renderSugestoesIA();
      $('ia-input').focus();
    }
  };
  $('ia-fab').addEventListener('click', () => abrir($('ia-panel').hidden));
  $('ia-fechar').addEventListener('click', () => abrir(false));
  $('ia-enviar').addEventListener('click', () => perguntarIA($('ia-input').value));
  $('ia-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') perguntarIA($('ia-input').value); });
});
