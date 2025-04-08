import React, { memo, ReactElement } from 'react';
import { TDefaultRenderer, TNodeRendererProps } from './shared-types';
import { useSharedProps } from './context/SharedPropsProvider';
import {
  TText,
  TBlock,
  TNode,
  TPhrasing
} from '@native-html/transient-render-engine';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import renderTextualContent from './renderTextualContent';
import { useRendererRegistry } from './context/RenderRegistryProvider';
import renderBlockContent from './renderBlockContent';
import renderEmptyContent from './renderEmptyContent';

export type { TNodeRendererProps } from './shared-types';

const TDefaultBlockRenderer: TDefaultRenderer<TBlock> =
  renderBlockContent.bind(null);

TDefaultBlockRenderer.displayName = 'TDefaultBlockRenderer';

const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> =
  renderTextualContent.bind(null);

TDefaultPhrasingRenderer.displayName = 'TDefaultPhrasingRenderer';

const TDefaultTextRenderer: TDefaultRenderer<TText> =
  renderTextualContent.bind(null);

TDefaultTextRenderer.displayName = 'TDefaultTextRenderer';

function isGhostTNode(tnode: TNode) {
  return (
    (tnode.type === 'text' && (tnode.data === '' || tnode.data === ' ')) ||
    tnode.type === 'empty'
  );
}

/**
 * A component to render any {@link TNode}.
 */
const TNodeRenderer = memo(function MemoizedTNodeRenderer({
  propsFromParent = { collapsedMarginTop: null },
  ...props
}: TNodeRendererProps<any>): ReactElement | null {
  const { tnode } = props;
  const sharedProps = useSharedProps();
  const renderRegistry = useRendererRegistry();
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const tnodeProps = {
    ...props,
    propsFromParent,
    TNodeChildrenRenderer,
    sharedProps
  };

  const renderer =
    tnode.type === 'block' || tnode.type === 'document'
      ? TDefaultBlockRenderer
      : tnode.type === 'text'
      ? TDefaultTextRenderer
      : tnode.type === 'phrasing'
      ? TDefaultPhrasingRenderer
      : renderEmptyContent;

  const { assembledProps, Renderer } = useAssembledCommonProps(
    tnodeProps,
    renderer as any
  );

  switch (tnode.type) {
    case 'empty':
      return renderEmptyContent(assembledProps);
    case 'text': {
      const InternalTextRenderer = renderRegistry.getInternalTextRenderer(
        props.tnode.tagName
      );

      if (InternalTextRenderer) {
        return React.createElement(InternalTextRenderer, tnodeProps);
      }

      if (
        tnodeProps.tnode.data === '' &&
        tnodeProps.sharedProps.enableExperimentalGhostLinesPrevention
      ) {
        return null;
      }
      break;
    }
    case 'phrasing': {
      if (
        tnodeProps.sharedProps.bypassAnonymousTPhrasingNodes &&
        tnodeProps.tnode.tagName == null &&
        tnodeProps.tnode.children.length <= 1
      ) {
        return React.createElement(TNodeChildrenRenderer, {
          tnode: props.tnode
        });
      }

      if (
        tnodeProps.sharedProps.enableExperimentalGhostLinesPrevention &&
        tnodeProps.tnode.tagName == null &&
        tnodeProps.tnode.children.every(isGhostTNode)
      ) {
        return null;
      }
      break;
    }
  }

  const renderFn =
    tnode.type === 'block' || tnode.type === 'document'
      ? renderBlockContent
      : renderTextualContent;

  return Renderer === null
    ? renderFn(assembledProps)
    : React.createElement(Renderer as any, assembledProps);
});

export {
  TDefaultBlockRenderer,
  TDefaultPhrasingRenderer,
  TDefaultTextRenderer
};

export default TNodeRenderer;
