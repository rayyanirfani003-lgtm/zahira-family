import { useState } from 'react';
import { Search, MapPin, Heart, Users, ChevronRight, X } from 'lucide-react';
import { familyMembers } from '../data';

const categories = [
  'Semua',
  'Kakek & Nenek',
  'Orang Tua',
  'Mertua',
  'Anak',
  'Menantu',
  'Cucu',
  'Saudara',
  'Paman & Bibi',
  'Sepupu',
  'Keluarga Besar',
];

const generations = ['Semua', '1', '2', '3'];

export default function Keluarga() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedGeneration, setSelectedGeneration] = useState('Semua');
  const [selectedMember, setSelectedMember] = useState<typeof familyMembers[0] | null>(null);

  const filteredMembers = familyMembers.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.nickname?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || m.relationship === selectedCategory;
    const matchGeneration = selectedGeneration === 'Semua' || m.generation.toString() === selectedGeneration;
    return matchSearch && matchCategory && matchGeneration;
  });

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(to bottom right, #EFE9DE, #F8F5EF)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', borderRadius: '50%', background: '#B5965A', filter: 'blur(100px)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="eyebrow hero-content-reveal hero-content-reveal-1">FAMILY DIRECTORY</span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '40px', fontWeight: 500, color: '#292722', marginBottom: '16px' }} className="hero-content-reveal hero-content-reveal-2">Keluarga Kami</h1>
          <p style={{ fontSize: '16px', color: '#756F66', maxWidth: '480px', margin: '0 auto' }} className="hero-content-reveal hero-content-reveal-3">Setiap anggota adalah cerita, setiap wajah adalah kenangan yang berharga.</p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '24px 0', background: '#FFFFFF', borderBottom: '1px solid rgba(181, 150, 90, 0.15)', position: 'sticky', top: '64px', zIndex: 30 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
                <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#756F66' }} size={16} />
                <input
                  type="text"
                  placeholder="Cari anggota keluarga..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '99px',
                      fontSize: '12px',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      background: selectedCategory === cat ? '#292722' : '#EFE9DE',
                      color: selectedCategory === cat ? '#FFFFFF' : '#756F66',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#756F66' }}>Gen:</span>
                {generations.map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setSelectedGeneration(gen)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: selectedGeneration === gen ? '#B5965A' : '#EFE9DE',
                      color: selectedGeneration === gen ? '#FFFFFF' : '#756F66',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {gen === 'Semua' ? 'All' : gen}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section style={{ padding: '60px 0', background: '#F8F5EF' }}>
        <div className="container">
          {filteredMembers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Users size={64} color="#D5C9B5" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', color: '#756F66', marginBottom: '8px' }}>Tidak ada anggota ditemukan</h3>
              <p style={{ color: '#756F66', fontSize: '14px' }}>Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="keluarga-member-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} data-stagger="100">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="card keluarga-member-card reveal-on-scroll"
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(41, 39, 34, 0.6), transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '99px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '10px', fontWeight: 500, marginBottom: '8px' }}>
                        Gen {member.generation}
                      </span>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#FFFFFF' }}>{member.name}</h3>
                    </div>
                  </div>
                  <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', color: '#292722', fontWeight: 500 }}>{member.relationship}</p>
                      <p style={{ fontSize: '12px', color: '#756F66', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <MapPin size={12} /> {member.city}
                      </p>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(181, 150, 90, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronRight size={16} color="#B5965A" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '28px 28px 0 0' }}>
              <img src={selectedMember.photo} alt={selectedMember.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(41, 39, 34, 0.7), transparent)' }} />
              <button
                onClick={() => setSelectedMember(null)}
                className="modal-close"
              >
                <X size={18} />
              </button>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 600, color: '#FFFFFF' }}>{selectedMember.name}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{selectedMember.nickname && `${selectedMember.nickname} • `}{selectedMember.relationship}</p>
              </div>
            </div>
            <div style={{ padding: '28px' }}>
              {selectedMember.bio && <p style={{ color: '#292722', lineHeight: 1.7, marginBottom: '24px' }}>{selectedMember.bio}</p>}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {selectedMember.birthDate && (
                  <div style={{ padding: '16px', borderRadius: '12px', background: '#F8F5EF' }}>
                    <p style={{ fontSize: '12px', color: '#756F66', marginBottom: '4px' }}>Tanggal Lahir</p>
                    <p style={{ fontWeight: 500, color: '#292722', fontSize: '14px' }}>
                      {new Date(selectedMember.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                )}
                <div style={{ padding: '16px', borderRadius: '12px', background: '#F8F5EF' }}>
                  <p style={{ fontSize: '12px', color: '#756F66', marginBottom: '4px' }}>Kota</p>
                  <p style={{ fontWeight: 500, color: '#292722', fontSize: '14px' }}>{selectedMember.city}</p>
                </div>
                <div style={{ padding: '16px', borderRadius: '12px', background: '#F8F5EF' }}>
                  <p style={{ fontSize: '12px', color: '#756F66', marginBottom: '4px' }}>Generasi</p>
                  <p style={{ fontWeight: 500, color: '#292722', fontSize: '14px' }}>Generasi {selectedMember.generation}</p>
                </div>
                <div style={{ padding: '16px', borderRadius: '12px', background: '#F8F5EF' }}>
                  <p style={{ fontSize: '12px', color: '#756F66', marginBottom: '4px' }}>Cabang</p>
                  <p style={{ fontWeight: 500, color: '#292722', fontSize: '14px' }}>{selectedMember.branch}</p>
                </div>
              </div>

              {selectedMember.spouseId && (
                <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(181, 150, 90, 0.08)', border: '1px solid rgba(181, 150, 90, 0.15)' }}>
                  <p style={{ fontSize: '12px', color: '#B5965A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={12} fill="#B5965A" /> Pasangan
                  </p>
                  <p style={{ fontWeight: 500, color: '#292722' }}>
                    {familyMembers.find(m => m.id === selectedMember.spouseId)?.name || '-'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
