/* ============================================================
   DESIGN SYSTEM - MASTER AUTO SERVICE (FUNDO ESCURO & AZUL NEON)
   ============================================================ */
:root {
  --master-black: #0b0f19;
  --master-card-dark: #121826;
  --master-blue-neon: #0066FF;
  --master-blue-dark: #0044B3;
  --master-slate-border: #2a3447;
  --master-text-light: #f8fafc;
  --master-text-muted: #94a3b8;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

body {
  background-color: #060911;
  color: var(--master-text-light);
  padding: clamp(8px, 2vw, 20px) 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.app-container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* CARD EDITOR DE ENTRADA */
.card-editor {
  background: var(--master-card-dark);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--master-slate-border);
  overflow: hidden;
}

.editor-header {
  background: var(--master-black);
  color: #ffffff;
  padding: 20px 24px;
  border-bottom: 4px solid var(--master-blue-neon);
}

.header-logo-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-svg {
  width: 55px;
  height: 55px;
  flex-shrink: 0;
}

.editor-header h1 {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.editor-header h1 span {
  color: var(--master-blue-neon);
}

.sub-header-title {
  font-size: 0.82rem;
  color: var(--master-text-muted);
}

.editor-body {
  padding: 24px;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--master-text-light);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: var(--master-blue-neon);
  border-radius: 2px;
}

/* GRID DE FORMULÁRIO */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
  min-width: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.form-group label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--master-text-muted);
  margin-bottom: 6px;
}

.form-group input, .form-group select {
  padding: 10px 12px;
  font-size: 0.9rem;
  border: 1px solid var(--master-slate-border);
  border-radius: var(--radius-sm);
  background-color: #0b0f19;
  color: #ffffff;
  outline: none;
  transition: all 0.2s;
}

.form-group input:focus, .form-group select:focus {
  border-color: var(--master-blue-neon);
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.2);
}

/* TABELA DE EDIÇÃO */
.table-editor {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;
  table-layout: fixed;
}

.table-editor th {
  background-color: #0b0f19;
  color: var(--master-blue-neon);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--master-slate-border);
}

.table-editor td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--master-slate-border);
}

.table-editor input {
  width: 100%;
  min-width: 0;
  padding: 8px;
  border: 1px solid var(--master-slate-border);
  border-radius: 4px;
  background-color: #0b0f19;
  color: white;
  font-size: 0.88rem;
}

.col-qtd { width: 80px; }
.col-valor { width: 120px; }
.col-acao { width: 50px; }

.btn-add {
  background-color: var(--master-blue-neon);
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: 0.2s;
  margin-bottom: 24px;
}

.btn-add:hover {
  background-color: var(--master-blue-dark);
}

