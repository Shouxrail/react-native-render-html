"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const utils_1 = require("./utils");
beforeAll(() => {
    jest.useFakeTimers();
});
/**
 * https://github.com/meliorence/react-native-render-html/issues/118
 */
describe('RenderHTML component', () => {
    it('should pass regression #118 regarding handling of CSS white-space', () => {
        const testRenderer = react_test_renderer_1.default.create(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '  <div>  foo\n\nbar  baz  </div>' } }));
        const renderedText = (0, utils_1.extractTextFromInstance)(testRenderer.root);
        expect(renderedText).toEqual('foo bar baz');
    });
});
