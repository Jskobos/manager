import { cleanup, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { nodePoolFactory } from 'src/factories/kubernetesCluster';
import { renderWithTheme } from 'src/utilities/testHelpers';

import ResizeNodePoolDrawer, { Props } from './ResizeNodePoolDrawer';

afterEach(cleanup);

const pool = nodePoolFactory.build();

const props: Props = {
  open: true,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  nodePool: pool,
  isSubmitting: false
};

jest.mock('src/features/linodes/presentation', () => ({
  displayClassAndSize: jest.fn().mockReturnValue('type and size')
}));

describe('ResizeNodePoolDrawer', () => {
  it("should render the pool's type and size", () => {
    const { getByText } = renderWithTheme(<ResizeNodePoolDrawer {...props} />);
    getByText(/type and size/);
  });

  it('should call the submit handler when submit is clicked', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <ResizeNodePoolDrawer {...props} />
    );
    const increment = getByTestId('increment-button');
    fireEvent.click(increment);
    const button = getByText(/save/i);
    fireEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalledWith(pool.count + 1);
  });
});
