"use strict";(()=>{$(document).ready(r);$(document).ready(t);$(document).ready(a);$(document).ready(o);function o(){let e=gsap.timeline({scrollTrigger:{trigger:"body",start:()=>innerHeight/2,end:()=>innerHeight/2,toggleActions:"none play none reverse"}});e.to(".nav_dropdown-list",{backgroundColor:"white",duration:.75},"<"),e.to(".navbar",{backgroundColor:"white"},"<"),e.to(".navbar_brand-star",{width:"25%",duration:.75,opacity:0,ease:"power4.inOut"},"<"),e.to(".s_logo-path",{y:"0%",duration:.5,ease:"power4.inOut",stagger:{amount:.04},delay:.2},"<")}function r(){let e=gsap.timeline({scrollTrigger:{trigger:".home_hero",start:"top top",end:"bottom top",scrub:.75}});e.to(".home_hero-inner",{y:"25vh"},"<"),e.to(".home_hero-slider",{y:"60svh",rotation:-8,scale:.6},"<")}function t(){gsap.timeline({scrollTrigger:{trigger:".home_book-inner",start:"top bottom",end:"bottom top",scrub:.75}}).fromTo(".home_book-cover",{yPercent:100,rotation:20},{yPercent:-25,rotation:-5})}function a(){gsap.timeline({scrollTrigger:{trigger:".home_netflix-inner",start:"top bottom",end:"bottom top",scrub:.75}}).fromTo(".netflix_poster",{yPercent:20,rotation:-10},{yPercent:-50,rotation:20})}var n=new Swiper(".swiper.is-home-hero",{effect:"slide",loop:!0,parallax:!0,slidesPerView:1,autoplay:{delay:2e3},speed:1e3}),i=new Swiper(".swiper.is-press",{effect:"fade",fadeEffect:{crossFade:!0},loop:!0,slidesPerView:1,autoplay:{delay:800},speed:10}),s=new Swiper(".swiper.trust-home-logos",{effect:"fade",fadeEffect:{crossFade:!0},loop:!0,slidesPerView:1,autoplay:{delay:500},speed:10});})();
