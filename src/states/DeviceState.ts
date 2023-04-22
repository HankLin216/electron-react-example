import { atom } from 'recoil';
import { IDevice } from '../types/Device';

const DeviceListState = atom<IDevice[]>({
  key: 'deviceList',
  default: [],
});

export default DeviceListState;
