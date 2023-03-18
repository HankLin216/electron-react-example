import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from 'renderer/components/dev/StyledPaper';
import DeviceCard from 'renderer/components/DeviceCard';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    <Box sx={{ padding: 0.5 }}>
      <Grid container spacing={1}>
        {/* Device Information */}
        <Grid sx={GridStyle(40)} xs={12}>
          {/* Device cards view */}
          <Box sx={{ padding: 0.5, height: '100%' }}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              sx={{ height: '100%' }}
            >
              <Grid xs={1}>
                <IconButton>
                  <ArrowBackIosIcon />
                </IconButton>
              </Grid>
              <Grid xs={5}>
                <DeviceCard />
              </Grid>
              <Grid xs={5}>
                <DeviceCard />
              </Grid>
              <Grid xs={1}>
                <IconButton>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* System Information */}
        <Grid sx={GridStyle(60)} xs={12}>
          <Paper>System Information</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Overview;
