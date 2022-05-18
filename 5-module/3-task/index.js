function initCarousel() {
  let leftBtn = document.querySelector('.carousel__arrow_left');
  let rightBtn = document.querySelector('.carousel__arrow_right');
  let slide = document.querySelector('.carousel__inner');
  let slideOffset = document.querySelector('.carousel__inner').offsetWidth;

  let position = 0;

  leftBtn.style.display = 'none';

  leftBtn.addEventListener('click', function () {
    rightBtn.style.display = '';
    position += slideOffset;
    console.log(slideOffset);
    slide.style.transform = `translateX(${position}px)`;
    if (position == 0) {
      leftBtn.style.display = 'none';
    }
  });

  rightBtn.addEventListener('click', function () {
    leftBtn.style.display = '';
    position -= slideOffset;
    console.log(slideOffset);
    slide.style.transform = `translateX(${position}px)`;
    if (position < -2 * slideOffset) {
      rightBtn.style.display = 'none';
    }
  });
}