.btn-remove {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

/* BOTÕES DE AÇÃO */
.actions-bar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.btn-action {
  flex: 1;
  min-width: 200px;
  padding: 14px 20px;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.btn-whatsapp {
  background-color: #25d366;
  color: #ffffff;
}

.btn-whatsapp:hover {
  background-color: #1eb856;
}

.btn-download {
  background-color: var(--master-blue-neon);
  color: #ffffff;
}

.btn-download:hover {
  background-color: var(--master-blue-dark);
}

/* ============================================================
   TEMPLATE DA IMAGEM DO COMPROVANTE (DESIGN LOGO MASTER)
   ============================================================ */
.preview-wrapper {
  display: flex;
  justify-content: center;
  min-width: 0;
}

#orcamento-preview {
  width: 100%;
  max-width: 750px;
  background-color: #0b0f19;
  border-radius: 12px;
  border: 2px solid var(--master-slate-border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  color: #ffffff;
}

.preview-header {
  background: #06080f;
  padding: 24px 28px;
  border-bottom: 4px solid var(--master-blue-neon);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-brand-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preview-logo-svg {
  width: 65px;
  height: 65px;
}

.preview-brand h2 {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: 0.5px;
}

.preview-brand h2 span {
  color: var(--master-blue-neon);
}

.preview-brand p {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-top: 2px;
  letter-spacing: 1px;
}

.preview-meta {
  text-align: right;
  font-size: 0.82rem;
  color: #cbd5e1;
  line-height: 1.4;
}

.preview-body {
  padding: 24px 28px;
}

.preview-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 20px;
  background-color: #121826;
  border: 1px solid var(--master-slate-border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.preview-info-item {
  display: flex;
  flex-direction: column;
}

.preview-info-item .lbl {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--master-blue-neon);
}

.preview-info-item .val {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  margin-top: 2px;
  overflow-wrap: anywhere;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.preview-table th {
  background-color: #121826;
  color: var(--master-blue-neon);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid var(--master-slate-border);
}

.preview-table td {
  padding: 12px;
  border-bottom: 1px solid #1a2333;
  font-size: 0.88rem;
  color: #e2e8f0;
}

.preview-table tr:nth-child(even) {
  background-color: #0e1421;
}

.col-qtd-preview { width: 60px; text-align: center; }
.col-total-preview { width: 110px; text-align: right; }

.preview-summary-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.preview-summary-box {
  width: 290px;
  background-color: #121826;
  border: 1px solid var(--master-slate-border);
  border-radius: 8px;
  padding: 14px 16px;
}

.preview-summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 6px;
}

.preview-summary-row.total {
  border-top: 2px dashed var(--master-slate-border);
  margin-top: 8px;
  padding-top: 8px;
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
}

.preview-summary-row.total .price {
  color: var(--master-blue-neon);
}

.preview-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #1a2333;
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  line-height: 1.4;
}

#toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #121826;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  border-left: 4px solid #25d366;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  font-size: 0.9rem;
  display: none;
  z-index: 1000;
}

@media (max-width: 700px) {
  .app-container {
    gap: 16px;
  }

  .editor-header,
  .editor-body {
    padding: 18px;
  }

  .preview-header {
    padding: 18px;
    gap: 14px;
  }

  .preview-body {
    padding: 18px;
  }

  .preview-brand-container {
    gap: 10px;
  }

  .preview-logo-svg {
    width: 52px;
    height: 52px;
  }

  .preview-brand h2 {
    font-size: 1.15rem;
  }

  .preview-meta {
    font-size: 0.75rem;
  }
}

@media (max-width: 520px) {
  body {
    padding: 8px;
  }

  .editor-header,
  .editor-body {
    padding: 14px;
  }

  .header-logo-title {
    gap: 10px;
  }

  .logo-svg {
    width: 44px;
    height: 44px;
  }

  .editor-header h1 {
    font-size: 1.1rem;
  }

  .sub-header-title {
    font-size: 0.75rem;
  }

  .form-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .table-editor th,
  .table-editor td {
    padding: 6px 4px;
  }

  .table-editor th {
    font-size: 0.62rem;
  }

  .table-editor input {
    padding: 7px 4px;
    font-size: 0.75rem;
  }

  .col-qtd {
    width: 48px;
  }

  .col-valor {
    width: 82px;
  }

  .col-acao {
    width: 36px;
  }

  .btn-remove {
    padding: 6px 8px;
  }

  .actions-bar {
    flex-direction: column;
  }

  .btn-action {
    width: 100%;
    min-width: 0;
    padding: 12px;
    font-size: 0.85rem;
  }

  .preview-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px;
  }

  .preview-meta {
    width: 100%;
    text-align: left;
  }

  .preview-body {
    padding: 14px;
  }

  .preview-info-grid {
    gap: 10px;
    padding: 12px;
  }

  .preview-info-item .val {
    font-size: 0.82rem;
  }

  .preview-table th,
  .preview-table td {
    padding: 8px 5px;
    font-size: 0.75rem;
    overflow-wrap: anywhere;
  }

  .col-qtd-preview {
    width: 42px;
  }

  .col-total-preview {
    width: 88px;
  }

  .preview-summary-box {
    width: min(100%, 290px);
  }

  #toast {
    right: 8px;
    bottom: 8px;
    left: 8px;
    font-size: 0.8rem;
    text-align: center;
  }
}

