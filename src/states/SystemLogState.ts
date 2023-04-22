import { atom } from 'recoil';
import ILog from '../types/Log';

const SystemLogListState = atom<ILog[]>({
  key: 'systemlogList',
  default: [],
});

export default SystemLogListState;
