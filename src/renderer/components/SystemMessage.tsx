import Grid from '@mui/material/Unstable_Grid2';
import Paper from 'renderer/components/dev/StyledPaper';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import { getActionColor } from 'renderer/utils/ColorHandler';
import React, { useEffect, useRef, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ILog from '../../types/Log';
import SystemLogListState from '../../states/SystemLogState';

// eslint-disable-next-line no-unused-vars
const SystemLogTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  fontSize: '0.8rem',
}));

function SystemMessage() {
  // #region state
  // systemlog
  const [systemLogList, setSystemLogList] =
    useRecoilState<ILog[]>(SystemLogListState);

  // page size for
  const pageSize = 100;
  const pageCount = Math.ceil(systemLogList.length / pageSize);
  const [page, setPage] = useState(pageCount);

  // auto scroll
  const [checked, setChecked] = React.useState(true);
  // #endregion

  // #region ref
  // page var ref for controll always see the last page
  const prePageCountRef = useRef(pageCount);
  if (prePageCountRef.current !== pageCount && checked) {
    prePageCountRef.current = pageCount;
    setPage(pageCount);
  }

  // message grid container ref for controller auto scroll to bottom
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // count
  const renderCounter = useRef(0);
  renderCounter.current += 1;
  // #endregion

  // #region effect
  // listening systemlog change
  useEffect(() => {
    const removeListener = window.electron.ipcRenderer.on(
      'system-message',
      (log) => {
        setSystemLogList((logs) => [...logs, log as ILog]);
      }
    );
    return removeListener;
  }, [setSystemLogList]);

  // for sroll to the bottom
  useEffect(() => {
    if (gridContainerRef.current && checked) {
      gridContainerRef.current.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [systemLogList, checked]);
  // #endregion

  // #region handle event
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  // #endregion

  return (
    <Paper
      square
      elevation={5}
      sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      <Grid container spacing={0} m={0} p={0} alignItems="center">
        <Grid xs={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleSwitchChange}
                  size="small"
                />
              }
              label="auto"
            />
          </FormGroup>
        </Grid>
        <Grid xs={10}>
          <Typography
            align="center"
            sx={{
              fontWeight: 900,
              color: `${grey[900]}`,
            }}
          >
            System Message, count:{renderCounter.current}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <div style={{ overflowY: 'auto', flex: '1 0 0px' }}>
        <Grid ref={gridContainerRef} container spacing={0}>
          {systemLogList
            .slice((page - 1) * pageSize, page * pageSize)
            .map((s, idx) => {
              // get current date string
              const currentDateTimeStr = moment(s.time).format(
                'YYYY-MM-DD hh:mm:ss'
              );
              return (
                <React.Fragment
                  // eslint-disable-next-line react/no-array-index-key
                  key={`systemLog_${idx}`}
                >
                  <Grid
                    xs={3}
                    sx={{ fontSize: '0.8rem', background: grey[700] }}
                  >
                    {currentDateTimeStr}
                  </Grid>
                  <Grid xs={9}>
                    <SystemLogTypography
                      sx={{ background: getActionColor(s.level)[700] }}
                    >
                      {s.messgae}
                    </SystemLogTypography>
                  </Grid>
                </React.Fragment>
              );
            })}
        </Grid>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={pageCount} page={page} onChange={handleSetPage} />
      </div>
    </Paper>
  );
}

export default SystemMessage;
