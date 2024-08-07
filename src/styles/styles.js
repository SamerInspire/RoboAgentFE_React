import { Box, styled } from '@mui/material';
export const glassMorphisimStyle = {
  background: 'rgba( 255, 255, 255, 1 )',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.15 )',
  // backdropFilter: "blur( 20px )",
  borderRadius: '10px',
};
// style
const FormStyle = styled('form')(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: 'grid',
  gap: 16,

  // input style
  '& label.Mui-focused': {
    color: theme.palette.success.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.success.main,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.success.main,
    },
  },
  // error
  '& .Mui-error.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.error.light,
    },
  },
  '& label.Mui-error.Mui-focused': {
    color: theme.palette.error.light,
  },

  // checkbox style
  '& .MuiCheckbox-root': {
    color: theme.palette.success.light,
  },
  '& .Mui-checked': {
    color: theme.palette.success.main,
  },

  // forgot link style
  '& a': {
    color: theme.palette.success.main,
    fontWeight: 500,
    '&:hover': {
      color: theme.palette.success.light,
    },
  },

  // button style
  '& .MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: 'capitalize',
    padding: theme.spacing(2),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      boxShadow: 'none',
    },
  },
}));

// styles
const TopPaneStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  borderRadius: theme.spacing(2),
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',

  '& .MuiTypography-h3': {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 48,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  maxHeight: `calc(100vh - 65px)`,
  height: '100%',
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: `1fr`,
  },
}));

export default FormStyle;
export { TopPaneStyle, ContainerBoxStyle };
