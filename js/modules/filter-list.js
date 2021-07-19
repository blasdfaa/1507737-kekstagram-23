import { shuffleArray } from '../utils/shuffle.js';
import { renderPictureList } from './picture-list.js';
import { debounce } from '../utils/debounce.js';

const RERENDER_DELAY = 500;


const NUMBER_OF_RANDOM_PHOTOS = 10;

const filterContainer = document.querySelector('.img-filters');
const filterButtons = [...document.querySelectorAll('.img-filters__button')];

function filterByDefault(photos) {
  return photos;
}

function filterByRandom(photos) {
  return shuffleArray(photos).slice(0, NUMBER_OF_RANDOM_PHOTOS);
}

function filterByComments(photos) {
  const photosCopy = photos.slice();

  return photosCopy.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
}

function changeFilterHandler(evt) {
  const target = evt.target;

  switch (target.id) {
    case 'filter-default':
      renderPictureList(filterByDefault);
      break;
    case 'filter-random':
      renderPictureList(filterByRandom);
      break;
    case 'filter-discussed':
      renderPictureList(filterByComments);
      break;
  }
}

renderPictureList(filterByDefault);

filterContainer.addEventListener('click', debounce(changeFilterHandler, RERENDER_DELAY));

export function activateFilters() {
  filterContainer.classList.remove('img-filters--inactive');

  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target && target.matches('.img-filters__button')) {
      filterButtons.forEach((btn) => {
        btn.classList.remove('img-filters__button--active');
      });

      target.classList.add('img-filters__button--active');
    }
  });
}
