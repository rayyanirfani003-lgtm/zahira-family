import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Image as ImageIcon } from 'lucide-react';
import { familyEvents } from '../data';

function getCountdown(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

function Countdown({ date }: { date: string }) {
  const [countdown, setCountdown] = useState(getCountdown(date));
  useEffect(() => { const i = setInterval(() => setCountdown(getCountdown(date)), 60000); return () => clearInterval(i); }, [date]);
  if (!countdown) return <span className="countdown-badge">Hari ini!</span>;
  return (
    <div className="countdown">
      <span className="countdown-value">{countdown.days}h</span>
      <span className="countdown-sep">:</span>
      <span className="countdown-value">{countdown.hours}j</span>
    </div>
  );
}

export default function Acara() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const categories = ['Semua', 'Lebaran', 'Gathering', 'Ulang Tahun', 'Acara Keluarga', 'Pernikahan', 'Liburan'];
  const filteredEvents = selectedCategory === 'Semua' ? familyEvents : familyEvents.filter(e => e.category === selectedCategory);

  return (
    <div className="acara-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">UPCOMING EVENTS</span>
          <h1 className="page-title">Acara Keluarga</h1>
          <p className="page-description">Momen-momen yang dinantikan seluruh keluarga.</p>
        </div>
      </section>

      <section className="filter-bar">
        <div className="container">
          <div className="filter-scroll">
            {categories.map((cat) => (
              <button key={cat} className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)} type="button">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          {filteredEvents.length === 0 ? (
            <div className="empty-state">
              <ImageIcon size={48} className="empty-state-icon" />
              <h3>Belum ada acara</h3>
            </div>
          ) : (
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-card-image">
                    <div className="event-date-overlay">
                      <span className="event-month">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()}</span>
                      <span className="event-day">{new Date(event.date).getDate()}</span>
                    </div>
                  </div>
                  <div className="event-card-body">
                    <h3 className="event-card-title">{event.name}</h3>
                    {event.description && <p className="event-card-desc">{event.description}</p>}
                    <div className="event-card-meta">
                      <span><Calendar size={12} /> {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                      {event.time && <span><Clock size={12} /> {event.time}</span>}
                      {event.location && <span><MapPin size={12} /> {event.location}</span>}
                    </div>
                    <div className="event-card-footer">
                      <span className="event-rsvp"><Users size={12} /> {event.rsvpCount} orang</span>
                      <Countdown date={event.date} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
