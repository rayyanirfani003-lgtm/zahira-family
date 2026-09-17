import {
  Users,
  Image,
  BookOpen,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  ArrowUpRight,
  MapPin,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { stats, familyEvents } from '../../data';

export default function AdminDashboard() {
  const statCards = [
    {
      label: 'Total Anggota',
      value: stats.totalMembers,
      icon: Users,
      tone: 'gold',
      description: 'anggota keluarga',
    },
    {
      label: 'Total Generasi',
      value: stats.totalGenerations,
      icon: Star,
      tone: 'sage',
      description: 'generasi keluarga',
    },
    {
      label: 'Total Foto',
      value: stats.totalPhotos,
      icon: Image,
      tone: 'rose',
      description: 'foto tersimpan',
    },
    {
      label: 'Total Album',
      value: stats.totalAlbums,
      icon: TrendingUp,
      tone: 'cream',
      description: 'album kenangan',
    },
    {
      label: 'Total Cerita',
      value: stats.totalStories,
      icon: BookOpen,
      tone: 'lavender',
      description: 'cerita keluarga',
    },
    {
      label: 'Acara Mendatang',
      value: stats.totalEvents,
      icon: Calendar,
      tone: 'blue',
      description: 'acara terjadwal',
    },
  ];

  const activities = [
    {
      action: 'Foto baru diupload ke album "Lebaran 2024"',
      time: '2 jam lalu',
    },
    {
      action: 'Aisyah menambahkan cerita baru',
      time: '5 jam lalu',
    },
    {
      action: 'Event "Gathering Keluarga" dibuat',
      time: '1 hari lalu',
    },
  ];

  return (
    <div className="wp-admin-dashboard">
      {/* Welcome */}
      <section className="wp-admin-welcome">
        <div>
          <span className="wp-admin-section-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>FAMILY OVERVIEW</span>
          <h2>Selamat datang kembali 👋</h2>
          <p>
            Kelola kenangan, anggota, cerita, dan momen keluarga
            dari satu tempat.
          </p>
        </div>
        <div>
          <Heart size={30} fill="currentColor" />
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="wp-admin-section-title">
          <div>
            <span>OVERVIEW</span>
            <h3>Ringkasan Keluarga</h3>
          </div>
        </div>

        <div className="wp-admin-stat-grid">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="wp-admin-stat-card" key={stat.label}>
                <div className={`wp-admin-stat-icon ${stat.tone}`}>
                  <Icon size={20} />
                </div>

                <div className="wp-admin-stat-value">{stat.value}</div>

                <div className="wp-admin-stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lower content */}
      <section className="wp-admin-lower-grid">
        {/* Events */}
        <div className="wp-admin-panel">
          <div className="wp-admin-panel-header">
            <div>
              <span>UPCOMING</span>
              <h3>Event Berikutnya</h3>
            </div>

            <Link to="/admin/events" className="wp-admin-panel-link">
              Lihat semua
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div>
            {familyEvents.slice(0, 3).map((event) => {
              const date = new Date(event.date);

              return (
                <div key={event.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f1' }}>
                  <div style={{ textAlign: 'center', minWidth: '40px' }}>
                    <span style={{ fontSize: '10px', color: '#646970', textTransform: 'uppercase' }}>
                      {date.toLocaleDateString('id-ID', { month: 'short' }).replace('.', '')}
                    </span>
                    <strong style={{ fontSize: '16px', display: 'block' }}>{date.getDate()}</strong>
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '13px' }}>{event.name}</strong>
                    <span style={{ fontSize: '12px', color: '#646970', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} />
                      {event.location}
                    </span>
                  </div>

                  <ArrowUpRight size={16} color="#646970" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity */}
        <div className="wp-admin-panel">
          <div className="wp-admin-panel-header">
            <div>
              <span>RECENT</span>
              <h3>Aktivitas Terbaru</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#00a32a' }}>
              <Clock size={15} />
              Live
            </div>
          </div>

          <div className="wp-admin-activity-list">
            {activities.map((activity, index) => (
              <div className="wp-admin-activity-item" key={index}>
                <div className="wp-admin-activity-line">
                  <span />
                </div>

                <div>
                  <strong>{activity.action}</strong>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
