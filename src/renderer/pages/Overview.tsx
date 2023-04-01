import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from 'renderer/components/dev/StyledPaper';
import DeviceCard from 'renderer/components/DeviceCard';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import OverviewState from 'renderer/states/OverViewState';
import IOverviewState from 'renderer/types/Overview';
import { ToolEnum } from 'renderer/enum/Tool';
import { IDevice, IDeviceCardInfo, IDeviceDetail } from 'renderer/types/Device';
import DeviceListState from 'renderer/states/DeviceState';

function DeviceCardsView() {
  const deviceList = useRecoilValue<IDevice[]>(DeviceListState);

  const deviceCardInfos: IDeviceCardInfo[] = deviceList.map((d) => {
    return {
      name: d.name,
      controllerID: d.controllerID,
      capacity: d.capacity,
      status: d.status,
      feature: d.feature,
      tester: d.tester,
    };
  });

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={2}>
        {deviceCardInfos.map((di) => {
          return (
            <Grid xs={6} key={`deviceCardGrid-${di.controllerID}`}>
              <DeviceCard deviceCardInfo={di} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  color: grey[900],
  fontWeight: 600,
  fontSize: '0.8rem',
}));

function DeviceCardDetail() {
  const deviceList = useRecoilValue<IDevice[]>(DeviceListState);
  const { activateCardControllerID } =
    useRecoilValue<IOverviewState>(OverviewState);

  const fitCard = deviceList.filter(
    (d) => d.controllerID === activateCardControllerID
  );

  const activateCardDetail: IDeviceDetail =
    fitCard.length === 0
      ? deviceList[0].extensionInfo
      : fitCard[0].extensionInfo;

  return (
    <Paper
      square
      sx={{
        bgcolor: `${grey[200]}`,
      }}
    >
      <Typography
        align="center"
        sx={{
          fontWeight: 900,
          color: `${grey[900]}`,
        }}
      >
        Device Detail
      </Typography>
      <Divider />
      <Box
        style={{
          overflowY: 'auto',
          textAlign: 'left',
          height: '275px',
          fontSize: '0.8rem',
        }}
      >
        {(() => {
          const keyUseCol = 4;
          const valueUseCol = 12 - keyUseCol;
          return (
            <Box sx={{ padding: 0.5 }}>
              <Grid container spacing={1}>
                <Grid xs={keyUseCol}>
                  <StyledTypography>Tool:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>
                  {ToolEnum[activateCardDetail.tool]}
                </Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>Pattern:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>
                  <span style={{ wordBreak: 'break-all' }}>
                    {activateCardDetail.pattern}
                  </span>
                </Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>TIC Project ID:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>{activateCardDetail.ticProjectID}</Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>TIC Task ID:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>{activateCardDetail.ticTaskID}</Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>JIRA Issue ID:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>{activateCardDetail.JiraIssueID}</Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>WS Main Group:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>{activateCardDetail.wsMainGroup}</Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>WS Sub Group:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>{activateCardDetail.wsSubGroup}</Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>L1.2:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>
                  {activateCardDetail['L1.2'].toString()}
                </Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>Micorn Pattern:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>
                  {activateCardDetail.micornPattern.toString()}
                </Grid>
                <Grid xs={keyUseCol}>
                  <StyledTypography>SCP/PLN:</StyledTypography>
                </Grid>
                <Grid xs={valueUseCol}>
                  {activateCardDetail['SCP/PLN'].toString()}
                </Grid>
              </Grid>
            </Box>
          );
        })()}
      </Box>
    </Paper>
  );
}

function Overview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ padding: 0.5, flexGrow: 0 }}>
        <Grid container spacing={1}>
          <Grid xs={8}>
            <DeviceCardsView />
          </Grid>
          <Grid xs={4}>
            <DeviceCardDetail />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: 0.5,
          flexGrow: 1,
          display: 'flex',
        }}
      >
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <Grid xs={8}>
            <Paper
              square
              sx={{
                bgcolor: `${grey[200]}`,
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontWeight: 900,
                  color: `${grey[900]}`,
                }}
              >
                System Information
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Paper
              square
              sx={{
                bgcolor: `${grey[200]}`,
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontWeight: 900,
                  color: `${grey[900]}`,
                }}
              >
                Platform Information
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Overview;
