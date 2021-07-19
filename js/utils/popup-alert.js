import { isEscEvent } from './esc-event.js';
import { isOutsideEvent } from './out-click-event.js';

export function openAlert(type, message, buttonText) {
  const alertTemplate = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const alert = alertTemplate.cloneNode(true);

  const closeAlertButton = alert.querySelector(`.${type}__button`);

  if (message) {
    alert.querySelector(`.${type}__title`).textContent = message;
    closeAlertButton.textContent = buttonText;
  }

  function closeHandler() {
    alert.remove();

    closeAlertButton.removeEventListener('click', closeHandler);
    document.removeEventListener('click', closeOnOutClickHandler);
    document.removeEventListener('keydown', closeOnEscHandler);
  }

  function closeOnEscHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      alert.remove();
    }

    closeAlertButton.removeEventListener('click', closeHandler);
    document.removeEventListener('click', closeOnOutClickHandler);
    document.removeEventListener('keydown', closeOnEscHandler);
  }

  function closeOnOutClickHandler(evt) {
    if ( isOutsideEvent(evt)) {
      evt.preventDefault();
      alert.remove();
    }
  }

  document.body.append(alert);

  closeAlertButton.addEventListener('click', closeHandler);
  document.addEventListener('click', closeOnOutClickHandler);
  document.addEventListener('keydown', closeOnEscHandler);
}

