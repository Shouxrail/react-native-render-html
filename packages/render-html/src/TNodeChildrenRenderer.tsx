import { ReactElement } from 'react';
import { TNode } from '@native-html/transient-render-engine';
import { useSharedProps } from './context/SharedPropsProvider';
import {
  TChildrenRendererProps,
  TNodeChildrenRendererProps
} from './shared-types';
import renderChildren from './renderChildren';

function isCollapsible(tnode: TNode) {
  return tnode.type === 'block' || tnode.type === 'phrasing';
}

/**
 * A hook especially useful when one need to tamper with children in a custom
 * renderer. Should be used with {@link TChildrenRenderer}.
 */
export function useTNodeChildrenProps({
  tnode,
  propsForChildren,
  disableMarginCollapsing = false,
  renderChild
}: TNodeChildrenRendererProps): TChildrenRendererProps {
  const { enableExperimentalMarginCollapsing } = useSharedProps();
  const shouldCollapseChildren =
    enableExperimentalMarginCollapsing &&
    !disableMarginCollapsing &&
    isCollapsible(tnode);

  return {
    propsForChildren,
    disableMarginCollapsing: !shouldCollapseChildren,
    tchildren: tnode.children,
    renderChild
  };
}

/**
 * A component to render all children of a {@link TNode}.
 */
function TNodeChildrenRenderer({
  tnode,
  propsForChildren,
  disableMarginCollapsing = false,
  renderChild
}: TNodeChildrenRendererProps): ReactElement {
  if (tnode.type === 'text') {
    // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return tnode.data as unknown as ReactElement;
  }

  return renderChildren(
    useTNodeChildrenProps({
      tnode,
      propsForChildren,
      disableMarginCollapsing,
      renderChild
    })
  );
}

export default TNodeChildrenRenderer;
