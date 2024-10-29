import { List, ListItem, ListItemText, Paper, Tooltip } from "@mui/material";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[],
  filter: 'All' | 'Pending' | 'Completed'
}

const TransactionList: React.FC<Props> = (props: Props) => {
  const { transactions, filter } = props;

  const filteredTransactions = transactions
    .filter((transaction) => (filter === 'All' ? true : transaction.status === filter))
    .slice(-5); // Get the last 5 transactions

  const getTransactionTooltip = (transaction: Transaction): string => {
    if (transaction.status === 'Pending') {
      return `Transaction ID: ${transaction.id}`
    } else {
      return transaction.type === 'Repayment' 
      ? `Transaction ID: ${transaction.id}, Repayment Date: ${transaction.repaymentDate}`
      : `Transaction ID: ${transaction.id}, Scheduled Repayment Date: ${transaction.repaymentDate}`
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', margin: '32px' }}>
      <List>
        {filteredTransactions.map((transaction) => (
          <Tooltip
            key={transaction.id}
            title={getTransactionTooltip(transaction)}
          >
            <ListItem style={{ color: transaction.type === 'Cash Advance' ? 'green' : 'red' }}>
              <ListItemText
                primary={`${transaction.date} - ${transaction.type} $${transaction.amount}`}
                secondary={`Status: ${transaction.status}`}
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Paper>
  )
}

export default TransactionList;