/* eslint-disable import/prefer-default-export */
import {
  lightBlue,
  green,
  purple,
  amber,
  pink,
  grey,
} from '@mui/material/colors';
import { ActionEnum } from '../../enum/Action';

function getActionColor(action: ActionEnum): { [key: number]: string } {
  switch (action) {
    case ActionEnum.Warning:
      return amber;
    case ActionEnum.Fatal:
      return purple;
    case ActionEnum.Error:
      return pink;
    case ActionEnum.Success:
      return green;
    case ActionEnum.Info:
      return lightBlue;
    case ActionEnum.Unknown:
    default:
      return grey;
  }
}

export { getActionColor };
