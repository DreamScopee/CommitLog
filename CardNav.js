document.addEventListener('DOMContentLoaded', () => {
  const navRef = document.querySelector('.card-nav');
  if (!navRef) return;

  const hamburgerMenu = navRef.querySelector('.hamburger-menu');
  const cards = [...navRef.querySelectorAll('.nav-card')];
  let isHamburgerOpen = false;
  let isExpanded = false;
  let tl = null;

  const calculateHeight = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navRef.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    gsap.set(navRef, { height: 60, overflow: 'hidden' });
    gsap.set(cards, { y: 50, opacity: 0 });

    const newTl = gsap.timeline({ paused: true });

    newTl.to(navRef, {
      height: calculateHeight,
      duration: 0.4,
      ease: 'power3.out'
    });

    newTl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, '-=0.1');

    return newTl;
  };

  tl = createTimeline();

  window.addEventListener('resize', () => {
    if (!tl) return;

    if (isExpanded) {
      const newHeight = calculateHeight();
      gsap.set(navRef, { height: newHeight });

      tl.kill();
      const newTl = createTimeline();
      if (newTl) {
        newTl.progress(1);
        tl = newTl;
      }
    } else {
      tl.kill();
      const newTl = createTimeline();
      if (newTl) {
        tl = newTl;
      }
    }
  });

  hamburgerMenu.addEventListener('click', () => {
    if (!tl) return;
    if (!isExpanded) {
      isHamburgerOpen = true;
      isExpanded = true;
      navRef.classList.add('open');
      hamburgerMenu.classList.add('open');
      tl.play(0);
    } else {
      isHamburgerOpen = false;
      tl.eventCallback('onReverseComplete', () => {
        isExpanded = false;
        navRef.classList.remove('open');
        hamburgerMenu.classList.remove('open');
      });
      tl.reverse();
    }
  });
});
