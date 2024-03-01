import { initSwipers } from './utils/globalFunctions';

// #region Menu

let scrollPosition;
const disableScroll = () => {
  if (!menuOpenAnim) {
    scrollPosition = $(window).scrollTop();
    $('html, body').scrollTop(0).addClass('overflow-hidden');
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
  menuOpenAnim = !menuOpenAnim;
};

// #endregion

// #region Swipers

// Base Swiper
const swiperInstances = [
  [
    '[data-swiper="section"]',
    '[data-swiper="wrap"]',
    'press-slider',
    {
      slidesPerView: 'auto',
      preventClicks: 'false',
      on: {
        init: (swiper) => {
          let total = $(swiper.wrapperEl).closest('.container').find(`[data-slides="total"]`);
          if (total.lenght) {
            total.text(String(swiper.slides.length).padStart(2, '0'));
          }
        },
        slideChange: (swiper) => {
          let current = $(swiper.wrapperEl).closest('.container').find(`[data-slides="current"]`);
          if (current.lenght) {
            current.text(String(swiper.activeIndex + 1).padStart(2, '0'));
          }
        },
      },
    },
    'all',
  ],
];

// Init
initSwipers(swiperInstances);

// #endregion

// #region Animations

// ____________ Stagger Fade Items within Grid
// Trigger = [stagger-fade='trigger']
// Item = [stagger-fade='item']
function gridFade() {
  $("[stagger-fade='trigger']").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $("[stagger-fade='item']");

    let gridFade = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top bottom',
        end: 'top, 50%',
        toggleActions: 'none play none reset',
      },
    });
    gridFade.from($(this).find(targetElement), {
      y: '2rem',
      opacity: 0,
      duration: 0.3,
      stagger: { amount: 0.5 },
    });
  });
}

// ____________ Full width Text
// Wrapper = [dynamic-text='wrapper']
// Text Item = [dynamic-text='text']
function adjustTextSize() {
  const dynamicContainers = document.querySelectorAll("[dynamic-text='wrapper']");
  const dynamicTexts = document.querySelectorAll("[dynamic-text='text']");

  dynamicContainers.forEach((dynamicContainer, index) => {
    const containerWidth = dynamicContainer.offsetWidth;
    const dynamicTextWidth = dynamicTexts[index].offsetWidth;

    const fontSize =
      (containerWidth / dynamicTextWidth) *
      parseFloat(window.getComputedStyle(dynamicTexts[index]).fontSize);

    dynamicTexts[index].style.fontSize = fontSize + 'px';
  });
}

// ___________ Events
// Events
window.addEventListener('DOMContentLoaded', (event) => {
  adjustTextSize();
  gridFade();

  window.addEventListener('resize', () => {
    adjustTextSize();
  });
});
// #endregion
