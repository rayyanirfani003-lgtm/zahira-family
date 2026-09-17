import { Heart, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gold-line" />

      {/* Quote Section */}
      <div style={{ background: 'linear-gradient(to bottom, #2c2925, #292722)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <Heart size={32} fill="#B5965A" color="#B5965A" style={{ margin: '0 auto 24px' }} />
          <blockquote style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '24px',
            fontStyle: 'italic',
            color: '#F8F5EF',
            lineHeight: 1.5,
            maxWidth: '700px',
            margin: '0 auto 16px'
          }}>
            "Di mana pun kita pergi, keluarga adalah tempat kita kembali."
          </blockquote>
          <p style={{ color: '#B5965A', fontWeight: 500 }}>— Nenek Aminah</p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>Zahira Family</h3>
              <p>Rumah digital keluarga yang menyimpan seluruh cerita, wajah, hubungan, dan kenangan untuk generasi sekarang dan berikutnya.</p>
              <p className="tagline">"Where every generation belongs."</p>
            </div>

            <div className="footer-col">
              <h4>Navigasi</h4>
              <ul>
                <li><Link to="/keluarga">Keluarga</Link></li>
                <li><Link to="/silsilah">Silsilah</Link></li>
                <li><Link to="/galeri">Galeri</Link></li>
                <li><Link to="/cerita">Cerita</Link></li>
                <li><Link to="/timeline">Timeline</Link></li>
                <li><Link to="/acara">Acara</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Lainnya</h4>
              <ul>
                <li><Link to="/ulang-tahun">Ulang Tahun</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/admin">Admin</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Kontak</h4>
              <ul>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#B5965A" /> hello@zahira.family
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="#B5965A" /> +62 812-3456-7890
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p>© 2025 Zahira Family. All rights reserved.</p>
          <p style={{ fontStyle: 'italic' }}>Made with <Heart size={12} fill="#B5965A" color="#B5965A" style={{ display: 'inline' }} /> for our beloved family</p>
        </div>
      </div>
    </footer>
  );
}
