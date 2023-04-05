import { atom } from 'recoil';
import ILog from 'renderer/types/Log';
import { ActionEnum } from 'renderer/enum/Action';
import moment from 'moment';

const SystemLogList: ILog[] = [
  {
    messgae: 'Initial server....',
    level: ActionEnum.Info,
    time: moment().minutes(-50).toDate(),
  },
  {
    messgae: 'Initial serverSuccess',
    level: ActionEnum.Success,
    time: moment().minutes(-40).toDate(),
  },
  {
    messgae: 'Some thing is error',
    level: ActionEnum.Error,
    time: moment().minutes(-30).toDate(),
  },
  {
    messgae: 'occured Error, stop the program',
    level: ActionEnum.Fatal,
    time: moment().minutes(-20).toDate(),
  },
  {
    messgae: 'Skip some thing',
    level: ActionEnum.Warning,
    time: moment().minutes(-10).toDate(),
  },
];

const SystemLogListState = atom<ILog[]>({
  key: 'systemlogList',
  default: [...SystemLogList],
});

export default SystemLogListState;
