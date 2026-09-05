/* Neuron ICT — minimal progressive enhancement.
   Nothing on this page depends on JavaScript for its content. */
(function () {
  "use strict";

  /* Mobile navigation ----------------------------------------------------- */
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var iconOpen = document.getElementById("menu-icon-open");
  var iconClose = document.getElementById("menu-icon-close");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("hidden", !open);
    if (iconOpen) iconOpen.classList.toggle("hidden", open);
    if (iconClose) iconClose.classList.toggle("hidden", !open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* Request form ---------------------------------------------------------
     TESTING BUILD: there is no backend. The submission is intercepted and
     acknowledged locally so the flow can be reviewed. Nothing is sent or
     stored. Replace this block when a real endpoint is approved. */
  var form = document.getElementById("review-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var missing = Array.prototype.filter.call(
        form.querySelectorAll("input[required]"),
        function (input) {
          return !input.value.trim() || !input.checkValidity();
        }
      );

      if (missing.length) {
        status.textContent =
          "Please complete the business name, service area and a valid email address.";
        status.classList.remove("hidden");
        missing[0].focus();
        return;
      }

      status.textContent =
        "Testing build — this form is not connected yet, so nothing was sent. In the live version this would start your visibility review request.";
      status.classList.remove("hidden");
    });
  }

  /* Footer year ----------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
