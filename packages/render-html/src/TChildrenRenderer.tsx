import { FunctionComponent } from 'react';
import { TChildrenRendererProps } from './shared-types';
import renderChildren from './renderChildren';

/**
 * A component to render collections of tnodes.
 * Especially useful when used with {@link useTNodeChildrenProps}.
 */
const TChildrenRenderer: FunctionComponent<TChildrenRendererProps> = (props) =>
  renderChildren({
    propsForChildren: {},
    ...props
  });

export default TChildrenRenderer;
