import React from 'react';
import { TDefaultRendererProps } from './shared-types';
import { TBlock } from '@native-html/transient-render-engine';
declare function renderBlockContent(props: TDefaultRendererProps<TBlock>): React.ReactElement<import("react-native").ViewProps, string | React.JSXElementConstructor<any>>;
export default renderBlockContent;
