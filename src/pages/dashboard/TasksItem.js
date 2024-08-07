import { Checkbox, FormControlLabel, styled } from '@mui/material';
import { useState } from 'react';

const TasksItem = ({ id, status, label, mission, checkOptions }) => {
  const [checked, setChecked] = useState(status);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    checkOptions(id, e.target.checked);
  };

  // style
  const FormControlLabelStyle = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiCheckbox-root': {
      transition: 'all 0.5s ease',
      color: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.green.lighter,
      },
    },

    '& .Mui-checked	': {
      color: `${theme.palette.green.darker} !important`,
    },

    '& .MuiFormControlLabel-label': {
      color: checked && mission ? theme.palette.text.disabled : 'inherit',
      textDecoration: checked && mission ? 'line-through' : null,
    },
  }));

  return (
    <FormControlLabelStyle
      key={id}
      checked={checked}
      control={<Checkbox checked={checked} onChange={handleChange} id={id} name="selectedOptions" />}
      label={label}
    />
  );
};

export default TasksItem;
