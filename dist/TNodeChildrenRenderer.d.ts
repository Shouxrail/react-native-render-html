import { ReactElement } from 'react';
import { TChildrenRendererProps, TNodeChildrenRendererProps } from './shared-types';
/**
 * A hook especially useful when one need to tamper with children in a custom
 * renderer. Should be used with {@link TChildrenRenderer}.
 */
export declare function useTNodeChildrenProps({ tnode, propsForChildren, disableMarginCollapsing, renderChild }: TNodeChildrenRendererProps): TChildrenRendererProps;
/**
 * A component to render all children of a {@link TNode}.
 */
declare function TNodeChildrenRenderer({ tnode, propsForChildren, disableMarginCollapsing, renderChild }: TNodeChildrenRendererProps): ReactElement;
export default TNodeChildrenRenderer;
