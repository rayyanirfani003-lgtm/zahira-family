import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Search, ZoomIn, ZoomOut, Maximize2, Heart, MapPin, Calendar, Users } from 'lucide-react';
import { familyMembers, stats } from '../data';
import type { FamilyMember } from '../data';
import { buildFamilyTree, getSpouse, getParents, getChildren, getSiblings, type TreeNode } from '../utils/familyTree';
import FamilyTreeNode from '../components/FamilyTreeNode';

const GENERATION_FILTERS = [
  { value: 'all', label: 'Semua' },
  { value: '1', label: 'Generasi 1' },
  { value: '2', label: 'Generasi 2' },
  { value: '3', label: 'Generasi 3' },
  { value: '4', label: 'Generasi 4' },
];

export default function Silsilah() {
  const [search, setSearch] = useState('');
  const [genFilter, setGenFilter] = useState('all');
  const [zoom, setZoom] = useState(1);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [panelMember, setPanelMember] = useState<FamilyMember | null>(null);
  const treeScrollRef = useRef<HTMLDivElement>(null);

  // Build tree
  const tree = useMemo(() => buildFamilyTree(familyMembers), []);

  // Filter tree by generation
  const filterByGeneration = useMemo(() => {
    if (genFilter === 'all') return tree;
    const gen = parseInt(genFilter, 10);
    return filterTreeByGen(tree, gen);
  }, [tree, genFilter]);

  // Search filter
  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return familyMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.nickname?.toLowerCase().includes(q) ||
        m.relationship.toLowerCase().includes(q)
    );
  }, [search]);

  // Auto-select searched member
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setSelectedId(searchResults[0].id);
    }
  }, [searchResults]);

  // Auto-center tree on initial load and when zoom/filter changes
  useEffect(() => {
    const el = treeScrollRef.current;
    if (!el) return;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        el.scrollLeft = maxScroll / 2;
      } else {
        el.scrollLeft = 0;
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [zoom, genFilter, tree]);

  const handleSelectMember = useCallback(
    (member: FamilyMember) => {
      setSelectedId(member.id);
      setPanelMember(member);
    },
    []
  );

  const handleNavigateToMember = useCallback(
    (id: string) => {
      const member = familyMembers.find((m) => m.id === id);
      if (member) {
        setSelectedId(id);
        setPanelMember(member);
      }
    },
    []
  );

  const closePanel = useCallback(() => {
    setPanelMember(null);
  }, []);

  // Center tree function
  const centerTree = useCallback(() => {
    const el = treeScrollRef.current;
    if (!el) return;
    
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      el.scrollTo({
        left: maxScroll / 2,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Header */}
      <section
        style={{
          padding: '80px 0 40px',
          background: 'linear-gradient(to bottom right, #EFE9DE, #F8F5EF)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <span className="eyebrow">OUR FAMILY TREE</span>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '40px',
              fontWeight: 500,
              color: '#292722',
              marginBottom: '16px',
            }}
            className="reveal-on-scroll"
          >
            The People Behind Our Story
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: '#756F66',
              maxWidth: '520px',
              margin: '0 auto 32px',
            }}
            className="reveal-on-scroll"
          >
            Every name represents a story, every connection represents a bond, and every
            generation continues our family legacy.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              marginTop: '24px',
            }}
            className="reveal-on-scroll"
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#292722',
                }}
              >
                {stats.totalMembers}
              </div>
              <div style={{ fontSize: '12px', color: '#756F66' }}>Anggota</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#292722',
                }}
              >
                {stats.totalGenerations}
              </div>
              <div style={{ fontSize: '12px', color: '#756F66' }}>Generasi</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#B5965A',
                }}
              >
                2
              </div>
              <div style={{ fontSize: '12px', color: '#756F66' }}>Cabang</div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 30,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(181,150,90,0.15)',
          padding: '12px 24px',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
              <Search
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#756F66',
                }}
                size={16}
              />
              <input
                type="text"
                placeholder="Cari anggota keluarga..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '38px',
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid #E8E0D0',
                  background: '#F8F5EF',
                  fontSize: '13px',
                  color: '#292722',
                  outline: 'none',
                }}
              />
            </div>

            {/* Generation filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {GENERATION_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setGenFilter(f.value)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '99px',
                    fontSize: '11px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    background: genFilter === f.value ? '#292722' : '#EFE9DE',
                    color: genFilter === f.value ? '#fff' : '#756F66',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Zoom controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#F8F5EF',
                  border: '1px solid #E8E0D0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#756F66',
                }}
                aria-label="Zoom out"
                type="button"
              >
                <ZoomOut size={14} />
              </button>
              <span
                style={{
                  fontSize: '11px',
                  color: '#756F66',
                  width: '36px',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#F8F5EF',
                  border: '1px solid #E8E0D0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#756F66',
                }}
                aria-label="Zoom in"
                type="button"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={centerTree}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#F8F5EF',
                  border: '1px solid #E8E0D0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#756F66',
                }}
                aria-label="Center tree"
                title="Center Tree"
                type="button"
              >
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search results indicator */}
      {searchResults && (
        <div
          style={{
            padding: '12px 24px',
            background: searchResults.length > 0 ? 'rgba(181,150,90,0.06)' : 'rgba(220,38,38,0.04)',
            borderBottom: '1px solid rgba(181,150,90,0.08)',
          }}
        >
          <div className="container" style={{ fontSize: '13px', color: '#756F66' }}>
            {searchResults.length > 0 ? (
              <span>
                Ditemukan <strong>{searchResults.length}</strong> anggota keluarga
              </span>
            ) : (
              <span>Tidak ada anggota keluarga yang cocok.</span>
            )}
          </div>
        </div>
      )}

      {/* Tree - Proper containment */}
      <section
        className="tree-section"
      >
        <div
          className="tree-scroll-container"
          ref={treeScrollRef}
        >
          <div
            className="tree-content"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {filterByGeneration.length > 0 ? (
              <div className="tree-container">
                {filterByGeneration.map((rootNode) => (
                  <FamilyTreeNode
                    key={rootNode.id}
                    node={rootNode}
                    onSelectMember={handleSelectMember}
                    selectedId={selectedId}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 0',
                  color: '#756F66',
                }}
              >
                <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <p>Tidak ada anggota pada generasi ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Profile Panel */}
      {panelMember && (
        <ProfilePanel
          member={panelMember}
          onClose={closePanel}
          onNavigate={handleNavigateToMember}
        />
      )}
    </div>
  );
}

