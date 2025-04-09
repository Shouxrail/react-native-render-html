"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getNativePropsForTNode;
const react_1 = __importDefault(require("react"));
const empty = {};
/**
 * Extract React Native props for a given {@link TNode}, such as those which
 * would be passed to `Text`, `View` or `GenericPressable` by `TDefaultRenderer`.
 *
 * This helper function is peculiarly useful when one wants a custom renderer
 * which uses a different native component, for example `Animated.Text` instead
 * of default `Text`.
 *
 * @public
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 * import { Animated } from 'react-native';
 * import { CustomTextualRenderer, getNativePropsForTNode } from 'react-native-render-html';
 *
 * const AnimatedSpanRenderer: CustomTextualRenderer = (props) => {
 *   const nativeProps = getNativePropsForTNode(props);
 *   // This is equivalent to a TDefaultRenderer which `Text` is replaced
 *   // with Animated.Text
 *   return <Animated.Text {...nativeProps} />;
 * }
 * ```
 */
function getNativePropsForTNode(props) {
    var _a, _b;
    const { tnode, style, type, nativeProps: passedNativeProps, onPress, children: overridenChildren, propsForChildren, viewProps, textProps, TNodeChildrenRenderer } = props;
    const children = overridenChildren ||
        (tnode.type === 'text'
            ? tnode.data
            : react_1.default.createElement(TNodeChildrenRenderer, {
                tnode,
                propsForChildren
            }));
    const switchProp = type === 'block' ? viewProps : textProps;
    const propsFromModel = ((_a = tnode.getReactNativeProps()) === null || _a === void 0 ? void 0 : _a[type === 'block' ? 'view' : 'text']) || empty;
    const syntheticOnPress = (_b = onPress !== null && onPress !== void 0 ? onPress : passedNativeProps === null || passedNativeProps === void 0 ? void 0 : passedNativeProps.onPress) !== null && _b !== void 0 ? _b : propsFromModel.onPress;
    const nativeProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (typeof syntheticOnPress === 'function'
        ? { accessibilityRole: type === 'block' ? 'button' : 'link' }
        : null)), propsFromModel), passedNativeProps), switchProp), { children, onPress: syntheticOnPress, style: [style, passedNativeProps === null || passedNativeProps === void 0 ? void 0 : passedNativeProps.style, switchProp.style], testID: tnode.tagName || undefined });
    return nativeProps;
}
