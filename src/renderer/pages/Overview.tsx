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
import SystemLogListState from 'renderer/states/SystemLogState';
import { ToolEnum } from 'renderer/enum/Tool';
import { IDevice, IDeviceCardInfo, IDeviceDetail } from 'renderer/types/Device';
import DeviceListState from 'renderer/states/DeviceState';
import ILog from 'renderer/types/Log';
import moment from 'moment';
import { getActionColor } from 'renderer/utils/ColorHandler';
import React from 'react';

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
  const { activateCardControllerID } = useRecoilValue<IOverviewState>(OverviewState);

  const fitCard = deviceList.filter((d) => d.controllerID === activateCardControllerID);

  const activateCardDetail: IDeviceDetail = fitCard.length === 0 ? deviceList[0].extensionInfo : fitCard[0].extensionInfo;

  const keyUseCol = 4;
  const valueUseCol = 12 - keyUseCol;

  return (
    <Paper square sx={{ display: 'flex', flexDirection: 'column', bgcolor: `${grey[200]}` }}>
      <Typography align="center" sx={{ fontWeight: 900, color: `${grey[900]}` }}>
        Device Detail
      </Typography>
      <Divider />
      <Box style={{ overflowY: 'auto', overflowX: 'hidden', textAlign: 'left', fontSize: '0.8rem', padding: 0.5, flex: '0 1 280px' }}>
        <Grid container spacing={1}>
          <Grid xs={keyUseCol}>
            <StyledTypography>Tool:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>{ToolEnum[activateCardDetail.tool]}</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>Pattern:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>
            <span style={{ wordBreak: 'break-all' }}>{activateCardDetail.pattern}</span>
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
          <Grid xs={valueUseCol}>{activateCardDetail['L1.2'].toString()}</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>Micorn Pattern:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>{activateCardDetail.micornPattern.toString()}</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>SCP/PLN:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>{activateCardDetail['SCP/PLN'].toString()}</Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

// eslint-disable-next-line no-unused-vars
const SystemLogTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  fontSize: '0.8rem',
}));

function SystemMessage() {
  const systemLogList = useRecoilValue<ILog[]>(SystemLogListState);

  return (
    <Paper square elevation={5} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography
        align="center"
        sx={{
          fontWeight: 900,
          color: `${grey[900]}`,
        }}
      >
        System Message
      </Typography>
      <Divider />
      <Box sx={{ overflowY: 'auto', flex: '1 0 0px' }}>
        <Grid container spacing={0}>
          {systemLogList.map((s, idx) => {
            // get current date string
            const currentDateTimeStr = moment(s.time).format('YYYY-MM-DD hh:mm:ss');

            return (
              <React.Fragment
                // eslint-disable-next-line react/no-array-index-key
                key={`systemLog_${idx}`}
              >
                <Grid xs={3} sx={{ fontSize: '0.8rem', background: grey[700] }}>
                  {currentDateTimeStr}
                </Grid>
                <Grid xs={9}>
                  <SystemLogTypography sx={{ background: getActionColor(s.level)[700] }}>{s.messgae}</SystemLogTypography>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Box>
    </Paper>
  );
}

function PlatformDetail() {
  const keyUseCol = 4;
  const valueUseCol = 12 - keyUseCol;
  return (
    <Paper square sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', bgcolor: `${grey[200]}` }}>
      <Typography align="center" sx={{ fontWeight: 900, color: `${grey[900]}` }}>
        Platform Information
      </Typography>
      <Divider />
      <Box sx={{ overflowY: 'auto', padding: 0.5, flex: '1 0 0px', fontSize: '0.8rem' }}>
        <Grid container spacing={1}>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
          <Grid xs={keyUseCol}>
            <StyledTypography>TIC Project ID:</StyledTypography>
          </Grid>
          <Grid xs={valueUseCol}>123</Grid>
        </Grid>
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
      <Box sx={{ padding: 0.5, display: 'flex', flexGrow: 1 }}>
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <Grid xs={8} sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
            <SystemMessage />
          </Grid>
          <Grid xs={4} sx={{ display: 'flex', flexGrow: 1 }}>
            <PlatformDetail />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Overview;
