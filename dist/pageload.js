"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/pageload.js
  $(document).ready(loadPageWipe);
  $(document).ready(function() {
    $("a").on("click", pageWipe);
  });
  function pageWipe(e) {
    if ($(this).prop("hostname") === window.location.host && $(this).attr("href").indexOf("#") === -1 && $(this).attr("target") !== "_blank" && !$(this).attr("href").startsWith("?")) {
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".page_wipe-wrapper", { display: "block" });
      gsap.fromTo(
        ".page_wipe-top",
        { x: "-100vw" },
        {
          x: "0vw",
          duration: 1.5,
          ease: "power3.inOut"
        }
      );
      gsap.fromTo(
        ".page_wipe-mid",
        { x: "-100vw" },
        {
          x: "0vw",
          duration: 1.25,
          ease: "power3.inOut",
          delay: 0.25
        },
        "<"
      );
      gsap.fromTo(
        ".page_wipe-bottom",
        { x: "-100vw" },
        {
          x: "0vw",
          duration: 1,
          ease: "power3.inOut",
          delay: 0.25,
          onComplete: () => {
            window.location = destination;
          }
        },
        "<"
      );
    }
  }
  function loadPageWipe() {
    gsap.fromTo(
      ".page_wipe-bottom",
      { x: "0vw" },
      {
        x: "100vw",
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(".page_wipe-wrapper", { display: "none" });
        }
      }
    );
    gsap.fromTo(
      ".page_wipe-mid",
      { x: "0vw" },
      {
        x: "100vw",
        duration: 1.25,
        ease: "power3.inOut",
        delay: 0.25
      },
      "<"
    );
    gsap.fromTo(
      ".page_wipe-top",
      { x: "0vw" },
      {
        x: "100vw",
        duration: 1,
        ease: "power3.inOut",
        delay: 0.25
      },
      "<"
    );
  }
  window.onpageshow = function(event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
})();
//# sourceMappingURL=pageload.js.map
