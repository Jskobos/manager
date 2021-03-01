import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from 'src/components/core/styles';

type ClassNames =
  | 'title'
  | 'tagGroup'
  | 'CSVlinkContainer'
  | 'CSVlink'
  | 'CSVwrapper'
  | 'addNewLink'
  | 'chipContainer'
  | 'chip'
  | 'chipActive'
  | 'chipRunning'
  | 'chipPending'
  | 'chipOffline'
  | 'clearFilters'
  | 'cmrSpacing'
  | 'cmrCSVlink';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      flex: 1,
    },
    tagGroup: {
      flexDirection: 'row-reverse',
    },
    CSVlink: {
      color: theme.cmrTextColors.tableHeader,
      fontSize: '.9rem',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    CSVlinkContainer: {
      marginTop: theme.spacing(0.5),
      '&.MuiGrid-item': {
        paddingRight: 0,
      },
    },
    CSVwrapper: {
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
    },
    addNewLink: {
      marginBottom: -3,
      marginLeft: 15,
    },
    chipContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    chip: {
      ...theme.applyStatusPillStyles,
      marginRight: theme.spacing(3),
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
      transition: 'none',
      '& .MuiChip-label': {
        marginBottom: 2,
      },
    },
    chipActive: {
      backgroundColor: theme.bg.chipActive,
    },
    chipRunning: {
      '&:before': {
        backgroundColor: theme.cmrIconColors.iGreen,
      },
    },
    chipPending: {
      '&:before': {
        backgroundColor: theme.cmrIconColors.iOrange,
      },
    },
    chipOffline: {
      '&:before': {
        backgroundColor: theme.cmrIconColors.iGrey,
      },
    },
    clearFilters: {
      margin: '1px 0 0 0',
      padding: 0,
      '&:hover': {
        '& svg': {
          color: `${theme.palette.primary.main} !important`,
        },
      },
    },
    cmrSpacing: {
      margin: 0,
      width: '100%',
      '& > .MuiGrid-item': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    cmrCSVlink: {
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(),
      },
    },
  });

export type StyleProps = WithStyles<ClassNames>;

export default withStyles(styles);
