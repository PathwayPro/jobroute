import styled from "@emotion/styled";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";

interface SelectorProps {
  options: string[];
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

const Selector = ({ options, handleChange, label, value }: SelectorProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Select
      input={<CssTextField style={{ height: '48px' }} inputProps={{ height: '48px' }} />}
      open={open}
      onChange={handleChange}
      onClose={handleClose}
      onOpen={handleOpen}
      value={value}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>option</MenuItem>))
      }
    </Select>
  )
}

export default Selector;