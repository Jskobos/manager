import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'src/components/Button';
import Hidden from 'src/components/core/Hidden';
import { makeStyles, Theme } from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import HelpIcon from 'src/components/HelpIcon';
import TextField from 'src/components/TextField';
import Grid from 'src/components/Grid';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  receiveTransfer: {},
  reviewDetails: {
    marginLeft: theme.spacing(2)
  },
  label: {
    marginRight: theme.spacing(2),
    fontSize: '1rem'
  },
  transferInput: {
    width: 360,
    [theme.breakpoints.down('sm')]: {
      width: 150
    }
  },
  helpIcon: {
    color: theme.color.grey1
  }
}));

interface Props {
  token: string;
  onTokenInput: (token: string) => void;
  openConfirmTransferDialog: () => void;
}

export type CombinedProps = Props;

export const TransferControls: React.FC<Props> = props => {
  const { openConfirmTransferDialog, onTokenInput, token } = props;
  const classes = useStyles();
  const { push } = useHistory();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTokenInput(e.target.value);
  };

  const handleCreateTransfer = () => push('/account/entity-transfers/create');
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography className={classes.label}>
          <strong>Receive a Transfer</strong>
        </Typography>
      </Grid>
      <Grid item className={classes.receiveTransfer}>
        <Grid container>
          <TextField
            className={classes.transferInput}
            hideLabel
            value={token}
            label="Receive a Transfer"
            placeholder="Enter a token"
            onChange={handleInputChange}
          />
          <Button
            className={classes.reviewDetails}
            buttonType="primary"
            disabled={token === ''}
            onClick={openConfirmTransferDialog}
          >
            Review Details
          </Button>
          <Hidden mdDown>
            <HelpIcon
              className={classes.helpIcon}
              text="Enter a transfer token to review the details and accept the transfer."
            />
          </Hidden>
        </Grid>
      </Grid>
      <Button buttonType="primary" onClick={handleCreateTransfer}>
        Make a Transfer
      </Button>
    </Grid>
  );
};

export default React.memo(TransferControls);
