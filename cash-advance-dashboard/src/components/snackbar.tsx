import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Props {
  isOpen: boolean
  onClose: () => void
  message: string
  severity: 'success' | 'error' | undefined
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StatusSnackbar: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose, message, severity } = props;

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
};

export default StatusSnackbar;