import { Button } from '@mui/material';
import Loader from '../loader/Loader';

function LoadingButton({
  id,
  isLoading,
  loaderStyle = { width: '30px', height: '30px' },
  clickHandler = () => {},
  title,
  type = 'submit',
}) {
  console.log(isLoading);
  return (
    <Button
      id={id}
      fullWidth
      variant={isLoading ? 'outlined' : 'contained'}
      type={type}
      onClick={() => clickHandler()}
      disabled={isLoading}
    >
      {isLoading ? <Loader styles={loaderStyle} /> : title}
    </Button>
  );
}

export default LoadingButton;
