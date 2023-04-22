import { ActionEnum } from '../enum/Action';

interface ILog {
  time: Date;
  messgae: string;
  level: ActionEnum;
}

export default ILog;
