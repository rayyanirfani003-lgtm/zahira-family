import { Plus, Calendar, Clock, MapPin, Edit2, Trash2 } from 'lucide-react';
import { familyEvents } from '../../data';

export default function AdminEvents() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#292722' }}>Events</h1>
          <p style={{ fontSize: '14px', color: '#756F66' }}>{familyEvents.length} acara terdaftar</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: '12px', gap: '8px' }}><Plus size={16} /> Buat Event</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {familyEvents.map((event) => (
          <div key={event.id} style={{ background: '#fff', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(41,39,34,0.04)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#E8EDE3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#475838' }}>{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' }).toUpperCase()}</span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#292722', lineHeight: 1 }}>{new Date(event.date).getDate()}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#292722' }}>{event.name}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#756F66', marginTop: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                {event.time && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {event.time}</span>}
                {event.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {event.location}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={16} color="#756F66" /></button>
              <button style={{ padding: '8px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} color="#ef4444" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
