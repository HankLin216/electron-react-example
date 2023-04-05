import { ActionEnum } from 'renderer/enum/Action';

interface ILog {
  time: Date;
  messgae: string;
  level: ActionEnum;
}

export default ILog;
