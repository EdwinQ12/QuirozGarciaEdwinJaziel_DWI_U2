/* =========================================================================
   Portafolio personal — Edwin Quiroz
   JavaScript vanilla (sin dependencias)
   -------------------------------------------------------------------------
   1. Navbar: estado al hacer scroll + menú móvil
   2. Enlaces anidados con scroll suave yoffset del navbar
   3. Sección activa resaltada (IntersectionObserver)
   4. Animaciones de entrada (IntersectionObserver)
   5. Contadores estadísticos animados
   6. Máquina de escribir en el hero
   7. Validación y envío del formulario de contacto
   8. Botón "volver arriba" + año del footer
   ========================================================================= */

(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ------------------------------------------------- 1. NAVBAR: SCROLL + MENÚ */
  var nav     = $('#nav');
  var burger  = $('#burger');
  var navLink = $('#navLinks');
  var toTop   = $('#toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('is-stuck', y > 24);
    toTop.classList.toggle('is-visible', y > 600);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  function closeMenu() {
    navLink.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      var open = navLink.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  /* --------------------------------------- 2. SCROLL SUAVE CON OFFSET NAVBAR */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      var navH = nav ? nav.offsetHeight : 0;
      var top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;

      window.scrollTo({ top: top, behavior: 'smooth' });

      // Mantiene la URL sincronizada sin provocar un salto brusco
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (e) {
    if (!navLink.classList.contains('is-open')) return;
    if (navLink.contains(e.target) || (burger && burger.contains(e.target))) return;
    closeMenu();
  });

  /* ------------------------------------------- 3. SECCIÓN ACTIVA EN EL NAVBAR */
  var sections = $$('main section[id]');
  var navAnchors = $$('.nav__link');

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Map();

    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
        else visible.delete(entry.target.id);
      });

      // Se resalta la sección con mayor área visible
      var bestId = null;
      var bestRatio = 0;
      visible.forEach(function (ratio, id) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });

      navAnchors.forEach(function (a) {
        a.classList.toggle('is-active', bestId !== null && a.getAttribute('href') === '#' + bestId);
      });
    }, {
      threshold: [0.05, 0.15, 0.35, 0.65],
      rootMargin: '-10% 0px -30% 0px'
    });

    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------------------------------------------- 4. ANIMACIONES DE ENTRADA */
  var revealEls = $$('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // se anima una sola vez
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------ 5. CONTADORES ESTADÍSTICOS */
  function animateCount(el) {
    var target   = parseFloat(el.dataset.count) || 0;
    var suffix   = el.dataset.suffix || '';
    var duration = 1400;
    var start    = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // easing: easeOutExpo
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  var counters = $$('[data-count]');

  if ('IntersectionObserver' in window && counters.length) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* --------------------------------------- 6. MÁQUINA DE ESCRIBIR (HERO) */
  var typedEl = $('#typed');

  if (typedEl) {
    var phrases = [
      'Desarrollador Web Full Stack',
      'HTML · CSS · JavaScript',
      'Node.js · MySQL · React',
      'Git · GitHub · GitHub Actions'
    ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typedEl.textContent = phrases[0];
    } else {
      var p = 0, c = 0, deleting = false;

      var typeLoop = function () {
        var word = phrases[p];

        typedEl.textContent = deleting
          ? word.substring(0, --c)
          : word.substring(0, ++c);

        var delay = deleting ? 45 : 85;

        if (!deleting && c === word.length) {
          deleting = true;
          delay = 1700;
        } else if (deleting && c === 0) {
          deleting = false;
          p = (p + 1) % phrases.length;
          delay = 320;
        }

        window.setTimeout(typeLoop, delay);
      };

      typeLoop();
    }
  }

  /* ------------------------------------------- 7. FORMULARIO DE CONTACTO */
  var form    = $('#form');
  var status  = $('#formStatus');
  var btn     = $('#submitBtn');
  var MY_EMAIL = 'edwin.quiroz@email.com'; // REEMPLAZA por tu correo

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form__status' + (kind ? ' ' + kind : '');
  }

  function validateField(input) {
    var field  = input.closest('.field');
    var valid  = true;

    if (input.hasAttribute('required')) {
      var v = input.value.trim();

      if (input.type === 'email') {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      } else if (input.tagName === 'TEXTAREA') {
        valid = v.length >= 10;
      } else {
        valid = v.length > 0;
      }
    }

    if (field) field.classList.toggle('is-invalid', !valid);
    return valid;
  }

  if (form) {
    var inputs = $$('input, textarea', form);

    inputs.forEach(function (input) {
      input.addEventListener('blur',  function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('is-invalid')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var allValid = true;
      var firstInvalid = null;

      inputs.forEach(function (input) {
        if (!validateField(input)) {
          allValid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!allValid) {
        setStatus('Revisa los campos marcados en rojo.', 'err');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = new FormData(form);
      var nombre = (data.get('nombre') || '').trim();
      var correo = (data.get('correo') || '').trim();
      var asunto = (data.get('asunto') || '').trim() || 'Contacto desde el portafolio';
      var mensaje = (data.get('mensaje') || '').trim();

      // Mientras el endpoint de Formspree sea el placeholder, se usa mailto:
      var endpoint = form.getAttribute('action') || '';
      var isPlaceholder = endpoint.indexOf('TU_ID_AQUI') !== -1;

      function fallback() {
        var cuerpo =
          'Nombre: ' + nombre + '\n' +
          'Correo: ' + correo + '\n' +
          'Asunto: ' + asunto + '\n\n' +
          mensaje;

        window.location.href =
          'mailto:' + MY_EMAIL +
          '?subject=' + encodeURIComponent(asunto) +
          '&body=' + encodeURIComponent(cuerpo);
      }

      if (isPlaceholder) {
        setStatus('Abriendo tu programa de correo… (configura Formspree para envío directo)', 'ok');
        fallback();
        return;
      }

      if (btn) {
        btn.classList.add('is-loading');
        btn.querySelector('.btn__label').textContent = 'Enviando…';
      }
      setStatus('', '');

      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          setStatus('¡Mensaje enviado! Te responderé en menos de 24 horas.', 'ok');
        })
        .catch(function () {
          setStatus('No se pudo enviar. Se abrirá tu correo como alternativa.', 'err');
          fallback();
        })
        .finally(function () {
          if (btn) {
            btn.classList.remove('is-loading');
            btn.querySelector('.btn__label').textContent = 'Enviar mensaje';
          }
        });
    });
  }

  /* --------------------------------------- 8. BOTÓN ARRIBA + AÑO FOOTER */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
