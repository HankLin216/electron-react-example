import { atom } from 'recoil';
import IOverviewState from '../types/Overview';

const OverviewState = atom<IOverviewState>({
  key: 'overviewState',
  default: {
    activateCardControllerID: null,
  },
});

export default OverviewState;
