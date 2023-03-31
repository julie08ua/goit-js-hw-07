import { galleryItems } from './gallery-items.js';
// Change code below this line

const container = document.querySelector('.gallery');
const markup = galleryItems.map(({ preview, original, description }) =>
    `<li>
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
  </li>`
);

container.insertAdjacentHTML('beforeend', markup.join(''));
container.addEventListener('click', onClick);

function onClick(e) {
    const { target } = e;
    if (!target.classList.contains('gallery__image')) {
        return;
    }

    e.preventDefault();
    
    const galleryImageSource = target.dataset.source;
    const currentImage = galleryItems.find(({ original }) => original === galleryImageSource);

    const instance = basicLightbox.create(`
	<img
      class="gallery__image"
      src="${currentImage.original}"
      data-source="${currentImage.original}"
      alt="${currentImage.description}"
    />
`,
        {
        onShow: (instance) => {
                window.addEventListener('keydown', onEscKeyPress);
          },
          onClose: (instance) => {
         window.removeEventListener('keydown', onEscKeyPress);
       },}
        )
  instance.show();

  function onEscKeyPress(e) {
          if (e.code === 'Escape') {
              instance.close();
                    }
        }
}



