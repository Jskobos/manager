import { APIError } from 'linode-js-sdk/lib/types';
import * as React from 'react';
import ActionsPanel from 'src/components/ActionsPanel';
import Button from 'src/components/Button';
import { makeStyles, Theme } from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import Drawer from 'src/components/Drawer';
import Notice from 'src/components/Notice';
import { displayClassAndSize } from 'src/features/linodes/presentation';
import { useTypes } from 'src/hooks/useTypes';
import { getAPIErrorOrDefault } from 'src/utilities/errorUtils';
import { nodeWarning } from '../kubeUtils';
import { PoolNodeWithPrice } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    paddingBottom: theme.spacing(3)
  },
  summary: {
    fontWeight: 'bold',
    lineHeight: '20px',
    fontSize: '16px'
  }
}));

interface Props {
  open: boolean;
  error?: APIError[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  nodePool: PoolNodeWithPrice;
}

const resizeWarning = `Resizing to fewer nodes will delete random nodes from
the pool. If you want to keep specific nodes, delete unneeded nodes manually from
the pool's node list.`;

export const AddDeviceDrawer: React.FC<Props> = props => {
  const { error, isSubmitting, nodePool, onClose, onSubmit, open } = props;
  const { types } = useTypes();
  const classes = useStyles();

  const [updatedCount, setUpdatedCount] = React.useState<number>(
    nodePool.count
  );

  const handleSubmit = () => {
    // @todo handling will have to be added here when we support Firewalls for NodeBalancers
    onSubmit();
    setUpdatedCount(0);
  };

  // @todo title and error messaging will update to "Device" once NodeBalancers are allowed
  const errorMessage = error
    ? getAPIErrorOrDefault(error, 'Error adding Linode')[0].reason
    : undefined;

  const planType = types.entities.find(
    thisType => thisType.id === nodePool.type
  );

  const pricePerNode = planType?.price.monthly ?? 0;

  return (
    <Drawer
      title={`Resize Pool: ${displayClassAndSize(
        planType?.class ?? '',
        planType?.memory ?? 0
      )}`}
      open={open}
      onClose={onClose}
    >
      <Typography className={`${classes.summary} ${classes.item}`}>
        Current pool: ${nodePool.totalMonthlyPrice}/month ({nodePool.count}{' '}
        nodes at ${pricePerNode}/month)
      </Typography>
      <form
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {errorMessage && <Notice error text={errorMessage} />}

        <Typography className={classes.item}>
          Enter the number of nodes you'd like in this pool:
        </Typography>

        <Typography className={`${classes.summary} ${classes.item}`}>
          Resized pool: ${updatedCount * pricePerNode}/month ({updatedCount}{' '}
          nodes at ${pricePerNode}/month)
        </Typography>

        {updatedCount < nodePool.count && (
          <Notice important warning text={resizeWarning} />
        )}

        {updatedCount < 3 && <Notice important warning text={nodeWarning} />}

        <ActionsPanel>
          <Button
            buttonType="primary"
            disabled={updatedCount === nodePool.count}
            onClick={handleSubmit}
            data-qa-submit
            loading={isSubmitting}
          >
            Save Changes
          </Button>
          {/* <Button onClick={onClose} buttonType="cancel" data-qa-cancel>
            Cancel
          </Button> */}
        </ActionsPanel>
      </form>
    </Drawer>
  );
};

export default AddDeviceDrawer;
