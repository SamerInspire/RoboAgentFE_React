import { Button } from '@mui/material';
import Loader from '../loader/Loader';

function LoadingButton({
  isLoading,
  loaderStyle = { width: '30px', height: '30px' },
  clickHandler,
  title,
  type = 'submit',
}) {
  return (
    <Button fullWidth variant="contained" type={type} onClick={() => clickHandler()} disabled={isLoading}>
      {isLoading ? <Loader styles={loaderStyle} /> : title}
    </Button>
  );
}

export default LoadingButton;
