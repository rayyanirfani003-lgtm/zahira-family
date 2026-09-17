import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import { familyMembers, albums, stories, timelineEvents, familyEvents, familyQuotes, stats } from '../data';

export default function Home() {
  const featuredMembers = familyMembers.slice(0, 6);
  const latestAlbums = albums.slice(0, 4);
  const latestStories = stories.slice(0, 3);
  const upcomingEvents = familyEvents.slice(0, 3);
  const recentTimeline = timelineEvents.slice(-4).reverse();
  const randomQuote = familyQuotes[Math.floor(Math.random() * familyQuotes.length)];

  return (
    <div className="home-page">
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* STATISTICS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal-on-scroll" style={{ '--reveal-delay': '0ms' } as React.CSSProperties}>
              <div className="stat-number" data-value={stats.totalMembers}>{stats.totalMembers}</div>
              <div className="stat-label">Total Anggota</div>
            </div>
            <div className="stat-item reveal-on-scroll" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
              <div className="stat-number" data-value={stats.totalGenerations}>{stats.totalGenerations}</div>
              <div className="stat-label">Generasi</div>
            </div>
            <div className="stat-item reveal-on-scroll" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
              <div className="stat-number" data-value={stats.totalAlbums}>{stats.totalAlbums}</div>
              <div className="stat-label">Album Foto</div>
            </div>
            <div className="stat-item reveal-on-scroll" style={{ '--reveal-delay': '240ms' } as React.CSSProperties}>
              <div className="stat-number" data-value={stats.totalStories}>{stats.totalStories}</div>
              <div className="stat-label">Cerita Keluarga</div>
            </div>
          </div>
        </div>
      </section>

      {/* KELUARGA KAMI */}
      <section className="section" style={{ background: '#F8F5EF' }}>
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <span className="eyebrow">THE PEOPLE WE CALL FAMILY</span>
            <h2>Keluarga Kami</h2>
            <p>Setiap anggota adalah cerita, setiap wajah adalah kenangan yang berharga.</p>
          </div>

          <div className="home-family-grid" data-stagger="100">
            {featuredMembers.map((member) => (
              <Link
                key={member.id}
                to="/keluarga"
                className="home-family-card reveal-on-scroll"
              >
                <div className="home-family-photo">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                  />

                  <div className="home-family-gradient" />

                  <div className="home-family-love">
                    <Heart size={17} fill="currentColor" />
                  </div>

                  <div className="home-family-overlay-info">
                    <span className="home-family-gen">
                      Gen {member.generation}
                    </span>

                    <h3>{member.nickname || member.name}</h3>
                  </div>
                </div>

                <div className="home-family-bottom">
                  <div>
                    <p className="home-family-relationship">
                      {member.relationship}
                    </p>

                    <p className="home-family-city">
                      <MapPin size={13} />
                      {member.city}
                    </p>
                  </div>

                  <span className="home-family-arrow">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-cta reveal-on-scroll">
            <Link to="/keluarga" className="btn btn-secondary">Lihat Semua Anggota <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* MEMORY GALLERY */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <span className="eyebrow">MOMENTS WE KEEP</span>
            <h2>Kenangan Terbaru</h2>
            <p>Momen-momen indah yang tersimpan dalam album keluarga.</p>
          </div>

          <div className="gallery-preview-grid" data-stagger="120">
            {latestAlbums.map((album) => (
              <Link
                key={album.id}
                to="/galeri"
                className="gallery-preview-item reveal-on-scroll"
              >
                <img src={album.cover} alt={album.title} className="image-reveal" loading="lazy" />
                <div className="gallery-preview-overlay">
                  <h4>{album.title}</h4>
                  <span>{album.photoCount} foto</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-cta reveal-on-scroll">
            <Link to="/galeri" className="btn btn-secondary">
              Lihat Semua Kenangan <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CERITA KELUARGA */}
      <section className="section" style={{ background: '#F8F5EF' }}>
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <span className="eyebrow">OUR STORIES</span>
            <h2>Cerita Keluarga</h2>
            <p>Kisah-kisah yang menghangatkan hati dari setiap generasi.</p>
          </div>

          <div className="stories-grid">
            {/* Featured Story */}
            <Link to="/cerita" className="story-featured reveal-on-scroll">
              <div className="story-featured-image">
                <img src={latestStories[0].cover} alt={latestStories[0].title} loading="lazy" />
              </div>
              <div className="story-featured-body">
                <span className="story-category">{latestStories[0].category}</span>
                <h3 className="story-title">{latestStories[0].title}</h3>
                <p className="story-excerpt">{latestStories[0].excerpt}</p>
                <div className="story-meta">
                  <span>{latestStories[0].author}</span>
                  <span>•</span>
                  <span>{new Date(latestStories[0].date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>

            {/* Side Stories */}
            <div className="stories-side" data-stagger="100">
              {latestStories.slice(1).map((story) => (
                <Link key={story.id} to="/cerita" className="story-side-item reveal-on-scroll">
                  <img src={story.cover} alt={story.title} className="story-side-image" loading="lazy" />
                  <div className="story-side-body">
                    <span className="story-category">{story.category}</span>
                    <h4 className="story-side-title">{story.title}</h4>
                    <p className="story-excerpt line-clamp-2">{story.excerpt}</p>
                    <div className="story-meta">
                      <span>{story.author}</span> • <span>{new Date(story.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <span className="eyebrow">OUR JOURNEY</span>
            <h2>Perjalanan Keluarga</h2>
            <p>Setiap tahun membawa cerita baru dalam perjalanan keluarga kami.</p>
          </div>

          <div className="timeline-grid" data-stagger="120">
            {recentTimeline.map((event) => (
              <div key={event.id} className="timeline-card reveal-on-scroll">
                <div className="timeline-year">{event.year}</div>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-desc">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="section-cta reveal-on-scroll">
            <Link to="/timeline" className="btn btn-secondary">Lihat Timeline Lengkap <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS - DARK */}
      <section className="events-section">
        <div className="container">
          <div className="section-heading reveal-on-scroll">
            <span className="eyebrow">MOMENTS AHEAD</span>
            <h2 style={{ color: '#F8F5EF' }}>Acara Mendatang</h2>
            <p>Momen-momen yang dinantikan seluruh keluarga.</p>
          </div>

          <div className="events-grid" data-stagger="100">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card reveal-on-scroll">
                <div className="event-date-badge">
                  <span className="month">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()}</span>
                  <span className="day">{new Date(event.date).getDate()}</span>
                </div>
                <h3>{event.name}</h3>
                {event.description && <p>{event.description}</p>}
                {event.location && (
                  <div className="event-location">
                    <MapPin size={12} /> {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="section-cta reveal-on-scroll">
            <Link to="/acara" className="btn btn-gold">Lihat Semua Acara</Link>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-section">
        <div className="quote-mark reveal-on-scroll">
          <Heart size={40} fill="#B5965A" color="#B5965A" />
        </div>
        <div className="container">
          <p className="quote-text reveal-on-scroll">{randomQuote.text}</p>
          <p className="quote-author reveal-on-scroll" style={{ '--reveal-delay': '150ms' } as React.CSSProperties}>— {randomQuote.author}</p>
        </div>
      </section>
    </div>
  );
}
