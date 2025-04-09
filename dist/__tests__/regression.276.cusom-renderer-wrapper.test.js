"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_2 = require("@testing-library/react-native");
const transient_render_engine_1 = require("@native-html/transient-render-engine");
/**
 * https://github.com/meliorence/react-native-render-html/issues/276
 */
describe('RenderHTML component', () => {
    describe('should pass regression #276 regarding customRenderer prop', () => {
        it('when provided, should use View wrapper to render a tag which has been defined in customRenderers and which default wrapper is Text', () => {
            var _a;
            const Span = () => (react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.Text, null, "Tadad")));
            const SpanRenderer = () => (react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(Span, null)));
            const customRenderers = {
                span: SpanRenderer
            };
            const { UNSAFE_getByType } = (0, react_native_2.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<p>foo<span>hello world</span></p>' }, renderers: customRenderers, customHTMLElementModels: {
                    span: transient_render_engine_1.HTMLElementModel.fromCustomModel({
                        tagName: 'span',
                        contentModel: transient_render_engine_1.HTMLContentModel.block
                    })
                } }));
            const span = UNSAFE_getByType(Span);
            expect((_a = span.parent) === null || _a === void 0 ? void 0 : _a.type).toBe('View');
        });
    });
});
