"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_1 = require("@testing-library/react-native");
/**
 * https://github.com/meliorence/react-native-render-html/issues/383
 **/
describe('RenderHTML component', () => {
    describe('should pass regression regarding RenderHTML props passed to anchor renderer', () => {
        it('translated anchor elements should not contain a renderers prop', () => {
            const { getByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<a>bar</a>' } }));
            const anchor = getByText('bar');
            expect(anchor).not.toHaveProp('renderers');
        });
    });
});
