"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const IMGElement_1 = __importDefault(require("../elements/IMGElement"));
const react_native_1 = require("@testing-library/react-native");
const utils_1 = require("./utils");
const react_native_2 = require("react-native");
describe('RenderHTML component should honor formatting context of the DOM tree', () => {
    it('should wrap text elements into a box formed by a View component', () => {
        const { getByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<span>hello world</span>' } }));
        const text = getByText('hello world');
        expect((0, utils_1.elementHasAncestorOfType)(text, react_native_2.View)).toBe(true);
    });
    it('should wrap sibling text elements into a box formed by a Text component', () => {
        const { getByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<span>hello world</span><span>foo bar</span>' } }));
        const span1 = getByText('hello world');
        expect((0, utils_1.elementHasAncestorOfType)(span1, react_native_2.Text)).toBe(true);
    });
    /*
     * We're asserting the following structure:
     *
     *
     *        View -- Text(hello world)
     *       /
     * Root /-View -- HTMLImageElement
     *      \
     *       \
     *        View -- Text(foo bar)
     */
    it('should cut embedded images inside inline formatting contexts into boxes', () => {
        const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: {
                html: '<span><b>hello world</b><img src="https://img.com/1"/>foo bar</span>'
            } }));
        const img = UNSAFE_getByType(IMGElement_1.default);
        expect((0, utils_1.elementHasAncestorOfType)(img, 'Text')).toBe(false);
    });
});
