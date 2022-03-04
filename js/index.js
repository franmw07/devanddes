/* abrir y cerrar menu */

var   sliderBar       = document.querySelector(".slidebar");
let   sliderBarBtnOff = document.querySelector(".bx-x");
let   sliderBarOff    = document.querySelector(".home_section");
const isoLogo         = document.querySelector('#isoLogo');
const logo            = document.querySelector('#logo');
let   sliderBarBtn    = document.querySelector(".bx-menu");
let   sliderBarOn     = document.querySelector(".home_section");
let   arrow           = document.querySelectorAll("#arrow");
const form            = document.querySelector('#form');

sliderBarBtnOff.addEventListener("click", () => {
  sliderFuntion();
});

sliderBarBtn.addEventListener("click", () => {
  sliderFuntion();
});

sliderFuntion = () =>{
  sliderBar.classList.toggle("close");
  sliderBarOff.classList.toggle("close");
  if (sliderBar.className === 'slidebar close') {
    logoFuntion();
  }else{
    logoFuntion();
  }
};

logoFuntion = () =>{
  if(logo.className != 'logo close'){
    logo.classList.toggle('close');
    isoLogo.classList.toggle('close');
  }else{
    logo.classList.toggle('close');
  }
}

/* sub menu desplegable */

for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
      let arrowParent = e.target.parentElement.parentElement;
      arrowParent.classList.toggle("show_menu");
    });
  }

/* form */

form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(e) {
  e.preventDefault();
  const newForm = new FormData(this);
  const response = await fetch(this.action, {
    method  : this.method,
    body    : newForm,
    headers : {
      'Accept' : 'application/json'
    }
  });
  if (response.ok) {
      this.reset();
      document.querySelector('.sent-message').style.display = 'block';
    }else{
      document.querySelector('.error-message').style.display = 'block';
    }
}

/* body */
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
  
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  }) */

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()