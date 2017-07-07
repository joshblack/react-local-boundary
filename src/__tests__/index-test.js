/* @noflow */

import React from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';

describe('LocalBoundary Component', () => {
  let LocalBoundary;

  beforeEach(() => {
    LocalBoundary = require('../').default;
  });

  it('should render a valid child component', () => {
    const tree = mount(
      <LocalBoundary renderError={jest.fn()}>
        <div />
      </LocalBoundary>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render the error handler for an invalid subtree', () => {
    const error = new Error('Error');
    const mockErrorComponent = jest.fn(error => <div />);
    const ErrorComponent = () => {
      throw error;
    };

    mount(
      <LocalBoundary renderError={mockErrorComponent}>
        <ErrorComponent />
      </LocalBoundary>,
    );

    expect(mockErrorComponent).toHaveBeenCalledWith(error);
  });

  it('should preserve any context defined in the current subtree', () => {
    class ContextProvider extends React.Component {
      static propTypes = {
        children: PropTypes.node,
      };
      static childContextTypes = {
        foo: PropTypes.string,
      };
      getChildContext = () => ({foo: 'bar'});
      render() {
        return this.props.children;
      }
    }

    const contextValues = [];
    const ContextChild = (_, context) => {
      contextValues.push(context);
      return <div />;
    };
    ContextChild.contextTypes = {
      foo: PropTypes.string,
    };

    mount(
      <ContextProvider>
        <LocalBoundary renderError={jest.fn()}>
          <ContextChild />
        </LocalBoundary>
      </ContextProvider>,
    );

    expect(contextValues).toEqual([{foo: 'bar'}]);
  });
});
