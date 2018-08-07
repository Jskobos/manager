import { pathOr, take } from 'ramda';
import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import UserIcon from 'src/assets/icons/user.svg';
import DateTimeDisplay from 'src/components/DateTimeDisplay';
import Grid from 'src/components/Grid';

type ClassNames = 'root' |
  'userWrapper' |
  'leftIcon' |
  'paper' |
  'paperOpen' |
  'toggle';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    width: '100%',
    minHeight: 100,
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
  },
  userWrapper: {
    marginRight: theme.spacing.unit,
    borderRadius: '50%',
    width: '46px',
    height: '46px',
    transition: theme.transitions.create(['box-shadow']),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '40px',
      height: '40px',
    },
  },
  leftIcon: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    marginLeft: theme.spacing.unit * 2,
  },
  paper: {
    minHeight: 180,
    maxHeight: 180,
    padding: theme.spacing.unit * 3,
    overflow: 'hidden',
  },
  paperOpen: {
    minHeight: 180,
    maxHeight: 'fit-content',
    padding: theme.spacing.unit * 3,
  },
  toggle: {
    height: 25,
    width: 25,
    border: 'solid 1px black',
  }
});

interface Props {
  reply?: Linode.SupportReply;
  ticket?: Linode.SupportTicket;
  open?: boolean;
  gravatarUrl: string;
}

type CombinedProps = Props & WithStyles<ClassNames>;

interface State {
  open: boolean;
  data?: Data;
}

interface Data {
  gravatar_id: string;
  date: string;
  description: string;
  username: string;
  from_linode: boolean;
}

export class ExpandableTicketPanel extends React.Component<CombinedProps, State> {
  mounted: boolean = false;
  constructor(props:CombinedProps) {
    super(props);
    this.state = {
      open: pathOr(true, ['open'], this.props),
      data: this.getData(),
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  togglePanel = () => {
    this.setState({ open: !this.state.open });
  }

  getData = () => {
    const { ticket, reply } = this.props;
    if (!ticket && !reply) { return; }
    let data: Data;
    if (ticket) {
      data = {
        gravatar_id: ticket.gravatar_id,
        date: ticket.opened,
        description: ticket.description,
        username: "you",
        from_linode: false,
      }
    } else if (reply) {
      data = {
        gravatar_id: reply.gravatar_id,
        date: reply.created,
        description: reply.description,
        username: reply.created_by,
        from_linode: reply.from_linode,
      }
    }
    return data!;
  }

  getTruncatedText = (str: string, len: number) => {
    return str.length > len
      ? `${take(len, str)}...`
      : str
  }

  renderAvatar() {
    const { classes, gravatarUrl } = this.props;
    if (!gravatarUrl) { return null; }
    return (gravatarUrl !== 'not found'
      ? <div className={classes.userWrapper}>
          <img src={gravatarUrl} className={classes.leftIcon} />
        </div>
      : <div className={classes.userWrapper}>
          <UserIcon className={classes.leftIcon} />
        </div>
    );
  }
  
  render() {
    const { classes } = this.props;
    const { data, open } = this.state;
    if (!data) { return };

    const truncatedText = this.getTruncatedText(data.description, 175);
    const text = open ? data.description : truncatedText;

    return (
      <Grid item className={classes.root}>
        <Paper className={open ? classes.paperOpen : classes.paper}>
          <Grid container direction="row" wrap="nowrap" justify="flex-start" alignItems="flex-start" style={{ height: '100%' }}>
            <Grid item xs={1} >
              {this.renderAvatar()}
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" >{data.username}</Typography>
              {data.from_linode && <Typography variant="body1">Linode Expert</Typography>}
              <Typography variant="body1" ><DateTimeDisplay value={data.date} format={'YYYY/MM/DD - h:ssa'}/></Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1">{text}</Typography>
            </Grid>
            {truncatedText !== data.description &&
              <Grid item xs={1} onClick={this.togglePanel} >
                {open ? <Remove className={classes.toggle} /> : <Add className={classes.toggle} />}
              </Grid>
            }
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

const styled = withStyles(styles, { withTheme: true });

export default styled(ExpandableTicketPanel);