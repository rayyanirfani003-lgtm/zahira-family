import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Zahira Family — Repeat Scroll Animation
 *
 * Perilaku:
 * - Elemen masuk viewport  → animasi berjalan
 * - Elemen keluar viewport  → animasi di-reset
 * - Masuk viewport lagi     → animasi berjalan lagi
 * - Berlaku terus-menerus tanpa refresh
 * - Berlaku saat scroll turun maupun scroll naik
 */

const REVEAL_SELECTOR =
  '.reveal-on-scroll, .image-reveal';

function initStagger() {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((container) => {
    const children = container.querySelectorAll<HTMLElement>(':scope > *');
    const baseDelay = Number(container.dataset.stagger || 80);

    children.forEach((child, index) => {
      child.style.setProperty(
        '--reveal-delay',
        `${index * baseDelay}ms`
      );
    });
  });
}

/**
 * Repeat reveal animation.
 *
 * Setiap kali elemen masuk viewport:
 *   hidden → visible
 *
 * Setiap kali elemen keluar viewport:
 *   visible → hidden
 *
 * Jadi ketika masuk lagi, transition diputar ulang.
 */
function initScrollReveal() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
  );

  if (!elements.length) {
    return () => {};
  }

  // Browser lama / environment tanpa IntersectionObserver.
  // Dalam kondisi ini kita tidak bisa mendeteksi scroll,
  // jadi elemen dibuat terlihat.
  if (typeof IntersectionObserver === 'undefined') {
    elements.forEach((element) => {
      element.classList.add('reveal-visible');
    });

    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          /*
           * Reset dulu.
           *
           * Ini penting supaya transition selalu dimulai
           * dari posisi hidden setiap kali masuk viewport.
           */
          element.classList.remove('reveal-visible');

          /*
           * Force browser reflow.
           * Tanpa ini browser bisa menganggap perubahan
           * class terjadi dalam satu frame dan transition
           * tidak dimainkan ulang.
           */
          void element.offsetWidth;

          /*
           * Tambahkan kembali pada frame berikutnya.
           */
          requestAnimationFrame(() => {
            element.classList.add('reveal-visible');
          });
        } else {
          /*
           * Elemen keluar viewport.
           *
           * Hapus class agar ketika masuk lagi,
           * animasi akan berjalan dari awal.
           */
          element.classList.remove('reveal-visible');
        }
      });
    },
    {
      /*
       * Sangat kecil supaya elemen cepat terdeteksi.
       */
      threshold: 0.01,

      /*
       * Sedikit area buffer supaya animasi terasa natural.
       */
      rootMargin: '0px 0px -5% 0px',
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

  /*
   * Initial check.
   *
   * Beberapa browser kadang belum mengirim intersection
   * callback secepat yang diharapkan setelah route berubah.
   */
  const initialTimer = window.setTimeout(() => {
    elements.forEach((element) => {
      if (element.classList.contains('reveal-visible')) {
        return;
      }

      const rect = element.getBoundingClientRect();

      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      ) {
        element.classList.remove('reveal-visible');

        void element.offsetWidth;

        requestAnimationFrame(() => {
          element.classList.add('reveal-visible');
        });
      }
    });
  }, 100);

  return () => {
    observer.disconnect();
    window.clearTimeout(initialTimer);
  };
}

/**
 * Count-up statistic.
 *
 * Berbeda dengan reveal:
 * angka hanya dihitung sekali supaya tidak
 * kembali ke 0 setiap kali scroll.
 */
function initCountUp() {
  const statNumbers =
    document.querySelectorAll<HTMLElement>('.stat-number');

  if (!statNumbers.length) {
    return () => {};
  }

  if (typeof IntersectionObserver === 'undefined') {
    statNumbers.forEach((element) => {
      const value = element.dataset.value;

      if (value) {
        element.textContent =
          value + (element.dataset.suffix || '');
      }
    });

    return () => {};
  }

  const animated = new WeakSet<HTMLElement>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target as HTMLElement;

        if (animated.has(element)) {
          return;
        }

        animated.add(element);

        const finalValue = Number(
          element.dataset.value ||
          element.textContent?.replace(/\D/g, '') ||
          0
        );

        const suffix =
          element.dataset.suffix || '';

        const duration = 1200;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed =
            currentTime - startTime;

          const progress = Math.min(
            elapsed / duration,
            1
          );

          const eased =
            1 - Math.pow(1 - progress, 3);

          const current = Math.round(
            finalValue * eased
          );

          element.textContent =
            `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);

        observer.unobserve(element);
      });
    },
    {
      threshold: 0.3,
    }
  );

  statNumbers.forEach((element) => {
    observer.observe(element);
  });

  return () => {
    observer.disconnect();
  };
}

export function ScrollAnimationProvider() {
  const location = useLocation();

  const revealCleanupRef =
    useRef<(() => void) | null>(null);

  const countCleanupRef =
    useRef<(() => void) | null>(null);

  useEffect(() => {
    /*
     * Bersihkan observer dari route sebelumnya.
     */
    revealCleanupRef.current?.();
    countCleanupRef.current?.();

    revealCleanupRef.current = null;
    countCleanupRef.current = null;

    let cancelled = false;

    /*
     * Beri waktu React menyelesaikan render
     * halaman baru sebelum mencari elemen.
     */
    const timer = window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      initStagger();

      revealCleanupRef.current =
        initScrollReveal();

      countCleanupRef.current =
        initCountUp();
    }, 80);

    return () => {
      cancelled = true;

      window.clearTimeout(timer);

      revealCleanupRef.current?.();
      countCleanupRef.current?.();

      revealCleanupRef.current = null;
      countCleanupRef.current = null;
    };
  }, [location.pathname]);

  return null;
}
