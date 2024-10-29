import React from 'react';
import { FormControl, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';

interface Props {
  currentFilter: 'All' | 'Pending' | 'Completed';
  changeFilter: (event: SelectChangeEvent<'All' | 'Pending' | 'Completed'>) => void;
  isDarkMode: boolean;
}

const StatusFilter: React.FC<Props> = ({ currentFilter, changeFilter, isDarkMode }) => {
  const titleStyle = isDarkMode ? { color: 'white', marginLeft: '32px' } : { color: 'black', marginLeft: '32px' };
  const selectStyle = isDarkMode ? { color: 'white' } : { color: 'black' };

  return (
    <>
      <Typography style={titleStyle} variant="h6">Status Filter</Typography>
      <FormControl style={{ marginLeft: '32px', width: '10%' }}>
        <Select
          data-testid="status-filter"
          style={selectStyle}
          value={currentFilter}
          onChange={changeFilter}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default StatusFilter;
