import { setDisplayById } from './helpers.js';

function buttonsHide() {
  Array.from(document.querySelectorAll('.action-btn'), btn => {
    btn.style.display = 'none';
  });
}

export default function buttons(state) {
  buttonsHide();

  switch(state) {
    case 'start':
      return setDisplayById('#stop', 'inline-block');
    break;
    case 'stop':
      setDisplayById('#start', 'inline-block');
      setDisplayById('#reset', 'inline-block');
    break;
    case 'end':
      return setDisplayById('#reset', 'inline-block');
    case 'reset':
      return setDisplayById('#start', 'inline-block');
    default:
    break;
  }
}
