"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_1 = require("@testing-library/react-native");
const utils_1 = require("./utils");
function expectFirstTextToHaveSelectable(html, matchingString) {
    const { getByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, defaultTextProps: { selectable: true }, source: { html } }));
    const text = getByText(matchingString);
    const ancestorText = (0, utils_1.getLastAncestorOfType)(text);
    expect(ancestorText).toBe(null);
    expect(text).toHaveProp('selectable', true);
}
/**
 * https://github.com/meliorence/react-native-render-html/issues/193
 */
describe('RenderHTML component', () => {
    describe('should pass regression #193 regarding defaultTextProps.selectable prop', () => {
        it('should pass example #1', () => {
            expectFirstTextToHaveSelectable('<div>selectable</div>', 'selectable');
        });
        it('should pass example #2', () => {
            expectFirstTextToHaveSelectable('<div>selectable<img src=""/></div>', 'selectable');
        });
        it('should pass example #3', () => {
            expectFirstTextToHaveSelectable('<div><div>selectable</div><img src=""/></div>', 'selectable');
        });
    });
});
