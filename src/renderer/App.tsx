import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RootLayout from './layouts/RootLayout';
import Overview from './pages/Overview';
import './App.css';

function Setting() {
  return <div>Setting</div>;
}

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: '/Settings', element: <Setting /> },
    ],
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          // left: 0,
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
