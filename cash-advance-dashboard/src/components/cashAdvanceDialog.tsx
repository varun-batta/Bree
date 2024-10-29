import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (amount: number) => void
}

const CashAdvanceModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose, onSubmit } = props;
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = () => {
    onSubmit(amount);
    setAmount(0);
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Request Cash Advance</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default CashAdvanceModal;