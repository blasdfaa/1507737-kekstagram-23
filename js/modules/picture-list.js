import { fetchPhotos } from '../utils/api.js';
import { openAlert } from '../utils/popup-alert.js';
import { activateFilters } from './filter-list.js';
import { renderFullPicture } from './fullscreen-photo.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function removeOldList() {
  picturesContainer.querySelectorAll('.picture').forEach((item) => item.remove());
}

function createPictureList(pictureData) {
  const pictureListFragment = document.createDocumentFragment();
  removeOldList();

  pictureData.forEach(({ id, url, description, likes, comments }) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.href = `#${id}`;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;

    picture.addEventListener('click', () => {
      renderFullPicture(url, description, likes, comments);
    });

    pictureListFragment.append(picture);
  });

  picturesContainer.append(pictureListFragment);
}

export function renderPictureList(sortFn) {
  fetchPhotos()
    .then((data) => {
      createPictureList(
        sortFn(data),
      ),
      activateFilters();
    })
    .catch(() => {
      openAlert('error', 'Ошибка загрузки данных с сервера', 'закрыть');
    });
}
