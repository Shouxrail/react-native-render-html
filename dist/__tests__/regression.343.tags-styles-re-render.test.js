"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_2 = require("@testing-library/react-native");
/**
 * https://github.com/meliorence/react-native-render-html/issues/343
 */
describe('RenderHTML component', () => {
    const letterSpacing2 = {
        letterSpacing: 2
    };
    const letterSpacing3 = {
        letterSpacing: 3
    };
    const tagsStylesInstance1 = {
        a: letterSpacing2
    };
    const tagsStylesInstance2 = {
        a: letterSpacing3
    };
    it('should pass regression #343 regarding tagsStyles prop', () => {
        const { getByText, update } = (0, react_native_2.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<a>hello world</a>' }, tagsStyles: tagsStylesInstance1 }));
        update(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<a>hello world</a>' }, tagsStyles: tagsStylesInstance2 }));
        const text = getByText('hello world');
        expect(react_native_1.StyleSheet.flatten(text)).toHaveStyle(letterSpacing3);
    });
});
