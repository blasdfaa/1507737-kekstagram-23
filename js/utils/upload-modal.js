import { isEscEvent } from './esc-event.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');

function escKeyHandler(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
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

export function openUploadModal() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', escKeyHandler);
  document.addEventListener('click', offEscKeyHandler);
}

export function closeUploadModal() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeUploadModal);
  document.removeEventListener('keydown', escKeyHandler);
  document.removeEventListener('click', offEscKeyHandler);
}
