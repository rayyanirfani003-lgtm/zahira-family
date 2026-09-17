import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Calendar, Users, BookOpen } from 'lucide-react';
import { familyMembers, stories } from '../data';
import { getSpouse, getParents, getChildren, getSiblings, getAge } from '../utils/familyTree';

export default function FamilyMemberProfile() {
  const { id } = useParams<{ id: string }>();
  const member = familyMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <div style={{ paddingTop: '64px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <span style={{ fontSize: '48px' }}>👤</span>
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#292722' }}>Anggota tidak ditemukan</h2>
        <Link to="/keluarga" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Kembali ke Keluarga
        </Link>
      </div>
    );
  }

  const spouse = getSpouse(member, familyMembers);
  const parents = getParents(member, familyMembers);
  const children = getChildren(member, familyMembers);
  const siblings = getSiblings(member, familyMembers);
  const age = getAge(member.birthDate);

  // Find related stories
  const relatedStories = stories.filter((s) =>
    s.relatedMembers.includes(member.id)
  );

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero section */}
      <section style={{ background: '#F8F5EF', padding: '60px 0 40px' }}>
        <div className="container">
          <Link
            to="/keluarga"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#756F66',
              textDecoration: 'none',
              marginBottom: '24px',
            }}
          >
            <ArrowLeft size={16} /> Kembali ke Keluarga
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '48px', alignItems: 'start' }}>
            {/* Photo */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div
                style={{
                  aspectRatio: '3/4',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(41,39,34,0.12)',
                }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="eyebrow">{member.relationship}</span>
              <h1
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '48px',
                  fontWeight: 600,
                  color: '#292722',
                  margin: '8px 0',
                  lineHeight: 1.1,
                }}
              >
                {member.name}
              </h1>
              {member.nickname && (
                <p style={{ fontSize: '18px', color: '#756F66', fontStyle: 'italic', marginBottom: '20px' }}>
                  &ldquo;{member.nickname}&rdquo;
                </p>
              )}

              {/* Meta */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                {member.birthDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#756F66', padding: '8px 16px', background: '#fff', borderRadius: '99px', boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}>
                    <Calendar size={14} color="#B5965A" />
                    <span>{age ? `${age} tahun` : member.birthDate}</span>
                  </div>
                )}
                {member.city && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#756F66', padding: '8px 16px', background: '#fff', borderRadius: '99px', boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}>
                    <MapPin size={14} color="#B5965A" />
                    <span>{member.city}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#756F66', padding: '8px 16px', background: '#fff', borderRadius: '99px', boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}>
                  <Users size={14} color="#B5965A" />
                  <span>Generasi {member.generation}</span>
                </div>
              </div>

              {member.bio && (
                <div style={{ padding: '20px 24px', background: '#fff', borderRadius: '16px', borderLeft: '3px solid #B5965A', boxShadow: '0 2px 12px rgba(41,39,34,0.04)' }}>
                  <p style={{ fontSize: '15px', color: '#292722', lineHeight: 1.75, margin: 0 }}>
                    {member.bio}
                  </p>
                </div>
              )}

              {/* Family Connections */}
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', fontWeight: 500, color: '#292722', marginBottom: '16px' }}>
                  Keluarga
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {parents.length > 0 && (
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#756F66', display: 'block', marginBottom: '8px' }}>
                        Orang Tua
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {parents.map((p) => (
                          <Link
                            key={p.id}
                            to={`/keluarga/${p.id}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px 6px 6px', background: '#fff', borderRadius: '99px', textDecoration: 'none', fontSize: '13px', color: '#292722', fontWeight: 500, boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}
                          >
                            <img src={p.photo} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span>{p.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {spouse && (
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#756F66', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                        <Heart size={12} fill="#B5965A" color="#B5965A" /> Pasangan
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <Link
                          to={`/keluarga/${spouse.id}`}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px 6px 6px', background: '#fff', borderRadius: '99px', textDecoration: 'none', fontSize: '13px', color: '#292722', fontWeight: 500, boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}
                        >
                          <img src={spouse.photo} alt={spouse.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <span>{spouse.name}</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {children.length > 0 && (
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#756F66', display: 'block', marginBottom: '8px' }}>
                        Anak
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {children.map((c) => (
                          <Link
                            key={c.id}
                            to={`/keluarga/${c.id}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px 6px 6px', background: '#fff', borderRadius: '99px', textDecoration: 'none', fontSize: '13px', color: '#292722', fontWeight: 500, boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}
                          >
                            <img src={c.photo} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span>{c.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {siblings.length > 0 && (
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#756F66', display: 'block', marginBottom: '8px' }}>
                        Saudara
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {siblings.map((s) => (
                          <Link
                            key={s.id}
                            to={`/keluarga/${s.id}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px 6px 6px', background: '#fff', borderRadius: '99px', textDecoration: 'none', fontSize: '13px', color: '#292722', fontWeight: 500, boxShadow: '0 2px 8px rgba(41,39,34,0.04)' }}
                          >
                            <img src={s.photo} alt={s.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span>{s.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section style={{ padding: '60px 0', background: '#fff' }}>
          <div className="container">
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '24px', fontWeight: 500, color: '#292722', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={20} color="#B5965A" /> Cerita Terkait
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {relatedStories.map((story) => (
                <Link
                  key={story.id}
                  to="/cerita"
                  style={{ background: '#F8F5EF', borderRadius: '16px', overflow: 'hidden', textDecoration: 'none' }}
                >
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                    <img src={story.cover} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5965A' }}>
                      {story.category}
                    </span>
                    <h4 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '16px', fontWeight: 500, color: '#292722', margin: '6px 0 0', lineHeight: 1.3 }}>
                      {story.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
