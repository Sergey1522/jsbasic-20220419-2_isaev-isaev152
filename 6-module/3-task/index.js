import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.elem = this.createCarousel(slides);
  }
  createSlide (arr) {
    const productName = arr.name;
    const productId = arr.id;
    const productImg = arr.image;
    const productPrice = arr.price.toFixed(2)
    const carousel = `  
      <div class="carousel__slide" data-id="${productId}">
        <img src="../../assets/images/carousel/${productImg}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">${productPrice}</span>
          <div class="carousel__title">${productName}</div>
          <button type="button" class="carousel__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
        </div> `;
    const slide = createElement(carousel);
    const addProduct = new CustomEvent('product-add', {
      bubbles: true,
      detail: productId,
    });
    slide.addEventListener('click', (e) => {
      if (e.target.closest('.carousel__button')) {
        slide.dispatchEvent(addProduct);
      }

    });
    return slide;
  };
  createArrows() {
    const rightArrow = `<div class="carousel__arrow carousel__arrow_right">
    <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
  </div>`;
  const leftArrow = `<div class="carousel__arrow carousel__arrow_left">
  <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
</div>`;
const container = document.createDocumentFragment();
container.appendChild(createElement(rightArrow));
container.appendChild(createElement(leftArrow));
return container;
  };
  createCarousel(slides) {

    const carousel = document.createElement('DIV');
    carousel.classList.add('carousel');
    const divInner = document.createElement('DIV');
    divInner.classList.add('carousel__inner');
    carousel.append(this.createArrows());
    
    for(let item of slides) {
      divInner.append(this.createSlide(item));
    }
    carousel.append(divInner);

  let leftBtn = carousel.querySelector('.carousel__arrow_left');
  let rightBtn = carousel.querySelector('.carousel__arrow_right');
  

  let currentSlideCount = 1;
    let position  = 0;
   
    leftBtn.style.display = 'none';

    carousel.addEventListener('click', (e) => {
      const slideWidth = divInner.offsetWidth;
      if (e.target.closest('.carousel__arrow_right')) {
        currentSlideCount += 1;
        position  += slideWidth;
        divInner.style.transform = `translateX(-${position }px)`;
      } else if (e.target.closest('.carousel__arrow_left')) {
        currentSlideCount -= 1;
        position -= slideWidth;
        divInner.style.transform = `translateX(-${position }px)`;
      
      }
      if (currentSlideCount > 1) {
        leftBtn.style.display = '';
      } else {
        leftBtn.style.display = 'none';
      } 
      if (currentSlideCount === slides.length) {
        rightBtn.style.display = 'none';
      } else {
        rightBtn.style.display = '';
      }
    });
    return carousel;

  }
  
}
