import { useState } from 'react';
import { Heart, Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px', display: 'flex' }}>
      {/* Left Side - Image */}
      <div style={{ display: 'none', flex: 1, position: 'relative' }} className="login-image">
        <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=900&fit=crop" alt="Zahira Family" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(41,39,34,0.4), transparent)' }} />
        <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 500, color: '#F8F5EF', marginBottom: '12px' }}>"Keluarga adalah tempat di mana hidup dimulai dan cinta tidak pernah berakhir."</h2>
          <p style={{ color: 'rgba(248,245,239,0.8)' }}>— Zahira Family</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F5EF', padding: '40px 24px' }}>
        <div style={{ maxWidth: '420px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #B5965A, #9a7e45)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Heart size={28} fill="#fff" color="#fff" />
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', fontWeight: 600, color: '#292722' }}>Zahira Family</h1>
            <p style={{ color: '#756F66', fontSize: '14px', marginTop: '8px' }}>Rumah digital keluarga kami</p>
          </div>

          <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(41,39,34,0.06)' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 500, color: '#292722', textAlign: 'center', marginBottom: '28px' }}>
              {isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan Keluarga'}
            </h2>

            <form onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#756F66' }} size={16} />
                  <input type="text" placeholder="Nama lengkap" className="form-input" style={{ paddingLeft: '42px' }} />
                </div>
              )}
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#756F66' }} size={16} />
                <input type="email" placeholder="Email" className="form-input" style={{ paddingLeft: '42px' }} />
              </div>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#756F66' }} size={16} />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="form-input" style={{ paddingLeft: '42px', paddingRight: '42px' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#756F66', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {isLogin && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#756F66' }}>
                    <input type="checkbox" /> Ingat saya
                  </label>
                  <a href="#" style={{ color: '#B5965A' }}>Lupa password?</a>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '8px' }}>
                {isLogin ? 'Masuk' : 'Daftar'} <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#756F66' }}>
                {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
                <button onClick={() => setIsLogin(!isLogin)} style={{ color: '#B5965A', fontWeight: 500, marginLeft: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
                </button>
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #EFE9DE', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#756F66' }}>🔒 Data keluarga dijaga kerahasiaannya</p>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#756F66', marginTop: '32px' }}>
            <Link to="/" style={{ color: '#756F66' }}>← Kembali ke beranda</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
