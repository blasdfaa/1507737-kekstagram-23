import { sendFormData } from '../utils/api.js';
import { openAlert } from '../utils/popup-alert.js';
import { createValidator } from '../utils/regex-validate.js';
import { closeUploadModal } from '../utils/upload-modal.js';
import { resetFileInput } from './file-upload.js';

const photoUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = photoUploadForm.querySelector('.text__hashtags');
const commentInput = photoUploadForm.querySelector('.text__description');

const HASHTAG_VALID_REGEX = /^#\w+$/;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_COMMENT_LENGTH = 140;

const hashtagValidate = createValidator(HASHTAG_VALID_REGEX);

function onHashTagInputValid() {
  const hashTagsArray = hashtagsInput.value.split(' ');

  if (hashTagsArray.length > MAX_HASHTAG_NUMBERS) {
    hashtagsInput.setCustomValidity(`Хэш-тегов не должно быть больше чем ${MAX_HASHTAG_NUMBERS}`);
  } else {
    hashtagsInput.setCustomValidity('');
  }

  hashTagsArray.forEach((hashtag, index) => {
    if (!hashtag.startsWith('#')) {
      hashtagsInput.setCustomValidity('Хэш-тег должен начинается с символа # (решётка)');
    } else if (!hashtagValidate(hashtag)) {
      hashtagsInput.setCustomValidity(
        'Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
      );
    } else if (hashtag.indexOf(hashtag, index + 1) !== -1) {
      hashtagsInput.setCustomValidity('Хэш-теги не должны повторяться');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity(`Максимальная длинна одного хэш-тега не должна превышать ${MAX_HASHTAG_LENGTH} символов`);
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });
}

function onCommentInputValid() {
  const inputLength = commentInput.value.length;

  if (inputLength > MAX_COMMENT_LENGTH) {
    commentInput.setCustomValidity(`Превышен лимит на ${inputLength - MAX_COMMENT_LENGTH} символов!`);
  } else {
    commentInput.setCustomValidity('');
  }
}

function resetFormAfterUpload() {
  photoUploadForm.reset();

  closeUploadModal();
  resetFileInput();
}

photoUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendFormData(
    () => {
      resetFormAfterUpload(),
      openAlert('success');
    },
    () => {
      resetFormAfterUpload(),
      openAlert('error');
    },
    new FormData(photoUploadForm),
  );
});

hashtagsInput.addEventListener('input', onHashTagInputValid);
commentInput.addEventListener('input', onCommentInputValid);
