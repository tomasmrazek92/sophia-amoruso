$(document).ready(heroParallax);
$(document).ready(revealYears);

gsap.registerPlugin(ScrollTrigger);

function heroParallax() {
  let heroParallax = gsap.timeline({
    scrollTrigger: {
      trigger: '.story_hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.75,
      markers: true,
    },
  });
  heroParallax.fromTo(
    '.story_hero-image',
    {
      yPercent: 30,
      rotation: 5,
    },
    {
      yPercent: -50,
      rotation: -5,
    }
  );
}

function revealYears() {
  let years = $('.timeline_item');

  years.each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
        markers: true,
      },
    });

    tl.to($(this).find('.timeline_image-mask'), { scaleX: 0, ease: Power2.easeOut });
  });
}
