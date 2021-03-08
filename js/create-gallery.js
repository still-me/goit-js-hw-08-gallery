import { galleryContainer } from './query-selectors.js'
import IMG_LIST from './gallery-items.js';

export default 
function createGallery(images) {
    return images 
        .map(({ preview, original, description }) => {
            return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                 <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
                </a>
            </li>
            `
        })
        .join('');
};

const galleryMarkup = createGallery(IMG_LIST);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);





 
