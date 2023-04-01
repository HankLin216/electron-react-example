/* eslint-disable no-unused-vars */
import { ToolEnum } from 'renderer/enum/Tool';

interface IDeviceDetail {
  tool: ToolEnum;
  pattern: string;
  ticProjectID: number;
  ticTaskID: number;
  JiraIssueID: number;
  wsMainGroup: string;
  wsSubGroup: string;
  'L1.2': boolean;
  micornPattern: boolean;
  'SCP/PLN': boolean;
}

interface IDevice {
  name: string;
  controllerID: string;
  status: string;
  tester: string;
  capacity: string;
  feature: string;
  extensionInfo: IDeviceDetail;
}

interface IDeviceCardInfo {
  name: string;
  controllerID: string;
  status: string;
  tester: string;
  capacity: string;
  feature: string;
}

export { IDeviceDetail, IDevice, IDeviceCardInfo };
