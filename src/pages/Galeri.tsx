import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Calendar, MapPin, Image as ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { albums, photos, stats } from '../data';
import type { Photo } from '../data';

// Get unique categories from albums
const galleryCategories = ['Semua', ...Array.from(new Set(albums.map(a => a.category)))];

// Photo Grid Item Component
function PhotoGridItem({ 
  photo, 
  onClick 
}: { 
  photo: Photo; 
  onClick: () => void;
}) {
  return (
    <div 
      className="gallery-grid-item reveal-on-scroll"
      onClick={onClick}
    >
      <div className="gallery-grid-item-inner">
        <img
          src={photo.url}
          alt={photo.caption || 'Gallery photo'}
          loading="lazy"
          decoding="async"
        />
        <div className="gallery-grid-item-overlay">
          {photo.caption && <span className="gallery-grid-item-caption">{photo.caption}</span>}
        </div>
      </div>
    </div>
  );
}

// Fullscreen Lightbox Component
function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const currentPhoto = photos[currentIndex];
  const totalPhotos = photos.length;

  // Reset direction after animation
  useEffect(() => {
    const timer = setTimeout(() => setDirection(null), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      setDirection('left');
      onNavigate(currentIndex - 1);
    } else if (e.key === 'ArrowRight' && currentIndex < totalPhotos - 1) {
      setDirection('right');
      onNavigate(currentIndex + 1);
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [currentIndex, totalPhotos, onNavigate, onClose]);

  // Attach keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < totalPhotos - 1) {
        setDirection('right');
        onNavigate(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setDirection('left');
        onNavigate(currentIndex - 1);
      }
    }
  };

  // Preload adjacent images
  useEffect(() => {
    if (photos[currentIndex - 1]) {
      const img = new Image();
      img.src = photos[currentIndex - 1].url;
    }
    if (photos[currentIndex + 1]) {
      const img = new Image();
      img.src = photos[currentIndex + 1].url;
    }
  }, [currentIndex, photos]);

  return (
    <div 
      className="photo-lightbox"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop */}
      <div className="photo-lightbox-backdrop" onClick={onClose} />

      {/* Close button */}
      <button
        className="photo-lightbox-close"
        onClick={onClose}
        aria-label="Close"
        type="button"
      >
        <X size={24} />
      </button>

      {/* Navigation arrows - Desktop */}
      {currentIndex > 0 && (
        <button
          className="photo-lightbox-nav photo-lightbox-prev"
          onClick={() => {
            setDirection('left');
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous"
          type="button"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      {currentIndex < totalPhotos - 1 && (
        <button
          className="photo-lightbox-nav photo-lightbox-next"
          onClick={() => {
            setDirection('right');
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next"
          type="button"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Main Image */}
      <div className={`photo-lightbox-content ${direction ? `slide-${direction}` : ''}`}>
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption || 'Gallery photo'}
          className="photo-lightbox-image"
        />
      </div>

      {/* Photo Info */}
      <div className="photo-lightbox-info">
        <div className="photo-lightbox-counter">
          <span className="current">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="divider">/</span>
          <span className="total">{String(totalPhotos).padStart(2, '0')}</span>
        </div>
        {currentPhoto.caption && (
          <p className="photo-lightbox-caption">{currentPhoto.caption}</p>
        )}
        <div className="photo-lightbox-meta">
          {currentPhoto.year && (
            <span className="photo-lightbox-meta-item">
              <Calendar size={14} /> {currentPhoto.year}
            </span>
          )}
          {currentPhoto.location && (
            <span className="photo-lightbox-meta-item">
              <MapPin size={14} /> {currentPhoto.location}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Gallery Component
export default function Galeri() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'Semua') return photos;
    return photos.filter(p => {
      const album = albums.find(a => a.id === p.albumId);
      return album?.category === selectedCategory;
    });
  }, [selectedCategory]);

  const openLightbox = useCallback((photoList: Photo[], index: number) => {
    setLightboxPhotos(photoList);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setLightboxPhotos([]);
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <div className="gallery-page">
      {/* Premium Header */}
      <section className="gallery-header">
        <div className="container">
          <span className="eyebrow">FAMILY MEMORIES</span>
          <h1 className="gallery-title">Moments We Keep Forever</h1>
          <p className="gallery-description">
            A collection of photographs that preserve the people, places, celebrations, 
            and little moments that make our family story unforgettable.
          </p>
          
          {/* Stats */}
          <div className="gallery-stats">
            <div className="gallery-stat">
              <span className="gallery-stat-number">{albums.length}</span>
              <span className="gallery-stat-label">Albums</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat-number">{photos.length}</span>
              <span className="gallery-stat-label">Photos</span>
            </div>
            <div className="gallery-stat">
              <span className="gallery-stat-number">{stats.totalPhotos}</span>
              <span className="gallery-stat-label">Memories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="gallery-filter-bar">
        <div className="container">
          <div className="gallery-filter-scroll">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Content - Grid Layout */}
      <section className="gallery-content">
        <div className="container">
          {filteredPhotos.length === 0 ? (
            <div className="gallery-empty">
              <ImageIcon size={48} className="gallery-empty-icon" />
              <h3>No memories found</h3>
              <p>Try selecting a different category.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredPhotos.map((photo, index) => (
                <PhotoGridItem
                  key={photo.id}
                  photo={photo}
                  onClick={() => openLightbox(filteredPhotos, index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && lightboxPhotos.length > 0 && (
        <PhotoLightbox
          photos={lightboxPhotos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}
