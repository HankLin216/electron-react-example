import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Grid2Props } from '@mui/material/Unstable_Grid2';

const GridStyle = {
  borderStyle: 'dashed',
  borderWidth: '1px',
  borderColor: '#d9d9d9',
};

export default function BorderGrid(props: Grid2Props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Grid sx={GridStyle} {...props} />;
}
