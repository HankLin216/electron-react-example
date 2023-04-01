/* eslint-disable react/jsx-curly-brace-presence */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { ActionEnum } from 'renderer/enum/Action';
import { IDeviceCardInfo } from 'renderer/types/Device';
import { useSetRecoilState } from 'recoil';
import OverviewState from 'renderer/states/OverViewState';
import IOverviewState from 'renderer/types/Overview';
import { getActionColor } from '../utils/ColorHandler';

export default function DeviceCard(props: { deviceCardInfo: IDeviceCardInfo }) {
  const setOverviewState = useSetRecoilState<IOverviewState>(OverviewState);
  const { deviceCardInfo } = props;
  const actionColor = getActionColor(ActionEnum.Info);

  function getBgColorList(mainColor: string, lighColor: string): string[] {
    const bgColorList = new Array(9).fill(mainColor);
    bgColorList[4] = lighColor;
    return bgColorList;
  }

  return (
    <Paper
      elevation={5}
      onClick={() =>
        setOverviewState({
          activateCardControllerID: deviceCardInfo.controllerID,
        })
      }
      square
      sx={{
        background: `linear-gradient(45deg,${getBgColorList(
          actionColor[800],
          actionColor[400]
        ).join(',')})`,
        color: 'white',
        cursor: 'pointer',
        backgroundSize: '800% 800%',
        animation: 'something 2s linear infinite;',
        '@keyframes something': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '100%': {
            backgroundPosition: '100% 50%',
          },
        },
      }}
    >
      <Box
        sx={{
          padding: '3px',
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 750, color: `${grey[900]}` }}
        >
          {deviceCardInfo.name}
        </Typography>
        <Typography
          variant="subtitle2"
          align="center"
          sx={{ color: `${grey[900]}` }}
        >
          {deviceCardInfo.controllerID}
        </Typography>
        <Typography
          variant="subtitle2"
          align="center"
          sx={{ color: `${actionColor[100]}` }}
        >
          {deviceCardInfo.status}
        </Typography>
      </Box>
      <Box sx={{ padding: 0.5 }}>
        <Grid container spacing={0.25}>
          <Grid xs={6}>
            <Typography variant="body2">{deviceCardInfo.tester}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="body2">{deviceCardInfo.capacity}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="body2">{deviceCardInfo.feature}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
