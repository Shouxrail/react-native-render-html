"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IMGElementContentAlt;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    altBox: {
        borderWidth: react_native_1.StyleSheet.hairlineWidth,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    altText: { textAlign: 'center', fontStyle: 'italic' }
});
/**
 * Alt view for the {@link IMGElement} component.
 */
function IMGElementContentAlt({ dimensions, alt, altColor, testID, children }) {
    return (react_1.default.createElement(react_native_1.View, { style: [styles.altBox, dimensions, { borderColor: altColor }], accessibilityRole: "image", accessibilityLabel: alt, testID: testID },
        react_1.default.createElement(react_native_1.Text, { style: [styles.altText, { color: altColor }] }, alt),
        children));
}
