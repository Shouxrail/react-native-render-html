"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const utils_1 = require("./utils");
describe('RenderHTML component regarding <pre> tags behaviors', () => {
    it('preserves tabs and line breaks', () => {
        const testRenderer = react_test_renderer_1.default.create(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<pre>\t\n  a</pre>' } }));
        const renderedText = (0, utils_1.extractTextFromInstance)(testRenderer.root);
        expect(renderedText).toEqual('\t\n  a');
    });
    it('preserves indentation and line breaks', () => {
        const preContent = `
    function myJSFunction() {
      console.log("let's go");
      console.log("let's go");
      console.log("let's go");
    }
    `;
        const testRenderer = react_test_renderer_1.default.create(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: `<pre>${preContent}</pre>` } }));
        const renderedText = (0, utils_1.extractTextFromInstance)(testRenderer.root);
        expect(renderedText).toEqual(preContent);
    });
});
