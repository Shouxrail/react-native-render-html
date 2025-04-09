import TRenderEngine from '@native-html/transient-render-engine';
import { PropsWithChildren, ReactElement } from 'react';
import { TRenderEngineConfig } from './shared-types';
export declare const tRenderEngineProviderPropTypes: Record<keyof TRenderEngineConfig, any>;
export declare const defaultFallbackFonts: {
    'sans-serif': string;
    monospace: string;
    serif: string;
};
export declare const defaultTRenderEngineProviderProps: TRenderEngineConfig;
/**
 * Use the ambient transient render engine.
 */
export declare function useAmbientTRenderEngine(): TRenderEngine;
/**
 * Share a TRenderEngine instance via React context.
 */
export default function TRenderEngineProvider({ children, htmlParserOptions, emSize, ignoredDomTags, ignoredStyles, baseStyle, tagsStyles, classesStyles, enableUserAgentStyles, enableCSSInlineProcessing, customHTMLElementModels, fallbackFonts, systemFonts, idsStyles, ignoreDomNode, domVisitors, allowedStyles, setMarkersForTNode, dangerouslyDisableHoisting, dangerouslyDisableWhitespaceCollapsing, selectDomRoot }: PropsWithChildren<Partial<TRenderEngineConfig>>): ReactElement;
