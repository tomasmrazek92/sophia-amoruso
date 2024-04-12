import { initSwipers } from './utils/globalFunctions';
import { gridFade, imageReveal } from './utils/reusableAnimations';

$(document).ready(() => {
  // #region Navbar
  // ___Opening flow
  let navHam = $('.nav_menu-inner');
  let navMenu = $('.nav_menu-list');
  let navItem = $('.nav_menu-link');
  let navOpen = false;

  function toggleNav() {
    navOpen = !navOpen; // Toggle the navOpen flag

    if (navOpen) {
      openNav();
    } else {
      closeNav();
    }
  }

  function openNav() {
    gsap.fromTo(
      navMenu,
      { xPercent: -5, opacity: 0, display: 'none' },
      { xPercent: 0, opacity: 1, display: 'flex' }
    );
    animateHam(true);
  }

  function closeNav() {
    gsap.to(navMenu, { xPercent: -5, opacity: 0, display: 'none' });
    animateHam(false);
  }

  function animateHam(open) {
    let line1 = navHam.find('.nav_menu-line._1');
    let line2 = navHam.find('.nav_menu-line._2');
    let line3 = navHam.find('.nav_menu-line._3');
    let rotation = open ? 45 : 0;
    let yTranslation = open ? '6px' : '0px';
    let opacity = open ? 0 : 1;

    let tl = gsap.timeline({ defaults: { ease: Power2.easeInOut } });

    tl.to(line1, { y: yTranslation }, '<');
    tl.to(line2, { opacity: opacity }, '<');
    tl.to(line3, { y: '-' + yTranslation }, '<');
    tl.to(line1, { rotate: rotation }, '<');
    tl.to(line3, { rotate: '-' + rotation }, '<');
  }

  // Init
  navHam.on('click', toggleNav);
  navItem.on('click', toggleNav);

  // ___ Logo Scrolling Flow
  let darkSections = $('[data-section="logo-white"]');
  let navBrand = $('.nav_brand-embed');

  const getNavHeight = () => {
    return $('.navbar').outerHeight();
  };

  darkSections.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top ' + getNavHeight() / 2 + 'px',
        end: 'bottom ' + getNavHeight() / 2 + 'px',
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.to(navBrand, { color: 'white' });
  });

  // #endregion

  // #region Players

  // Vimeo Video Player
  $("[js-vimeo-element='component']").each(function (index) {
    let componentEl = $(this),
      iframeEl = $(this).find('iframe'),
      coverEl = $(this).find("[js-vimeo-element='cover']");
    // create player
    let player = new Vimeo.Player(iframeEl[0]);
    // when video starts playing
    player.on('play', function () {
      // pause previously playing component before playing new one
      let playingCover = $("[js-vimeo-element='component'].is-playing")
        .not(componentEl)
        .find(" [js-vimeo-element='cover']");
      if (playingCover.length) playingCover[0].click();
      // add class of is-playing to this component
      componentEl.addClass('is-playing');
    });
    // when video pauses or ends
    player.on('pause', function () {
      componentEl.removeClass('is-playing');
    });
    // when user clicks on our cover
    coverEl.on('click', function () {
      if (componentEl.hasClass('is-playing')) {
        player.pause();
      } else {
        player.play();
      }
    });
  });

  // Plyr Video Player
  $('[data-plyr=component]').each(function (index) {
    let thisComponent = $(this);

    // create plyr settings
    let player = new Plyr(thisComponent.find('.plyr_video')[0], {
      controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
      resetOnEnd: true,
    });

    // custom video cover
    thisComponent.find('[data-plyr=cover]').on('click', function () {
      player.play();
    });
    player.on('ended', (event) => {
      thisComponent.removeClass('hide-cover');
    });

    // pause other playing videos when this one starts playing
    player.on('play', (event) => {
      $('[data-plyr=component]').removeClass('hide-cover');
      thisComponent.addClass('hide-cover');
      let prevPlayingComponent = $('.plyr--playing')
        .closest('[data-plyr=component]')
        .not(thisComponent);
      if (prevPlayingComponent.length > 0) {
        prevPlayingComponent.find('.plyr_pause-trigger')[0].click();
      }
    });
    thisComponent.find('.plyr_pause-trigger').on('click', function () {
      player.pause();
    });

    // exit full screen when video ends
    player.on('ended', (event) => {
      if (player.fullscreen.active) {
        player.fullscreen.exit();
      }
    });
    // set video to contain instead of cover when in full screen mode
    player.on('enterfullscreen', (event) => {
      thisComponent.addClass('contain-video');
    });
    player.on('exitfullscreen', (event) => {
      thisComponent.removeClass('contain-video');
    });
  });

  // #endregion

  // #region Swipers
  const swiperInstances = [
    [
      '.section_testimonials',
      '.w-dyn-list',
      'testimonials',
      {
        breakpoints: {
          0: {
            slidesPerView: 'auto',
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 2.5,
            spaceBetween: 32,
          },
        },
      },
      'all',
    ],
    [
      '.section_experts',
      '.w-dyn-list',
      'experts',
      {
        breakpoints: {
          0: {
            slidesPerView: 'auto',
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 'auto',
            spaceBetween: 24,
          },
        },
      },
      'all',
    ],
    [
      '.section_lifetime',
      '.w-dyn-list',
      'resources',
      {
        breakpoints: {
          0: {
            slidesPerView: 'auto',
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      },
      'all',
    ],
    [
      '.section_passengers',
      '.w-dyn-list',
      'passengers',
      {
        breakpoints: {
          0: {
            slidesPerView: 'auto',
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1400: {
            slidesPerView: 'auto',
            spaceBetween: 24,
          },
        },
      },
      'all',
    ],
  ];

  // Initialize swipers with instances specific to this page
  initSwipers(swiperInstances);

  // #endregion

  // #region introAnimation

  // Full Width
  let tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: $('.section_intro'),
      start: '20% bottom',
      end: 'top top',
      scrub: 1,
    },
  });

  // Pills parallax
  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: $('.section_intro'),
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  tl1.fromTo($('.section_intro'), { width: '100rem' }, { width: '100%' });
  tl2.fromTo(
    $('.intro_person-box').find('img'),
    { yPercent: gsap.utils.random(50, 150), opacity: 0 },
    { yPercent: 0, stagger: 0.02, opacity: 1 },
    '<'
  );

  // #endregion

  // #region Animations
  const stars = () => {
    $('.stars_row').each(function () {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'bottom bottom',
        },
      });

      tl.fromTo(
        $(this).find('.stars_icon'),
        { opacity: 0, yPercent: 30 },
        { opacity: 1, yPercent: 0, stagger: 0.1 }
      );
    });
  };

  stars();
  // #endregion

  // Init
  imageReveal();
  gridFade();
});
