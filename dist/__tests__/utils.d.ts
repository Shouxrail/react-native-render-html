import React from 'react';
import { render as renderTestingLib } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { RenderHTMLProps } from '../shared-types';
export declare function extractTextFromInstance(instance: ReactTestInstance): string;
export declare function expectTranslatedInlineCSSRuleTo({ cssInlineRules, test, render, extraProps }: {
    cssInlineRules: string;
    extraProps?: Partial<RenderHTMLProps>;
    render: typeof renderTestingLib;
    test: (v: any) => void;
}): void;
export declare function expectTranslatedInlineCSSToMatchObject({ cssInlineRules, reactNativeStyle, render }: {
    cssInlineRules: string;
    reactNativeStyle: any;
    render: typeof renderTestingLib;
}): void;
export declare function expectTranslatedInlineCSSValueToEqual({ cssInlineRules, reactNativePropStyleName, render, value, extraProps }: {
    cssInlineRules: string;
    extraProps?: Partial<RenderHTMLProps>;
    reactNativePropStyleName: string;
    render: typeof renderTestingLib;
    value: any;
}): void;
export declare function elementHasAncestorOfType(element: ReactTestInstance | null | undefined, Type: React.ElementType<any> | string): boolean;
export declare function getLastAncestorOfType(element: ReactTestInstance | null | undefined, Type?: React.ElementType<any>): ReactTestInstance | null;
