"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/homepage.js
  $(document).ready(heroScroll);
  $(document).ready(bookParallax);
  $(document).ready(posterParallax);
  $(document).ready(homeNavChange);
  function homeNavChange() {
    let navTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: () => innerHeight / 2,
        end: () => innerHeight / 2,
        toggleActions: "none play none reverse"
      }
    });
    navTrigger.to(
      ".nav_dropdown-list",
      {
        backgroundColor: "white",
        duration: 0.75
      },
      "<"
    );
    navTrigger.to(
      ".navbar",
      {
        backgroundColor: "white"
      },
      "<"
    );
    navTrigger.to(
      ".navbar_brand-star",
      {
        width: "25%",
        duration: 0.75,
        opacity: 0,
        ease: "power4.inOut"
      },
      "<"
    ), navTrigger.to(
      ".s_logo-path",
      {
        y: "0%",
        duration: 0.5,
        ease: "power4.inOut",
        stagger: { amount: 0.04 },
        delay: 0.2
      },
      "<"
    );
  }
  function heroScroll() {
    let heroScroll2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".home_hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.25
      }
    });
    heroScroll2.to(
      ".home_hero-inner",
      {
        y: "10rem"
      },
      "<"
    );
    heroScroll2.to(
      ".home_hero-swiper-sticky",
      {
        rotation: -8,
        scale: 0.6
        /*width: "60svw",
        height: "75svh",*/
      },
      "<"
    );
  }
  function bookParallax() {
    let bookParallax2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".home_book-inner",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.75
      }
    });
    bookParallax2.fromTo(
      ".home_book-cover",
      {
        yPercent: 100,
        rotation: 20
      },
      {
        yPercent: -25,
        rotation: -5
      }
    );
  }
  function posterParallax() {
    let posterParallax2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".home_netflix-inner",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.75
      }
    });
    posterParallax2.fromTo(
      ".netflix_poster",
      {
        yPercent: 20,
        rotation: -10
      },
      {
        yPercent: -50,
        rotation: 20
      }
    );
  }
  var swiperHomeHero = new Swiper(".swiper.is-home-hero", {
    // Optional parameters
    effect: "slide",
    loop: true,
    parallax: true,
    slidesPerView: 1,
    autoplay: {
      delay: 2e3
    },
    speed: 1e3
  });
  var swiperHomePress = new Swiper(".swiper.is-press", {
    // Optional parameters
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 800
    },
    speed: 10
  });
  var swiperHomeTrust = new Swiper(".swiper.trust-home-logos", {
    // Optional parameters
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 500
    },
    speed: 10
  });
})();
//# sourceMappingURL=homepage.js.map
