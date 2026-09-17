import { Plus, BookOpen, Calendar, Edit2, Trash2 } from 'lucide-react';
import { stories } from '../../data';

export default function AdminStories() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#292722' }}>Stories</h1>
          <p style={{ fontSize: '14px', color: '#756F66' }}>{stories.length} cerita keluarga</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: '12px', gap: '8px' }}><Plus size={16} /> Tulis Cerita</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {stories.map((story) => (
          <div key={story.id} style={{ background: '#fff', borderRadius: '16px', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 2px 12px rgba(41,39,34,0.04)' }}>
            <img src={story.cover} alt={story.title} style={{ width: '128px', height: '128px', borderRadius: '12px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B5965A' }}>{story.category}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#292722', marginTop: '4px' }}>{story.title}</h3>
                  <p style={{ fontSize: '14px', color: '#756F66', marginTop: '4px' }}>{story.excerpt}</p>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#756F66', marginTop: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={12} /> {story.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {new Date(story.date).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16} color="#756F66" /></button>
                  <button style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} color="#ef4444" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
