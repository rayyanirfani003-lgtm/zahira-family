import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollAnimationProvider } from './ScrollAnimations';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F5EF' }}>
      <Navbar />
      <ScrollAnimationProvider />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
