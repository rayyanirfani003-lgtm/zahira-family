import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import Keluarga from './pages/Keluarga';
import Silsilah from './pages/Silsilah';
import FamilyMemberProfile from './pages/FamilyMemberProfile';
import Galeri from './pages/Galeri';
import Cerita from './pages/Cerita';
import Timeline from './pages/Timeline';
import Acara from './pages/Acara';
import UlangTahun from './pages/UlangTahun';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AdminAlbums from './pages/admin/Albums';
import AdminStories from './pages/admin/Stories';
import AdminEvents from './pages/admin/Events';
import AdminSettings from './pages/admin/Settings';
import AdminMedia from './pages/admin/Media';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="keluarga" element={<Keluarga />} />
          <Route path="keluarga/:id" element={<FamilyMemberProfile />} />
          <Route path="silsilah" element={<Silsilah />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="cerita" element={<Cerita />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="acara" element={<Acara />} />
          <Route path="ulang-tahun" element={<UlangTahun />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="media" element={<AdminMedia />} />
  <Route path="albums" element={<AdminAlbums />} />
          <Route path="stories" element={<AdminStories />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
