"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/globalFunctions.js
  var windowWidth = window.innerWidth;
  var uniqueIdCounters = {};
  var createResponsiveSwiper = (componentSelector, swiperSelector, classSelector, options, mode) => {
    let elements = $(componentSelector);
    if (elements.length === 0)
      return;
    uniqueIdCounters[classSelector] = 0;
    uniqueIdCounters[classSelector] = uniqueIdCounters[classSelector] || 0;
    elements.each(function() {
      let uniqueKey = `${classSelector}_${uniqueIdCounters[classSelector]}`;
      addUniqueClassesToElements(this, swiperSelector, uniqueKey, [
        ".slider-arrow",
        ".swiper-navigation",
        ".swiper-drag-wrapper"
      ]);
      let swiperOptions = getMergedSwiperOptions(options, uniqueKey);
      manageSwiperInstance(this, swiperSelector, uniqueKey, classSelector, swiperOptions, mode);
      uniqueIdCounters[classSelector]++;
    });
  };
  var addUniqueClassesToElements = (context, swiperSelector, uniqueKey, controlSelectors) => {
    controlSelectors.forEach((selector) => {
      $(context).find(selector).addClass(uniqueKey);
    });
    $(context).find(swiperSelector).addClass(uniqueKey);
  };
  var getMergedSwiperOptions = (options, uniqueKey) => {
    return Object.assign({}, options, {
      navigation: {
        prevEl: `.slider-arrow.swiper-prev.${uniqueKey}`,
        nextEl: `.slider-arrow.swiper-next.${uniqueKey}`
      },
      pagination: {
        el: `.swiper-navigation.${uniqueKey}`,
        type: "bullets",
        bulletActiveClass: "w-active",
        bulletClass: "w-slider-dot"
      },
      scrollbar: {
        el: `.swiper-drag-wrapper.${uniqueKey}`,
        draggable: true,
        dragClass: "swiper-drag",
        snapOnRelease: true
      }
    });
  };
  var manageSwiperInstance = (context, swiperSelector, uniqueKey, classSelector, swiperOptions, mode) => {
    swipers[classSelector] = swipers[classSelector] || {};
    swipers[classSelector][uniqueKey] = swipers[classSelector][uniqueKey] || {};
    let existingInstance = swipers[classSelector][uniqueKey];
    let existingSwiper = existingInstance.swiperInstance;
    let shouldInitDesktop = mode === "desktop" && window.matchMedia("(min-width: 992px)").matches;
    let shouldInitMobile = mode === "mobile" && window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches;
    let shouldInitAll = mode === "all";
    const destroySwiper = () => {
      if (existingInstance.observer) {
        existingInstance.observer.disconnect();
        delete existingInstance.observer;
      }
      if (existingSwiper) {
        existingSwiper.destroy(true, true);
        delete swipers[classSelector][uniqueKey];
        console.log("Swiper destroyed for", swiperSelector, "with uniqueKey", uniqueKey);
      }
    };
    const reInitObserver = () => {
      if (existingInstance.observer) {
        existingInstance.observer.disconnect();
      }
      const swiperElement = $(`${swiperSelector}.${uniqueKey}`)[0];
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (shouldInitDesktop || shouldInitMobile || shouldInitAll)) {
            if (!existingSwiper) {
              let swiper = new Swiper(`${swiperSelector}.${uniqueKey}`, swiperOptions);
              swipers[classSelector][uniqueKey] = {
                swiperInstance: swiper,
                mode: shouldInitDesktop ? "desktop" : shouldInitMobile ? "mobile" : "all",
                initialized: true
              };
              observer.disconnect();
              console.log("Swiper initialized for", swiperSelector, "with uniqueKey", uniqueKey);
            }
          }
        });
      }, {});
      swipers[classSelector][uniqueKey].observer = observer;
      observer.observe(swiperElement);
    };
    if (!shouldInitDesktop && mode === "desktop")
      destroySwiper();
    else if (!shouldInitMobile && mode === "mobile")
      destroySwiper();
    else if (!shouldInitAll && mode === "all")
      destroySwiper();
    else if ((shouldInitDesktop || shouldInitMobile || shouldInitAll) && !existingSwiper) {
      reInitObserver();
    }
  };
  var runSwipers = (swiperInstances2) => {
    swiperInstances2.forEach((instance) => {
      createResponsiveSwiper(...instance);
    });
  };
  var initSwipers = (swiperInstances2, swipersState) => {
    runSwipers(swiperInstances2);
    window.addEventListener("resize", function() {
      if (window.innerWidth !== windowWidth) {
        windowWidth = window.innerWidth;
        runSwipers(swiperInstances2);
      }
    });
  };

  // src/index.js
  var scrollPosition;
  var menuOpen;
  var menuTimeout;
  var disableScroll = () => {
    clearTimeout(menuTimeout);
    if (!menuOpen) {
      menuTimeout = setTimeout(() => {
        scrollPosition = $(window).scrollTop();
        $("html, body").scrollTop(0).addClass("overflow-hidden");
        $(".navbar_brand").css("color", "white");
      }, 350);
    } else {
      $("html, body").scrollTop(scrollPosition).removeClass("overflow-hidden");
      $(".navbar_brand").css("color", "inherit");
    }
    menuOpen = !menuOpen;
  };
  $(".nav_menu-icon").on("click", function() {
    if ($(window).width() <= 797) {
      disableScroll();
    }
  });
  var swiperInstances = [
    [
      '[data-swiper="section"]',
      '[data-swiper="wrap"]',
      "press-slider",
      {
        slidesPerView: "auto",
        preventClicks: "false",
        on: {
          init: (swiper) => {
            let total = $(swiper.wrapperEl).closest(".container").find(`[data-slides="total"]`);
            if (total.length) {
              total.text(String(swiper.slides.length).padStart(2, "0"));
            }
          },
          slideChange: (swiper) => {
            let current = $(swiper.wrapperEl).closest(".container").find(`[data-slides="current"]`);
            if (current.length) {
              current.text(String(swiper.activeIndex + 1).padStart(2, "0"));
            }
          }
        }
      },
      "all"
    ]
  ];
  initSwipers(swiperInstances);
  function imageParallax() {
    $("[image-parallax='outer']").each(function(index) {
      let parallaxOuter = $(this);
      let parallaxInner = $("[image-parallax='inner']");
      let imageParallax2 = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxOuter,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.75
        }
      });
      imageParallax2.fromTo(
        $(this).find(parallaxInner),
        {
          yPercent: 0
        },
        {
          yPercent: -20,
          ease: "none"
        }
      );
    });
  }
  function gridFade() {
    $("[stagger-fade='trigger']").each(function(index) {
      let triggerElement = $(this);
      let targetElement = $("[stagger-fade='item']");
      let gridFade2 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "top, 50%",
          toggleActions: "none play none reset"
        }
      });
      gridFade2.from($(this).find(targetElement), {
        y: "2rem",
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: { amount: 0.5 }
      });
    });
  }
  function adjustTextSize() {
    const dynamicContainers = document.querySelectorAll("[dynamic-text='wrapper']");
    const dynamicTexts = document.querySelectorAll("[dynamic-text='text']");
    dynamicContainers.forEach((dynamicContainer, index) => {
      console.log("Fire");
      const containerWidth = dynamicContainer.offsetWidth;
      const dynamicTextWidth = dynamicTexts[index].offsetWidth;
      const fontSize = containerWidth / dynamicTextWidth * parseFloat(window.getComputedStyle(dynamicTexts[index]).fontSize);
      dynamicTexts[index].style.fontSize = fontSize + "px";
    });
  }
  function footerBiz() {
    let footerBizTrigger = $(".footer_bc");
    footerBizTrigger.each(function() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "bottom bottom",
          end: "bottom bottom",
          toggleActions: "none play none reverse"
        }
      });
      tl.from($(this).find(".shooting_star"), {
        width: "1rem",
        opacity: 0,
        ease: Power3.easeOut,
        duration: 0.75
      });
      tl.from(
        $(this).find("[footer-bc-stagger='item']"),
        {
          opacity: 0,
          y: "2rem",
          stagger: { amount: 0.4 },
          delay: 0.2,
          duration: 0.6,
          ease: "power3.out"
        },
        "<"
      );
    });
  }
  function imageReveal() {
    let trigger = $("[image-wipe='trigger']");
    let image = $("[image-wipe='image']");
    let mask = $("[image-wipe='mask']");
    trigger.each(function() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top bottom",
          end: "top, 60%",
          toggleActions: "none play none reset"
        }
      });
      tl.from($(this).find(mask), {
        x: "0%",
        duration: 1.25,
        ease: "power3.inOut"
      });
      tl.to(
        $(this).find(image),
        {
          scale: 1.15,
          duration: 1.5,
          ease: "power3.inout"
        },
        "<"
      );
    });
  }
  $(document).ready(function() {
    adjustTextSize();
    gridFade();
    imageParallax();
    footerBiz();
    imageReveal();
  });
  window.addEventListener("resize", () => {
    adjustTextSize();
  });
})();
//# sourceMappingURL=index.js.map