/* ===== MELHORIAS ===== */
.logo-svg,.preview-logo-svg{border-radius:50%;object-fit:cover;display:block}
.form-group-wide{grid-column:1 / -1}
.form-group textarea{padding:10px 12px;font-size:.9rem;border:1px solid var(--master-slate-border);border-radius:var(--radius-sm);background:#0b0f19;color:#fff;outline:none;resize:vertical;transition:all .2s}
.form-group textarea:focus{border-color:var(--master-blue-neon);box-shadow:0 0 0 3px rgba(0,102,255,.2)}
.btn-share{background:#7c3aed;color:#fff}.btn-share:hover{background:#6d28d9}
.btn-secondary{background:transparent;color:var(--master-text-muted);border:1px solid var(--master-slate-border)}
.btn-secondary:hover{color:#fff;border-color:var(--master-blue-neon)}
.btn-action:disabled{opacity:.6;cursor:wait}
.btn-action:active,.btn-add:active{transform:scale(.98)}
.col-unit-preview{width:100px;text-align:right}
.preview-table td.num{text-align:right;white-space:nowrap}
.preview-obs{margin-top:18px;padding:12px 14px;background:#121826;border:1px solid var(--master-slate-border);border-radius:8px}
.preview-obs .lbl{font-size:.7rem;font-weight:700;text-transform:uppercase;color:var(--master-blue-neon)}
.preview-obs p{font-size:.85rem;color:#e2e8f0;margin-top:4px;white-space:pre-wrap;overflow-wrap:anywhere}
.preview-validade{margin-top:16px;text-align:center;font-size:.8rem;color:#94a3b8}
.preview-validade strong{color:#fff}
.btn-remove:hover{background:#dc2626}
@media (max-width:520px){.col-unit-preview{width:72px}.btn-add{width:100%}}

.preview-summary-row.total.solo{border-top:none;margin-top:0;padding-top:0;margin-bottom:0}

/* ===== ANIMAÇÕES DE ENTRADA ===== */
@keyframes entra-cima{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes entra-lado{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:none}}
@keyframes entra-zoom{from{opacity:0;transform:scale(.5) rotate(-14deg)}to{opacity:1;transform:none}}
@keyframes linha-entra{from{opacity:0;transform:translateX(-16px);background:rgba(0,102,255,.25)}to{opacity:1;transform:none;background:transparent}}
@keyframes pop{0%{transform:scale(1)}40%{transform:scale(1.18)}100%{transform:scale(1)}}
@keyframes toast-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes brilho-topo{from{width:0}to{width:100%}}
.card-editor{animation:entra-cima .7s cubic-bezier(.2,.8,.2,1) both}
.editor-header{position:relative}
.editor-header::after{content:"";position:absolute;left:0;bottom:-4px;height:4px;background:var(--master-blue-neon);box-shadow:0 0 14px var(--master-blue-neon);animation:brilho-topo 1.1s .3s ease-out both}
.logo-svg{animation:entra-zoom .9s .15s cubic-bezier(.2,.9,.3,1.3) both}
.header-logo-title>div{animation:entra-lado .6s .4s both}
.editor-body>*{animation:entra-cima .55s cubic-bezier(.2,.8,.2,1) both}
.editor-body>:nth-child(1){animation-delay:0.42s}
.editor-body>:nth-child(2){animation-delay:0.49s}
.editor-body>:nth-child(3){animation-delay:0.56s}
.editor-body>:nth-child(4){animation-delay:0.63s}
.editor-body>:nth-child(5){animation-delay:0.70s}
.editor-body>:nth-child(6){animation-delay:0.77s}
.editor-body>:nth-child(7){animation-delay:0.84s}
.editor-body>:nth-child(8){animation-delay:0.91s}
.editor-body>:nth-child(9){animation-delay:0.98s}
.editor-body>:nth-child(10){animation-delay:1.05s}
.editor-body>:nth-child(11){animation-delay:1.12s}
.editor-body>:nth-child(12){animation-delay:1.19s}
.preview-wrapper{animation:entra-cima .8s .7s cubic-bezier(.2,.8,.2,1) both}
.linha-nova{animation:linha-entra .5s ease-out both}
#view-total{display:inline-block}
#view-total.pop{animation:pop .45s ease-out}
#toast{animation:toast-in .35s ease-out both}
.btn-action,.btn-add{transition:transform .2s,background-color .2s,box-shadow .2s}
.btn-action:hover:not(:disabled),.btn-add:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,102,255,.25)}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}

/* ===== SERVIÇOS RÁPIDOS E HISTÓRICO ===== */
.rapidos-label{font-size:.75rem;font-weight:700;text-transform:uppercase;color:var(--master-text-muted);margin-bottom:8px}
.chips-rapidos{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.chip-rapido{background:#0b0f19;color:var(--master-text-light);border:1px solid var(--master-slate-border);border-radius:999px;padding:7px 14px;font-size:.8rem;cursor:pointer;transition:all .2s}
.chip-rapido:hover{border-color:var(--master-blue-neon);color:var(--master-blue-neon);transform:translateY(-2px)}
.chip-rapido:active{transform:scale(.95)}
.section-hist{margin-top:28px}
.historico{display:flex;flex-direction:column;gap:8px}
.hist-vazio{color:var(--master-text-muted);font-size:.85rem}
.hist-item{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;background:#0b0f19;border:1px solid var(--master-slate-border);border-radius:var(--radius-md);padding:10px 14px}
.hist-info{display:flex;flex-direction:column;min-width:0;font-size:.85rem}
.hist-info span{color:var(--master-text-muted);font-size:.78rem;overflow-wrap:anywhere}
.hist-acoes{display:flex;gap:8px}
.hist-acoes button{background:var(--master-blue-neon);color:#fff;border:none;border-radius:var(--radius-sm);padding:7px 14px;font-weight:700;font-size:.78rem;cursor:pointer}
.hist-acoes button.del{background:transparent;border:1px solid #ef4444;color:#ef4444}
.hist-acoes button:hover{filter:brightness(1.15)}
@media (max-width:520px){.hist-item{flex-direction:column;align-items:stretch}.hist-acoes button{flex:1}}

/* ===== ASSISTENTE IA ===== */
#toast{bottom:84px}
#ia-fab{position:fixed;right:20px;bottom:20px;z-index:900;display:flex;align-items:center;gap:8px;background:var(--master-blue-neon);color:#fff;border:none;border-radius:999px;padding:14px 18px;font-size:1.2rem;font-weight:700;cursor:pointer;box-shadow:0 6px 20px rgba(0,102,255,.5);transition:transform .2s;animation:entra-cima .6s 1.6s both}
#ia-fab span{font-size:.85rem}
#ia-fab:hover{transform:translateY(-3px)}
#ia-fab.aberto{display:none}
.ia-panel{position:fixed;right:20px;bottom:20px;z-index:950;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 40px));display:flex;flex-direction:column;background:var(--master-card-dark);border:1px solid var(--master-slate-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);overflow:hidden;animation:entra-cima .35s both}
.ia-panel[hidden]{display:none}
.ia-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:var(--master-black);border-bottom:3px solid var(--master-blue-neon)}
.ia-head strong{display:block;font-size:.95rem}.ia-head span{font-size:.75rem;color:var(--master-text-muted)}
.ia-head button{background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;padding:6px}
.ia-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.ia-bolha{max-width:88%;padding:10px 13px;border-radius:14px;font-size:.88rem;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere;animation:entra-cima .3s both}
.ia-bolha.bot{align-self:flex-start;background:#0b0f19;border:1px solid var(--master-slate-border)}
.ia-bolha.user{align-self:flex-end;background:var(--master-blue-neon);color:#fff}
.ia-bolha.digitando{color:var(--master-text-muted);font-style:italic}
.ia-sugestoes{display:flex;gap:6px;overflow-x:auto;padding:4px 12px 8px;scrollbar-width:none}
.ia-sugestoes::-webkit-scrollbar{display:none}
.ia-sugestoes button{flex:none;max-width:240px;background:#0b0f19;color:var(--master-text-light);border:1px solid var(--master-slate-border);border-radius:999px;padding:7px 12px;font-size:.75rem;cursor:pointer;white-space:normal;text-align:left}
.ia-sugestoes button:hover{border-color:var(--master-blue-neon);color:var(--master-blue-neon)}
.ia-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--master-slate-border)}
.ia-form input{flex:1;min-width:0;padding:10px 12px;border:1px solid var(--master-slate-border);border-radius:var(--radius-sm);background:#0b0f19;color:#fff;font-size:16px;outline:none}
.ia-form input:focus{border-color:var(--master-blue-neon)}
.ia-form button{background:var(--master-blue-neon);color:#fff;border:none;border-radius:var(--radius-sm);padding:0 16px;font-weight:700;cursor:pointer}
@media (max-width:520px){.ia-panel{right:8px;bottom:8px;width:calc(100vw - 16px)}#ia-fab{right:12px;bottom:12px}}
