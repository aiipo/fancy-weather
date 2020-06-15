import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import DegreeToggle from './degreeToggle';

describe('DegreeToggle', () => {
  let container;

  const updateForecastDegree = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('can render', () => {
    act(() => {
      ReactDOM.render(<DegreeToggle updateForecastDegree={updateForecastDegree} />, container);
    });
  });

  it('matches the snapshot', () => {
    const degreeToggle = TestRenderer.create(<DegreeToggle updateForecastDegree={updateForecastDegree} />);
    expect(degreeToggle.toJSON()).toMatchSnapshot();
  });
});
