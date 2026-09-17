import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  eyebrow: string;
  title: string[];
  titleGold?: number[];
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonStyle: 'primary' | 'secondary';
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: 'ZAHIRA FAMILY',
    title: ['One Family.', 'Many Stories.', 'One Beautiful Legacy.'],
    titleGold: [1],
    description:
      'A beautiful place to remember the people, moments, and stories that make our family who we are.',
    buttonText: 'Explore Our Family',
    buttonLink: '/keluarga',
    buttonStyle: 'primary',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&h=900&fit=crop',
  },
  {
    id: 2,
    eyebrow: 'OUR FAMILY',
    title: ['Together Is Our', 'Favorite Place To Be.'],
    titleGold: [2],
    description:
      'Every generation adds another chapter to our family story.',
    buttonText: 'Meet The Family',
    buttonLink: '/keluarga',
    buttonStyle: 'primary',
    image:
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&h=900&fit=crop',
  },
  {
    id: 3,
    eyebrow: 'FAMILY MEMORIES',
    title: ['Moments Worth', 'Remembering.'],
    titleGold: [1],
    description:
      'From simple gatherings to unforgettable celebrations, every moment becomes part of our story.',
    buttonText: 'View Gallery',
    buttonLink: '/galeri',
    buttonStyle: 'primary',
    image:
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1400&h=900&fit=crop',
  },
  {
    id: 4,
    eyebrow: 'OUR LEGACY',
    title: ['Generations Connected', 'By Love.'],
    titleGold: [1],
    description:
      'A growing family, shared memories, and a legacy that continues.',
    buttonText: 'Explore Timeline',
    buttonLink: '/timeline',
    buttonStyle: 'primary',
    image:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1400&h=900&fit=crop',
  },
];

const AUTOPLAY_DELAY = 5500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const goTo = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(dir || (index > current ? 'next' : 'prev'));
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 1100);
    },
    [current, isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next');
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, paused]);

  // Progress bar animation
  useEffect(() => {
    if (reducedMotion.current) return;
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.transform = 'scaleX(0)';
      requestAnimationFrame(() => {
        if (progressRef.current && !paused) {
          progressRef.current.style.transition = `transform ${AUTOPLAY_DELAY}ms linear`;
          progressRef.current.style.transform = 'scaleX(1)';
        }
      });
    }
  }, [current, paused]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTimeout(() => setPaused(false), 800);
  };

  // Mouse pause
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <section
      ref={sliderRef}
      className="hero-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background slides */}
      <div className="hero-slider-images">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-slider-bg ${i === current ? 'active' : ''} ${
              i === current && direction === 'next' ? 'enter-next' : ''
            } ${i === current && direction === 'prev' ? 'enter-prev' : ''}`}
          >
            <img src={s.image} alt={s.eyebrow} loading={i < 2 ? 'eager' : 'lazy'} />
            <div className="hero-slider-gradient" />
            <div className="hero-slider-vignette" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container hero-slider-content-wrap">
        <div className="hero-slider-content">
          <span className={`hero-slider-eyebrow ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {slide.eyebrow}
          </span>
          <h1 className={`hero-slider-title ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {slide.title.map((line, idx) => (
              <span key={idx} className={slide.titleGold?.includes(idx) ? 'gold' : ''}>
                {line}
                {idx < slide.title.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className={`hero-slider-description ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {slide.description}
          </p>
          <div className={`hero-slider-button ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            <Link
              to={slide.buttonLink}
              className={`btn ${slide.buttonStyle === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        className="hero-slider-arrow hero-slider-arrow-prev"
        onClick={() => prev()}
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        className="hero-slider-arrow hero-slider-arrow-next"
        onClick={() => next()}
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="hero-slider-indicators">
        <div className="hero-slider-numbers">
          <span>{String(current + 1).padStart(2, '0')}</span>
          <span className="hero-slider-divider">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
        <div className="hero-slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-slider-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            >
              <div className="hero-slider-dot-fill">
                {i === current && <div ref={progressRef} className="hero-slider-dot-progress" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
