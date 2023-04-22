import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { ActionEnum } from 'enum/Action';
import moment from 'moment';
import IOverviewState from 'types/Overview';
import { IDevice } from '../../types/Device';
import ILog from '../../types/Log';
import NavigationBar from '../components/NavigationBar';
import DeviceListState from '../../states/DeviceState';
import SystemLogListState from '../../states/SystemLogState';
import OverviewState from '../../states/OverviewState';

function RootLayout() {
  const setDeviceListState = useSetRecoilState<IDevice[]>(DeviceListState);
  const setSystemLogList = useSetRecoilState<ILog[]>(SystemLogListState);
  const setOverviewState = useSetRecoilState<IOverviewState>(OverviewState);

  // inital
  useEffect(() => {
    setSystemLogList((systemLogList) => [
      ...systemLogList,
      {
        time: moment().toDate(),
        messgae: '(client) call server to scan device',
        level: ActionEnum.Unknown,
      } as ILog,
    ]);
    window.electron.ipcRenderer.sendMessage('inital', []);

    window.electron.ipcRenderer.once('inital-dev', (arg) => {
      const devList = arg as IDevice[];
      setDeviceListState(devList);
      setOverviewState({
        activateCardControllerID:
          devList.length !== 0 ? devList[0].controllerID : null,
      } as IOverviewState);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div style={{ width: '60px' }}>
        <NavigationBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
