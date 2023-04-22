import { IDevice } from './Device';
/* eslint-disable no-unused-vars */
interface ISqliteHandler {
  createTable: () => Promise<void>;
  InsertDevice: (d: IDevice) => Promise<void>;
  GetAll: () => Promise<IDevice[]>;
  UpdateDevice: (d: IDevice) => Promise<any>;
  DeleteDevice: (id: string) => Promise<void>;
}

export default ISqliteHandler;
