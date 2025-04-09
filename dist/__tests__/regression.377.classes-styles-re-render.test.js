"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_1 = require("@testing-library/react-native");
/**
 * https://github.com/meliorence/react-native-render-html/issues/377
 */
describe('HTML component', () => {
    const colorYellow = {
        color: 'yellow'
    };
    const colorGreen = {
        color: 'green'
    };
    const tagsStylesInstance1 = {
        highlight: colorYellow
    };
    const tagsStylesInstance2 = {
        highlight: colorGreen
    };
    it('should pass regression #377 regarding classesStyles prop', () => {
        const { getByText, update } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<p class="highlight">hello world</p>' }, classesStyles: tagsStylesInstance1 }));
        update(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<p class="highlight">hello world</p>' }, classesStyles: tagsStylesInstance2 }));
        const text = getByText('hello world');
        expect(text).toHaveStyle(colorGreen);
    });
});
