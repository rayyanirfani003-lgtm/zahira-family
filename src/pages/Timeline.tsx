import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { timelineEvents } from '../data';

export default function Timeline() {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  
  const decades = timelineEvents.reduce((acc, event) => {
    const decade = Math.floor(event.year / 10) * 10;
    if (!acc[decade]) acc[decade] = [];
    acc[decade].push(event);
    return acc;
  }, {} as Record<number, typeof timelineEvents>);

  return (
    <div className="timeline-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">OUR JOURNEY</span>
          <h1 className="page-title">Timeline Keluarga</h1>
          <p className="page-description">Perjalanan keluarga dari masa ke masa.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="timeline-wrapper">
            {Object.entries(decades)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([decade, events]) => (
                <div key={decade} className="timeline-decade">
                  <div className="timeline-decade-header">
                    <div className="timeline-decade-badge">
                      <Star size={14} fill="#fff" color="#fff" />
                      <span>{decade}</span>
                    </div>
                    <div className="timeline-decade-info">
                      <h2>Dekade {decade}</h2>
                      <p>{events.length} momen tercatat</p>
                    </div>
                  </div>
                  
                  <div className="timeline-events">
                    {events
                      .sort((a, b) => b.year - a.year)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`timeline-event ${expandedYear === event.year ? 'expanded' : ''}`}
                          onClick={() => setExpandedYear(expandedYear === event.year ? null : event.year)}
                        >
                          <div className="timeline-event-dot" />
                          <div className="timeline-event-card">
                            <div className="timeline-event-header">
                              <span className="timeline-event-year">{event.year}</span>
                              <button className="timeline-event-toggle" type="button">
                                {expandedYear === event.year ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                            <h3 className="timeline-event-title">{event.title}</h3>
                            <p className="timeline-event-desc">{event.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
