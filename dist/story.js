"use strict";(()=>{$(document).ready(t);$(document).ready(r);gsap.registerPlugin(ScrollTrigger);function t(){gsap.timeline({scrollTrigger:{trigger:".story_hero",start:"top top",end:"bottom top",scrub:.75}}).fromTo(".story_hero-image",{yPercent:30,rotation:5},{yPercent:-50,rotation:-5})}function r(){$(".timeline_item").each(function(){gsap.timeline({scrollTrigger:{trigger:$(this),start:"center bottom"}}).to($(this).find(".timeline_image-mask"),{scaleX:0,ease:Power2.easeOut})})}})();