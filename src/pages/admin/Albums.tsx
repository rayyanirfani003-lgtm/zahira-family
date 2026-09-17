import { Plus, Calendar, Edit2, Trash2 } from 'lucide-react';
import { albums } from '../../data';

export default function AdminAlbums() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#292722' }}>Albums</h1>
          <p style={{ fontSize: '14px', color: '#756F66' }}>{albums.length} album foto</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: '12px', gap: '8px' }}><Plus size={16} /> Buat Album</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {albums.map((album) => (
          <div key={album.id} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(41,39,34,0.04)' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
              <img src={album.cover} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '8px', right: '8px', padding: '4px 10px', borderRadius: '99px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '12px' }}>{album.photoCount} foto</div>
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#292722' }}>{album.title}</h3>
              <p style={{ fontSize: '12px', color: '#756F66', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {album.year} • {album.category}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#F8F5EF', color: '#292722', fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><Edit2 size={12} /> Edit</button>
                <button style={{ padding: '8px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
