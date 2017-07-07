# `react-local-boundary` [![Build Status](https://travis-ci.org/joshblack/react-local-boundary.svg?branch=master)](https://travis-ci.org/joshblack/react-local-boundary)

## Usage

```bash
npm install react-local-boundary --save
# or
yarn add react-local-boundary
```

```js
import React from 'react';
import LocalBoundary from 'react-local-boundary';

const Fallback = (error) => (
  <div className="Error">
    Error: {error.message}
  </div>
);

class MyComponent extends React.Component {
  render() {
    return (
      <LocalBoundary renderError={Fallback}>
        <ComponentThatThrows />
      </LocalBoundary>,
    );
  }
}
```

## Why?

`react-local-boundary` exists to help out situations where a developer is trying to
handle arbitrary errors in a component sub-tree.

In certain cases, like children-as-a-function patterns , methods like
`#unstable_handleError` won't be able to properly catch errors that exist
when trying to mount the components. When trying to recover from such errors,
especially when using `#setState` in a Promise chain, you will most likely get
a error telling you that React can't find the Host Node of the Component.

As a result of this unstable state due to errors caused by React trying to
mount an unsafe sub-tree, we leverage LocalBoundary. In this case, the
component will attempt to render the sub-tree into a pre-defined container,
and will capture any errors that occur and render the corresponding error
handler/component.
