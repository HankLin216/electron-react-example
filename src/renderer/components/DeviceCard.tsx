/* eslint-disable react/jsx-curly-brace-presence */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';

const CardHeaderStyle = {
  padding: '8px',
  '.MuiCardHeader-title': {
    fontSize: '1.1rem',
  },
  '.MuiCardHeader-subheader': {
    fontSize: '0.8rem',
  },
};

const CardContentStyle = {
  padding: '16px',
};

export default function DeviceCard() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: green[300],
              width: '30px',
              height: '30px',
              fontSize: '.75rem',
            }}
          >
            Idle
          </Avatar>
        }
        sx={CardHeaderStyle}
        title="/dev/nvme0n1"
        subheader="controller ID"
      />
      <CardContent sx={CardContentStyle}>
        <Typography variant="body1">Testing Tool</Typography>
        <Typography variant="body1">Tester type</Typography>
        <Typography variant="body1">Capacity</Typography>
        <Typography variant="body1">Feature</Typography>
        <Typography variant="body1">L1.2</Typography>
        <Typography variant="body1">Micorn Pattern</Typography>
        <Typography variant="body1">Project id</Typography>
        <Typography variant="body1">Task id</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Idle</Button>
        <Button size="small">Idle</Button>
        <Button size="small">Idle</Button>
      </CardActions>
    </Card>
  );
}
