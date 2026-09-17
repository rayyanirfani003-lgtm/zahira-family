import { useState } from 'react';
import { BookOpen, Calendar, User, Tag, X } from 'lucide-react';
import { stories } from '../data';

const storyCategories = ['Semua','Kisah Kakek & Nenek','Kisah Orang Tua','Masa Kecil','Pernikahan','Perjalanan Keluarga','Kisah Anak','Kisah Cucu','Tradisi Keluarga','Nasihat Orang Tua','Kenangan Istimewa'];

export default function Cerita() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const filteredStories = selectedCategory === 'Semua' ? stories : stories.filter(s => s.category === selectedCategory);

  return (
    <div className="cerita-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">FAMILY STORIES</span>
          <h1 className="page-title">Cerita Keluarga</h1>
          <p className="page-description">Kisah-kisah yang menghangatkan hati dari setiap generasi.</p>
        </div>
      </section>

      <section className="filter-bar">
        <div className="container">
          <div className="filter-scroll">
            {storyCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          {filteredStories.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} className="empty-state-icon" />
              <h3>Belum ada cerita</h3>
            </div>
          ) : (
            <div className="story-grid">
              {filteredStories.map((story) => (
                <article key={story.id} className="story-card" onClick={() => setSelectedStory(story)}>
                  <div className="story-card-image">
                    <img src={story.cover} alt={story.title} />
                    <span className="story-card-category">{story.category}</span>
                  </div>
                  <div className="story-card-body">
                    <h3 className="story-card-title">{story.title}</h3>
                    <p className="story-card-excerpt">{story.excerpt}</p>
                    <div className="story-card-meta">
                      <span><User size={12} /> {story.author}</span>
                      <span><Calendar size={12} /> {new Date(story.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <span className="story-card-link">Baca cerita →</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedStory && (
        <div className="modal-overlay" onClick={() => setSelectedStory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image">
              <img src={selectedStory.cover} alt={selectedStory.title} />
              <button onClick={() => setSelectedStory(null)} className="modal-close"><X size={18} /></button>
            </div>
            <div className="modal-body">
              <span className="story-category">{selectedStory.category}</span>
              <h2>{selectedStory.title}</h2>
              <div className="modal-meta">
                <span><User size={14} /> {selectedStory.author}</span>
                <span><Calendar size={14} /> {new Date(selectedStory.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              {selectedStory.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              {selectedStory.tags.length > 0 && (
                <div className="modal-tags">
                  <Tag size={14} color="#756F66" />
                  {selectedStory.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
