import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'src/utilities/compose';

import TicketIcon from 'src/assets/icons/ticket.svg';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import IconTextLink from 'src/components/IconTextLink';

import { AttachmentError } from 'src/features/Support/SupportTicketDetail/SupportTicketDetail';
import SupportTicketDrawer from 'src/features/Support/SupportTickets/SupportTicketDrawer';

type ClassNames = 'root';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: `0 ${theme.spacing(1) + 4}px`,
      color: '#3683DC',
      /**
       * @bailly @kayla
       * I had to ask Kayla how to override the
       * button hover style here, but there must be
       * a better way.
       */
      '&:hover': {
        '& svg': {
          color: '#3683DC !important'
        }
      }
    }
  });

export type CombinedProps = WithStyles<ClassNames> & RouteComponentProps<{}>;

export const SupportWidget: React.FC<CombinedProps> = props => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { classes, history } = props;
  const onTicketCreated = (
    ticketId: number,
    attachmentErrors: AttachmentError[] = []
  ) => {
    history.push({
      pathname: `/support/tickets/${ticketId}`,
      state: { attachmentErrors }
    });
  };
  return (
    <>
      <IconTextLink
        className={classes.root}
        SideIcon={TicketIcon}
        text="Open Support Ticket"
        title="Open Support Ticket"
        onClick={() => setOpen(true)}
      />
      <SupportTicketDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onTicketCreated}
      />
    </>
  );
};

const styled = withStyles(styles);
const enhanced = compose<CombinedProps, {}>(styled, React.memo, withRouter);
export default enhanced(SupportWidget);
