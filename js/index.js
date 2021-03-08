import IMG_LIST from './gallery-items.js';
import {galleryContainer, modalRef, originalImgRef, overlayRef} from './query-selectors.js'

galleryContainer.addEventListener('click', onGalleryContainerClick);
modalRef.addEventListener('click', onButtonCloseClick);
overlayRef.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscPress);
window.addEventListener('keydown', onArrowPress);

function onGalleryContainerClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    };

    modalRef.classList.add('is-open');
    originalImgRef.src = event.target.dataset.source;
    originalImgRef.alt = event.target.alt;
};

function onButtonCloseClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    removeImg();
};
    
function onOverlayClick(e) {
    if (e.target.nodeName === 'IMG') {
        return;
    }
    removeImg();
};

function onEscPress(e) {
    if (e.key !== 'Escape') {
        return;
    };
    removeImg();
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
            removeImg()
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
            removeImg()
            }
        }
    };
    
};

function removeImg() {
    modalRef.classList.remove('is-open');
    originalImgRef.src = "";
    originalImgRef.alt = "";
};