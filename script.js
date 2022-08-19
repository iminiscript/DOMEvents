'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight)


const stickyNav = (entries) => {
  const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}
let headerobserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerobserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
// const imgTargets = document.querySelectorAll('img[data-src]');

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   // Replace src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });

//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadLazyImgs = function( entries, observe) {
 const [entry] = entries;

 if(!entry.isIntersecting) return 

 entry.target.src = entry.target.dataset.src;
 

 entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
 });
 console.log(entry.target);
 observe.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadLazyImgs, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});


imgTargets.forEach(element => {
  imgObserver.observe(element);
});

// Slider Function 


// Slider Variables 
const sliderFun = function() {
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slider');
  const nextBtn = document.querySelector('.slider__btn--right');
  const prevBtn = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;
  let totalSlides = slidesContainer.length;


  // Construct Basic Layout 
  slides.forEach( (slide, index) => {
    slidesContainer.style.opacity = 0;
    slide.style.transform = `translateX(${index * 100 }%)`

    setTimeout(() => {
      slidesContainer.style.opacity = 1;
    }, 1000);
  });

  // Slider Init Function 
  const sliderInit = function(slide) {
    slides.forEach( 
      (slideNumber, index) => { slideNumber.style.transform = `translateX(${(index - slide) * 100 }%)`
    });
  }

  // Create Dots Dynamically based on the number of slides
  const createDots = function() {
    slides.forEach( (_, index) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
      
    });
  }

  // Set Active Dots 
  const activeDots = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active')
    });

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }

  // Prev Slid function 
  const prevSlide = function() {
    if (currentSlide === 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    sliderInit(currentSlide);
    activeDots(currentSlide);
  };

  // Next Slide Function 
  const nextSlide = function() {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    sliderInit(currentSlide);
    activeDots(currentSlide);
  }

  // Construct starting Point of Slider

  const bindSliderAction = function() {
    
    sliderInit(0);
    createDots();
    activeDots(0);
  }

  bindSliderAction();

  // Event Handlers functions 


  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Slider from Keyboard events 

  document.addEventListener('keydown', function(e) {
    // e.key === 'ArrowRight' && nextSlide();
    // e.key === 'ArrowLeft' && prevSlide();

    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }

  })

  dotContainer.addEventListener('click', function(event) {
    if ( event.target.classList.contains('dots__dot')) {
        const {slide} = event.target.dataset;
        sliderInit(slide);
        activeDots(slide);
    }
  })
};

sliderFun();


// Mutation observer 
const headerTitle = document.querySelector('.header__title');
setTimeout(() => {
  const headerTitleChild = document.createElement("h4");
  headerTitleChild.textContent = `JavaScript creates this element after 10 seconds, and the new MutationObserver watches it
  Once this Element is created and added to the DOM, we will change its color`;
  headerTitleChild.classList.add('newChildElement');
  headerTitle.append(headerTitleChild);

}, 10000);


const titleObserver = new MutationObserver((mutations, observe) => {
  const title = document.querySelector(".newChildElement");
  title.style.color = '#f00606';
  observe.disconnect();
});

titleObserver.observe(headerTitle, {
  childList: true,
  subtree: true
});