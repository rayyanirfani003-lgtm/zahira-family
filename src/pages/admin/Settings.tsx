import { Save, Globe, Shield } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#292722' }}>Settings</h1>
        <p style={{ fontSize: '14px', color: '#756F66' }}>Kelola pengaturan website keluarga</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(41,39,34,0.04)' }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#292722', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={18} color="#475838" /> Umum
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#292722', marginBottom: '8px' }}>Nama Keluarga</label>
            <input type="text" defaultValue="Zahira Family" className="form-input" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#292722', marginBottom: '8px' }}>Tagline</label>
            <input type="text" defaultValue="One Family. Many Stories. One Beautiful Legacy." className="form-input" />
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(41,39,34,0.04)' }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#292722', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} color="#475838" /> Privasi
        </h3>
        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '12px', background: '#F8F5EF', cursor: 'pointer', marginBottom: '12px' }}>
          <div>
            <p style={{ fontWeight: 500, color: '#292722', fontSize: '14px' }}>Website Private</p>
            <p style={{ fontSize: '12px', color: '#756F66' }}>Hanya anggota yang bisa melihat konten</p>
          </div>
          <input type="checkbox" defaultChecked />
        </label>
      </div>

      <button className="btn btn-primary" style={{ gap: '8px', alignSelf: 'flex-start' }}>
        <Save size={16} /> Simpan Pengaturan
      </button>
    </div>
  );
}
