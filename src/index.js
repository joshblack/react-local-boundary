/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {unstable_renderSubtreeIntoContainer} from 'react-dom';

/**
 * LocalBoundary exists to help out situations where a developer is trying to
 * handle arbitrary errors in a component subtree.
 *
 * In certain cases, like children-as-a-function patterns , methods like
 * `#unstable_handleError` won't be able to properly catch errors that exist
 * when trying to mount the components. When trying to recover from such errors,
 * especially when using #setState in a Promise chain, you will most likely get
 * a error telling you that React can't find the Host Node of the Component.
 *
 * As a result of this unstable state due to errors caused by React trying to
 * mount an unsafe subtree, we leverage LocalBoundary. In this case, the
 * component will attempt to render the subtree into a pre-defined container,
 * and will capture any errors that occur and render the corresponding error
 * handler/component.
 */
export default class LocalBoundary extends React.Component {
  _container: HTMLElement;

  static propTypes = {
    renderError: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  componentDidMount() {
    try {
      // Use `renderSubtreeIntoContainer` to support/preserve any context
      // being passed in
      unstable_renderSubtreeIntoContainer(
        this,
        this.props.children,
        this._container,
      );
    } catch (error) {
      unstable_renderSubtreeIntoContainer(
        this,
        this.props.renderError(error),
        this._container,
      );
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={node => (this._container = node)}
      />
    );
  }
}
