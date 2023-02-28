import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from 'renderer/components/dev/StyledPaper';
import DeviceCard from 'renderer/components/DeviceCard';

const GridStyle = (heightValue: number) => {
  return {
    height: `${heightValue}vh`,
    borderStyle: 'dashed',
    borderWidth: '1px',
    borderColor: '#d9d9d9',
  };
};

function Overview() {
  return (
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={2} direction="column">
        {/* Device Information */}
        <Grid sx={GridStyle(40)}>
          <Grid container>
            <Grid xs={2}>
              <DeviceCard />
            </Grid>
            <Grid xs={2}>
              <DeviceCard />
            </Grid>
            <Grid xs={2}>
              <DeviceCard />
            </Grid>
            <Grid xs={2}>
              <DeviceCard />
            </Grid>
            <Grid xs={4}>
              <Paper>Device Information</Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* System Information */}
        <Grid sx={GridStyle(60)}>
          <Paper>System Information</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Overview;
