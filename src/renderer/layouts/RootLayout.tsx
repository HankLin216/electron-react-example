import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

function RootLayout() {
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ width: '60px' }}>
        <NavigationBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
