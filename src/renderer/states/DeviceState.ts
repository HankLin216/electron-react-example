import { atom } from 'recoil';
import { IDevice } from 'renderer/types/Device';
import { ToolEnum } from '../enum/Tool';

const DeviceList: IDevice[] = [
  {
    name: 'nvme0n1',
    controllerID: 'controllerID1',
    status: 'idle',
    tester: 'One port',
    capacity: '512G',
    feature: 'HMB,pyrite',
    extensionInfo: {
      tool: ToolEnum.PPS,
      pattern: 'PP0001_0005_Testing_Some_Funtcion_And_DoSomething',
      ticProjectID: 123,
      ticTaskID: 456,
      JiraIssueID: 789,
      wsMainGroup: 'G01',
      wsSubGroup: '2023032500002',
      'L1.2': true,
      micornPattern: false,
      'SCP/PLN': false,
    },
  },
  {
    name: 'nvme1n1',
    controllerID: 'controllerID2',
    status: 'testing',
    tester: 'T board',
    capacity: '1024G',
    feature: 'HMB,Opal',
    extensionInfo: {
      tool: ToolEnum.PPS,
      pattern: 'PP0002_0005_Testing_Some_Funtcion_And_DoSomething',
      ticProjectID: 321,
      ticTaskID: 654,
      JiraIssueID: 987,
      wsMainGroup: 'G01',
      wsSubGroup: '2023032500001',
      'L1.2': true,
      micornPattern: false,
      'SCP/PLN': false,
    },
  },
  {
    name: 'nvme2n1',
    controllerID: 'controllerID3',
    status: 'testing',
    tester: 'T board',
    capacity: '2048G',
    feature: 'HMB,Opal',
    extensionInfo: {
      tool: ToolEnum.PPS,
      pattern: 'PP0003_0005_Testing_Some_Funtcion_And_DoSomething',
      ticProjectID: 321123,
      ticTaskID: 654456,
      JiraIssueID: 987222222,
      wsMainGroup: 'G03',
      wsSubGroup: '2023032500003',
      'L1.2': true,
      micornPattern: false,
      'SCP/PLN': false,
    },
  },
  {
    name: 'nvme3n1',
    controllerID: 'controllerID4',
    status: 'testing',
    tester: 'T board',
    capacity: '1024G',
    feature: 'HMB,Opal',
    extensionInfo: {
      tool: ToolEnum.PPS,
      pattern: 'PP0004_0005_Testing_Some_Funtcion_And_DoSomething',
      ticProjectID: 321321,
      ticTaskID: 654654,
      JiraIssueID: 98711111111,
      wsMainGroup: 'G04',
      wsSubGroup: '2023032500004',
      'L1.2': true,
      micornPattern: false,
      'SCP/PLN': false,
    },
  },
];

const DeviceListState = atom<IDevice[]>({
  key: 'deviceList',
  default: [...DeviceList],
});

export default DeviceListState;
