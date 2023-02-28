/* eslint-disable react/jsx-curly-brace-presence */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

export default function DeviceCard() {
  return (
    <Card>
      <CardHeader title="/dev/nvme0n1" subheader="controller ID" />
      <CardContent>
        <Typography variant="body2">
          Status
          <br />
          Project id
          <br />
          Task id
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Idle</Button>
      </CardActions>
    </Card>
  );
}
