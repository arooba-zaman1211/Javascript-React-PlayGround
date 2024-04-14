'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab'); //buttons 
const tabsContainer = document.querySelector('.operations__tab-container');// the outer cover of buttons
const tabsContent = document.querySelectorAll('.operations__content'); // the text that appears after pressing a button



/////// Opening and closing of login form //////



const openModal =  function(){
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = function()
{
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

document.addEventListener('keydown', function(e){
  if (e.key == 'Escape' && !modal.classList.contains('hidden')){
    closeModal();
  }
})

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal ))
btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)



////// Making the other than selected tab fade away/////////


// passing arguments to event handler by using the bind and this keyword
const handleHover = function(e)
{
  if(e.target.classList.contains('nav__link')){

    const link = e.target; // getting the pressed link
    const siblings = link.closest('nav').querySelectorAll('.nav__link')// all the sibling of link having specific class
    const pic = link.closest('nav').querySelector('img') // getting the img

    siblings.forEach( el =>{
      if(el !== link) el.style.opacity = this
    })
    pic.style.opacity = this
  }
}

nav.addEventListener('mouseover',handleHover.bind(0.5)
)

nav.addEventListener('mouseout',handleHover.bind(1)
)


//////// Sticky navigation by Intersection Observer API ////////

const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header')

const stickyNav = function(entries)
{
  const [entry] = entries
  console.log(entry)

  if(!entry.isIntersecting) 
  {
    nav.classList.add('sticky')
  }
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(
  stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  }
)

headerObserver.observe(header)


//////// Making the tabs and sections move up as we visit them /////

const allSection = document.querySelectorAll('.section')

const revealSection = function(entries, observer)
{
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObeserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15
  }
)

allSection.forEach(function (section){
  sectionObeserver.observe(section)
 // section.classList.add('section--hidden')
})



////// Lazy loading of images as we approach them///////////

const imagTargets = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observer){
  const [entry] = entries
  if(!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
}

const imgObersever = new IntersectionObserver(
  loadImg, {
    root: null,
    threshold: 0
  }
)

imagTargets.forEach(img => imgObersever.observe(img))


///// Page navigation ////////////


/*document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault()
    const id = this.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})*/

// 1. Add event listener to common parent element
// 2. determine which element originated the event
// This new techinque is used to avoid excesive use of loops 

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault(); // Corrected method name

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})



//////// Tabbed Components ///////////



tabsContainer.addEventListener('click', function(e) {
  e.preventDefault();
  let target = e.target;
  
  if (target.tagName === 'SPAN' && target.parentElement.classList.contains('btn')) {
      target = target.parentElement;
  }
  if (target.classList.contains('btn')) {
      const id = target.getAttribute('data-tab');
      console.log(id);

      const allTabs = document.querySelectorAll('.btn');
      allTabs.forEach(tab => {
          tab.classList.remove('operations__tab--active');
      });

      target.classList.add('operations__tab--active');

      const allTabContent = document.querySelectorAll('.operations__content');
      allTabContent.forEach(content => {
          content.classList.remove('operations__content--active');
      });

      const contentElement = document.querySelector(`.operations__content--${id}`);
      contentElement.classList.add('operations__content--active');
  }
});



////////////////// Slider /////////////////////
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');


slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${100 * index}%)`;
});

const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currentSlide = 0;
const maxLength = slides.length;

const goToSlide = function(slide){
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
}

goToSlide(0);

const nextSlide = function(){
  currentSlide++;

  if(currentSlide >= maxLength)
  {
    currentSlide = 0;
  }

  goToSlide(currentSlide);
  activeDot(currentSlide)
}

const prevSlide = function(){
  currentSlide--;

  if(currentSlide < 0)
  {
    currentSlide = maxLength - 1;
  }

  goToSlide(currentSlide);
  activeDot(currentSlide)
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key == 'ArrowLeft') prevSlide()
  e.key === 'ArrowRight' && nextSlide() 
})

const dotContainer = document.querySelector('.dots')

// to create dots against each slide
//------------------ DOTS -------------

const createDots = function()
{
  slides.forEach((_,i) => {
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots();

const activeDot = function(slide){

  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    console.log('dot')
    const {slide} = e.target.dataset
    goToSlide(slide)
    activeDot(slide)
  }
})
activeDot(0)

/////// Cookie message ////// Practice purposes



/*let button = document.getElementsByTagName('button')
console.log(button)

let cookie = document.createElement('div')
cookie.classList.add('cookie-message')

cookie.innerHTML = cookie.innerHTML = 'We use cookies to improve functionality <button class = \"btn btn--close-cookie\"> Got it!</button>'

const header = document.querySelector('.header')
header.append(cookie)

let btnCookie = document.querySelector('.btn--close-cookie');

btnCookie.addEventListener('click', function(){
  cookie.classList.add('hidden');
});

cookie.style.backgroundColor = '#37383d'
cookie.style.width ='120%'
cookie.style.padding = '1rem'

console.log(getComputedStyle(cookie).color)

console.log(getComputedStyle(cookie).height)
let computedHeight = parseFloat(getComputedStyle(cookie).height);

// Increase the height by 40 pixels
let newHeight = computedHeight + 20;

// Set the new height as a string with 'px' unit
cookie.style.height = newHeight + 'px';*/



///////// Scrolling ///////////////



btnScrollTo.addEventListener('click', function(e){
 /* const dimensions = section1.getBoundingClientRect();

  console.log(e.target.getBoundingClientRect())

  console.log(document.documentElement.clientHeight)

  //scrolling
  window.scrollTo({
    left: dimensions.left + window.pageXOffset,
    top: dimensions.top + window.pageYOffset,
    behavior: 'smooth'
});*/

  section1.scrollIntoView({behavior:"smooth"})

})



/////////////Practicing event types///////////



const h1 = document.querySelector('h1')

const alertcall = function(){
  alert('You are reading the heading ;D')
  //Removing eventListener
  //h1.removeEventListener('mouseenter',alertcall)
}

h1.addEventListener('mouseenter', alertcall)
setTimeout(()=>h1.removeEventListener('mouseenter',alertcall),3000)



//////////// Event capturing and bubbling //////



//We made a function to create random numbers between 0 and 255
/*const randomInt = (min, max ) => Math.floor(Math.random() * (max - min + 1) + min);

//Then we made colors from the random numbers and assigned them to outermost, inner and innermost component
const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`

document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget)
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget)
})

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log(e.target, e.currentTarget)
},true)

//Target has always been the lower most or the container where the feature is present and the current target is shown as a result of bubbling up the dom tree*/



//// Practice DOM Traversal 



/*const H1 = document.querySelectorAll('h1');

//Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);
//getting the children one at a time and applying styling
h1.firstElementChild.style.color = 'white'

//Going upwards: parents
console.log(h1.parentNode)
console.log(h1.parentElemet)
//most used selector 
h1.closest('h1').style.background = 'pink'

//Going sideways: siblings we can only access the previous and next sibling
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

//to get all the sibling we need to move to parent and read all the siblings while doing so
console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el){
  if(el != h1){
    el.style.transform = 'scale(0.5)'
  }
})*/