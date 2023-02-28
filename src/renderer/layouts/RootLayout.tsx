import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import NavigationBar from '../components/NavigationBar';

function RootLayout() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid xs={1}>
        <NavigationBar />
      </Grid>
      <Grid xs={11}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default RootLayout;
