import { isEscEvent } from './esc-event.js';

const modalOverlay = document.querySelector('.big-picture');
const closeButton = document.querySelector('#upload-cancel');
const commentLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

function escKeyHandler(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFullscreenModal();
  }
}

function offEscKeyHandler(evt) {
  const inputFocus = evt.target.matches('input:focus') || evt.target.matches('textarea:focus');

  if (inputFocus) {
    document.removeEventListener('keydown', escKeyHandler);
  } else {
    document.addEventListener('keydown', escKeyHandler);
  }
}

export function openFullscreenModal() {
  modalOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', closeFullscreenModal);
  document.addEventListener('keydown', escKeyHandler);
  document.addEventListener('click', offEscKeyHandler);
}

export function closeFullscreenModal() {
  modalOverlay.classList.add('hidden');
  commentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeFullscreenModal);
  document.removeEventListener('keydown', escKeyHandler);
  document.removeEventListener('click', offEscKeyHandler);
}
