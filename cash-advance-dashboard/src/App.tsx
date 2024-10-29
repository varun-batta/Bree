import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Switch,
  SelectChangeEvent,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styles } from './styles';
import StatusFilter from './components/statusFilter';
import { Transaction } from './types';
import TransactionList from './components/transactionList';
import CashAdvanceModal from './components/cashAdvanceDialog';
import StatusSnackbar from './components/snackbar';

// Sample transactions data (20 transactions total)
const initialTransactions: Transaction[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  date: `2024-10-${i + 1}`,
  type: i % 2 === 0 ? 'Cash Advance' : 'Repayment',
  status: i % 3 === 0 ? 'Pending' : 'Completed',
  amount: (i + 1) * 10,
  repaymentDate: i % 2 === 1 ? `2024-10-${i + 3}`: undefined, // Example repayment date for repayments
}));

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(500);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | undefined>(undefined);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const maxAdvance = 300; // Maximum cash advance allowed

  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
  }
  
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  const handleRequestCashAdvance = (amount: number) => {
    if (amount && amount <= maxAdvance) {
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        type: 'Cash Advance',
        status: 'Pending',
        amount: Number(amount),
      };
      setTransactions([...transactions, newTransaction]);
      setSnackbarMessage(`You have requested $${amount}. It will be processed shortly.`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setModalOpen(false);
    } else {
      setSnackbarMessage(`Please enter a valid amount (up to $${maxAdvance}).`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<'All' | 'Pending' | 'Completed'>) => {
    setFilter(event.target.value as 'All' | 'Pending' | 'Completed');
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{'background': darkMode ? '#152238' : '#FFFFFF', height: '100vh'}}>
        {/* Theme switcher */}
        <Typography align="center" style={darkMode ? {...styles.darkModeText, position: 'absolute', right: '16px', top: '72px'}  : {...styles.lightModeText, position: 'absolute', right: '16px', top: '72px'}}>
          Dark Mode
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Typography>
        <Typography style={darkMode ? {...styles.darkModeText, padding: '32px'} : {...styles.lightModeText, padding: '32px'}} variant="h4" align="center" gutterBottom>
          Cash Advance Dashboard
        </Typography>
        <div style={{margin: '32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-around', alignContent: 'center', alignSelf: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography style={darkMode ? styles.darkModeText : styles.lightModeText} variant="h6" align="center" gutterBottom>
              Balance:
            </Typography>
            <Typography style={darkMode ? styles.darkModeText : styles.lightModeText} variant="h2" align="center" gutterBottom>
              ${balance}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="success" // Green color for cash advance button
            startIcon={<Add />}
            fullWidth
            onClick={() => setModalOpen(true)}
            style={{ marginLeft: isMobile ? '0px' : '100px', marginBottom: '20px', fontSize: 32}}
          >
            Request a Cash Advance
          </Button>
        </div>

        <StatusFilter
          currentFilter={filter}
          changeFilter={handleFilterChange}
          isDarkMode={darkMode}
        />

        <TransactionList
          transactions={transactions}
          filter={filter}
        />

        <CashAdvanceModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleRequestCashAdvance}
        />

        <StatusSnackbar
          isOpen={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
