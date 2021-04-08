import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Search from './search';

afterEach(cleanup);

describe('Search', () => {
  it.skip('should focus on input', () => {
    let focused = false;
    TestRenderer.create(
      <Search search={() => {}} />,
      {
        createNodeMock: element => {
          if (element.type === 'input') {
            return {
              focus: () => {
                focused = true;
              },
            };
          }
          return null;
        },
      }
    );
    expect(focused).toBe(true);
  });

  it('should be submitted', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<Search search={onSubmit} />);
    fireEvent.submit(getByTestId('form'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
