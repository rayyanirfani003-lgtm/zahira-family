import { Gift, Cake } from 'lucide-react';
import { familyMembers } from '../data';

function getNextBirthday(birthDate: string) {
  const now = new Date();
  const bday = new Date(birthDate);
  let next = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
  if (next < now) next.setFullYear(next.getFullYear() + 1);
  return next;
}

function getAge(birthDate: string) {
  const bday = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - bday.getFullYear();
  const m = now.getMonth() - bday.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < bday.getDate())) age--;
  return age;
}

function getCountdownText(birthDate: string) {
  const now = new Date();
  const next = getNextBirthday(birthDate);
  const diff = next.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Hari ini! 🎉';
  if (days === 1) return 'Besok!';
  return `${days} hari lagi`;
}

export default function UlangTahun() {
  const membersWithBirthday = familyMembers.filter(m => m.birthDate);
  const sorted = [...membersWithBirthday].sort((a, b) => getNextBirthday(a.birthDate!).getTime() - getNextBirthday(b.birthDate!).getTime());
  const today = sorted.filter(m => getCountdownText(m.birthDate!) === 'Hari ini! 🎉');
  const upcoming = sorted.filter(m => getCountdownText(m.birthDate!) !== 'Hari ini! 🎉').slice(0, 6);

  return (
    <div className="ulang-tahun-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">BIRTHDAYS</span>
          <h1 className="page-title">Ulang Tahun</h1>
          <p className="page-description">Rayakan hari istimewa setiap anggota keluarga.</p>
        </div>
      </section>

      {today.length > 0 && (
        <section className="section-today">
          <div className="container">
            <div className="section-header">
              <div className="section-icon"><Cake size={20} color="#fff" /></div>
              <h2>Ulang Tahun Hari Ini! 🎉</h2>
            </div>
            <div className="birthday-grid-today">
              {today.map((member) => (
                <div key={member.id} className="birthday-card-today">
                  <img src={member.photo} alt={member.name} />
                  <div className="birthday-card-info">
                    <h3>{member.name}</h3>
                    <p className="birthday-age">Berulang tahun ke-{getAge(member.birthDate!)}</p>
                    <p className="birthday-city">{member.city}</p>
                  </div>
                  <div className="birthday-message">🎂 Selamat Ulang Tahun! 🎂</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-upcoming">
        <div className="container">
          <div className="section-header">
            <div className="section-icon"><Gift size={20} color="#475838" /></div>
            <h2>Ulang Tahun Mendatang</h2>
          </div>
          <div className="birthday-grid-upcoming">
            {upcoming.map((member) => (
              <div key={member.id} className="birthday-card-upcoming">
                <div className="birthday-card-header">
                  <img src={member.photo} alt={member.name} />
                  <div className="birthday-card-info">
                    <h3>{member.nickname || member.name}</h3>
                    <p>{member.relationship} • {member.city}</p>
                  </div>
                </div>
                <div className="birthday-card-footer">
                  <div>
                    <p className="birthday-date">{new Date(member.birthDate!).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                    <p className="birthday-age-next">Ke-{getAge(member.birthDate!) + 1}</p>
                  </div>
                  <span className="birthday-countdown">{getCountdownText(member.birthDate!)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-calendar">
        <div className="container">
          <h2 className="section-title-center">Kalender Ulang Tahun</h2>
          <div className="birthday-calendar-grid">
            {sorted.map((member) => (
              <div key={member.id} className="birthday-calendar-item">
                <img src={member.photo} alt={member.name} />
                <h4>{member.nickname || member.name}</h4>
                <p>{new Date(member.birthDate!).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
