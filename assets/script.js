(() => {
  // Header shadow on scroll
  const header = document.querySelector('.header');
  const pagetop = document.querySelector('.pagetop');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    pagetop.classList.toggle('is-show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // Count-up numbers
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Works filter
  const filterBtns = document.querySelectorAll('.works-filter button');
  filterBtns.forEach((b) => b.addEventListener('click', () => {
    filterBtns.forEach((x) => x.classList.toggle('is-active', x === b));
    const f = b.dataset.filter;
    document.querySelectorAll('.work').forEach((w) => {
      w.classList.toggle('is-hidden', f !== 'all' && w.dataset.cat !== f);
    });
  }));

  // Contact form (demo: validation only, no sending)
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = !f.value.trim() || (f.type === 'email' && !f.checkValidity());
      f.classList.toggle('is-error', bad);
      if (bad) ok = false;
    });
    if (!ok) { msg.textContent = '必須項目をご確認ください。'; return; }
    msg.textContent = 'お問い合わせありがとうございます。担当者より折り返しご連絡いたします。';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
