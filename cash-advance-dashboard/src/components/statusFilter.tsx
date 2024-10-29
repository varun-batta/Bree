import React from 'react';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { styles } from '../styles';

interface Props {
    currentFilter: 'All' | 'Completed' | 'Pending'
    changeFilter: (event: SelectChangeEvent<'All' | 'Pending' | 'Completed'>) => void
    isDarkMode: boolean
}

const StatusFilter: React.FC<Props> = (props: Props) => {
    const { currentFilter, changeFilter, isDarkMode} = props;
    const titleStyle = isDarkMode ? {...styles.darkModeText, marginLeft: '32px'} : {...styles.lightModeText, marginLeft: '32px'};
    const selectStyle = isDarkMode ? styles.darkModeText : styles.lightModeText;

    return (
        <>
            <Typography style={titleStyle} variant="h6">Status Filter</Typography>
            <FormControl style={{ marginLeft: '32px', width: '10%' }}>
            <Select style={selectStyle} value={currentFilter} onChange={changeFilter}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            </FormControl>
        </>
    )
};

export default StatusFilter;