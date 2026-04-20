export const elements = {
  svgContainer: document.getElementById('diagram'),
  btnPlayPause: document.getElementById('btn-play-pause'),
  btnRestart: document.getElementById('btn-restart'),
  greenFillOverlay: document.getElementById('green-fill-overlay'),
  orangeFillOverlay: document.getElementById('orange-fill-overlay'),
  barrenLiquid: document.getElementById('barren-liquid'),
  pregnantLiquid: document.getElementById('pregnant-liquid'),
  oreColorFill: document.getElementById('ore-color-fill'),
  continuousFlows: document.querySelectorAll('.continuous-flow'),
  modal: document.getElementById('modal'),
  modalClose: document.getElementById('btn-close-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalIcon: document.getElementById('modal-icon'),
  modalDesc: document.getElementById('modal-desc')
};
export const delay = ms => new Promise(res => setTimeout(res, ms));
