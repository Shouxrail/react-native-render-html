"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GenericPressable;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const SharedPropsProvider_1 = require("./context/SharedPropsProvider");
function GenericPressable(_a) {
    var { style, children, borderless = false } = _a, otherProps = __rest(_a, ["style", "children", "borderless"]);
    const { pressableHightlightColor, GenericPressable: UserProvidedPressable } = (0, SharedPropsProvider_1.useSharedProps)();
    if (UserProvidedPressable) {
        return (react_1.default.createElement(UserProvidedPressable, Object.assign({ style: style, borderless: borderless }, otherProps), children));
    }
    if (react_native_1.Platform.OS === 'android') {
        // TouchableNativeFeedback does not support a
        // style prop. So we must wrap it inside a View.
        return (react_1.default.createElement(react_native_1.View, { style: style },
            react_1.default.createElement(react_native_1.TouchableNativeFeedback, Object.assign({ useForeground: true, background: react_native_1.TouchableNativeFeedback.Ripple(pressableHightlightColor, borderless) }, otherProps),
                react_1.default.createElement(react_native_1.View, { testID: "generic-pressable" }, children))));
    }
    return (react_1.default.createElement(react_native_1.TouchableHighlight, Object.assign({ underlayColor: pressableHightlightColor, style: style }, otherProps),
        react_1.default.createElement(react_native_1.View, { testID: "generic-pressable" }, children)));
}
