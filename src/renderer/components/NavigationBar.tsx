import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';

const TabStyle = {
  maxWidth: 'inherit',
  minWidth: 'inherit',
  fontSize: '0.6rem',
};

const TabsStyle = {
  height: '100vh',
  '.MuiTabs-indicator': {
    left: 0,
  },
};

export default function NavigationBar() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      sx={TabsStyle}
      value={value}
      onChange={handleChange}
    >
      <Tab
        icon={<GridViewIcon />}
        sx={TabStyle}
        component={Link}
        to="/"
        label="Overview"
      />
      <Tab
        icon={<SettingsIcon />}
        sx={TabStyle}
        component={Link}
        to="Settings"
        label="Settings"
      />
    </Tabs>
  );
}
