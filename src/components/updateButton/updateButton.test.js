import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import UpdateButton from './updateButton';

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('UpdateButton', () => {
  it('should call callback when clicked', () => {
    const update = jest.fn();
    act(() => {
      ReactDOM.render(<UpdateButton update={update} />, container);
    });
    const button = container.getElementsByTagName('button')[0];
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(update).toBeCalled();
  });
});
