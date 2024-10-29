import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Popover } from '@mui/material';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  filter: 'All' | 'Pending' | 'Completed';
}

const TransactionList: React.FC<Props> = ({ transactions, filter }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tooltipContent, setTooltipContent] = useState<string>('');

  const filteredTransactions = transactions
    .filter(transaction => (filter === 'All' ? true : transaction.status === filter))
    .slice(-5); // Get the last 5 transactions

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>, transaction: Transaction) => {
    setTooltipContent(getTransactionTooltip(transaction));
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const getTransactionTooltip = (transaction: Transaction): string => {
    if (transaction.status === 'Pending') {
      return `Transaction ID: ${transaction.id}`;
    } else {
      return transaction.type === 'Repayment'
        ? `Transaction ID: ${transaction.id}, Repayment Date: ${transaction.repaymentDate}`
        : `Transaction ID: ${transaction.id}, Scheduled Repayment Date: ${transaction.repaymentDate}`;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Paper elevation={3} style={{ padding: '10px', margin: '32px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Repayment Amount</TableCell>
              <TableCell>Cash Advance Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map(transaction => (
              <TableRow 
                key={transaction.id}
                onMouseEnter={(event) => handleMouseEnter(event, transaction)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer', color: transaction.type === 'Cash Advance' ? 'green' : 'red' }}
              >
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  {transaction.type === 'Repayment' ? `$${transaction.amount}` : '-'}
                </TableCell>
                <TableCell>
                  {transaction.type === 'Cash Advance' ? `$${transaction.amount}` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ pointerEvents: 'none' }} // Prevents interactions that may cause flickering
      >
        <div style={{ padding: '10px' }}>{tooltipContent}</div>
      </Popover>
    </Paper>
  );
};

export default TransactionList;