function ProfilePanel({
  member,
  onClose,
  onNavigate,
}: {
  member: FamilyMember;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const spouse = getSpouse(member, familyMembers);
  const parents = getParents(member, familyMembers);
  const children = getChildren(member, familyMembers);
  const siblings = getSiblings(member, familyMembers);

  return (
    <>
      <div
        className="profile-panel-overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="profile-panel-container">
        <div className="profile-panel">
          {/* Header */}
          <div className="profile-panel-header">
            <div className="profile-panel-photo">
              <img src={member.photo} alt={member.name} />
            </div>
            <button
              className="profile-panel-close"
              onClick={onClose}
              aria-label="Close profile"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="profile-panel-body">
            <span className="profile-panel-eyebrow">{member.relationship}</span>
            <h2 className="profile-panel-name">{member.name}</h2>
            {member.nickname && (
              <p className="profile-panel-nickname">"{member.nickname}"</p>
            )}

            <div className="profile-panel-meta">
              {member.birthDate && (
                <div className="profile-panel-meta-item">
                  <Calendar size={14} />
                  <span>
                    {new Date(member.birthDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {member.city && (
                <div className="profile-panel-meta-item">
                  <MapPin size={14} />
                  <span>{member.city}</span>
                </div>
              )}
              <div className="profile-panel-meta-item">
                <Users size={14} />
                <span>Generasi {member.generation}</span>
              </div>
            </div>

            {member.bio && (
              <div className="profile-panel-bio">
                <p>{member.bio}</p>
              </div>
            )}

            {/* Connections */}
            <div className="profile-panel-connections">
              {parents.length > 0 && (
                <div className="profile-connection-group">
                  <span className="profile-connection-label">Orang Tua</span>
                  <div className="profile-connection-list">
                    {parents.map((p) => (
                      <button
                        key={p.id}
                        className="profile-connection-card"
                        onClick={() => onNavigate(p.id)}
                        type="button"
                      >
                        <img src={p.photo} alt={p.name} />
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {spouse && (
                <div className="profile-connection-group">
                  <span className="profile-connection-label">
                    <Heart size={12} fill="#B5965A" color="#B5965A" /> Pasangan
                  </span>
                  <div className="profile-connection-list">
                    <button
                      className="profile-connection-card"
                      onClick={() => onNavigate(spouse.id)}
                      type="button"
                    >
                      <img src={spouse.photo} alt={spouse.name} />
                      <span>{spouse.name}</span>
                    </button>
                  </div>
                </div>
              )}

              {children.length > 0 && (
                <div className="profile-connection-group">
                  <span className="profile-connection-label">Anak</span>
                  <div className="profile-connection-list">
                    {children.map((c) => (
                      <button
                        key={c.id}
                        className="profile-connection-card"
                        onClick={() => onNavigate(c.id)}
                        type="button"
                      >
                        <img src={c.photo} alt={c.name} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {siblings.length > 0 && (
                <div className="profile-connection-group">
                  <span className="profile-connection-label">Saudara</span>
                  <div className="profile-connection-list">
                    {siblings.map((s) => (
                      <button
                        key={s.id}
                        className="profile-connection-card"
                        onClick={() => onNavigate(s.id)}
                        type="button"
                      >
                        <img src={s.photo} alt={s.name} />
                        <span>{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '24px' }}>
              <a
                href={`#/keluarga/${member.id}`}
                className="btn btn-primary"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  width: '100%',
                  textDecoration: 'none',
                }}
              >
                View Full Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Helper to filter tree by generation
function filterTreeByGen(nodes: TreeNode[], gen: number): TreeNode[] {
  return nodes
    .map((node) => {
      if (node.member.generation === gen) return node;
      const filtered = filterTreeByGen(node.children, gen);
      if (filtered.length > 0) {
        return { ...node, children: filtered };
      }
      return null;
    })
    .filter(Boolean) as TreeNode[];
}
