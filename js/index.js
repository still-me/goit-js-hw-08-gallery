import IMG_LIST from '../gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const originalImgRef = document.querySelector('.lightbox__image');
const overlayRef = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGallery(IMG_LIST);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
modalRef.addEventListener('click', onButtonCloseClick);
overlayRef.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscPress);
window.addEventListener('keydown', onArrowPress);

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

function onGalleryContainerClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return 
    }

    modalRef.classList.add('is-open');
    originalImgRef.src = event.target.dataset.source;
    originalImgRef.alt = event.target.alt;

};


function onButtonCloseClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }

    modalRef.classList.remove('is-open');
    originalImgRef.src = "";
    originalImgRef.alt = "";
};
    

function onOverlayClick(e) {
    if (e.target.nodeName === 'IMG') {
        return;
    }

    modalRef.classList.remove('is-open');
    originalImgRef.src = "";
    originalImgRef.alt = "";

};

function onEscPress(e) {
    if (e.key !== 'Escape') {
        return;
    };

    modalRef.classList.remove('is-open');
    originalImgRef.src = "";
    originalImgRef.alt = "";

};

function onArrowPress(e) {
    let currentPictureIndex;


    if (modalRef.classList.contains('is-open')) {
        if (e.key === 'ArrowRight') {
            IMG_LIST.forEach((elem, index) => {
                if (elem.original === originalImgRef.src) {
                    currentPictureIndex = index
                }
            }) 
            
            if (currentPictureIndex < IMG_LIST.length - 1) {
                originalImgRef.src = IMG_LIST[currentPictureIndex + 1].original;
                originalImgRef.alt = IMG_LIST[currentPictureIndex + 1].description;
            } else {
            modalRef.classList.remove('is-open')
            originalImgRef.src = "";
            originalImgRef.alt = "";
            }
        }

        if (e.key === 'ArrowLeft') {
            IMG_LIST.forEach((elem, index) => {
                if (elem.original === originalImgRef.src) {
                    currentPictureIndex = index;
                }
            }) 

            if (currentPictureIndex > 0) {
                 originalImgRef.src = IMG_LIST[currentPictureIndex - 1].original;
                originalImgRef.alt = IMG_LIST[currentPictureIndex - 1].description;
            } else {
            modalRef.classList.remove('is-open')
            originalImgRef.src = "";
            originalImgRef.alt = "";
            }
        }
    };
    
}