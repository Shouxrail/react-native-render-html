"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_li_1 = require("@jsamr/react-native-li");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_2 = require("@testing-library/react-native");
const react_performance_testing_1 = require("react-performance-testing");
const buildTREFromConfig_1 = __importDefault(require("../../helpers/buildTREFromConfig"));
const RenderHTMLConfigProvider_1 = __importDefault(require("../../RenderHTMLConfigProvider"));
const TRenderEngineProvider_1 = __importDefault(require("../../TRenderEngineProvider"));
const ListElement_1 = __importStar(require("../ListElement"));
const TNodeRenderer_1 = require("../../TNodeRenderer");
const TNodeChildrenRenderer_1 = __importDefault(require("../../TNodeChildrenRenderer"));
function makeListElementProps(html, type, listStyleType, extraProps) {
    const tre = (0, buildTREFromConfig_1.default)({ enableCSSInlineProcessing: true });
    const tdocument = tre.buildTTree(html);
    const list = tdocument.children[0].children[0];
    expect(list.type).toBe('block');
    expect(list.tagName).toBe(type);
    return Object.assign(Object.assign({ TDefaultRenderer: TNodeRenderer_1.TDefaultBlockRenderer, TNodeChildrenRenderer: TNodeChildrenRenderer_1.default, listType: type, propsFromParent: { collapsedMarginTop: 0 }, sharedProps: {}, style: {}, tnode: list, type: 'block', getFallbackListStyleTypeFromNestLevel() {
            return listStyleType;
        }, textProps: {}, viewProps: {} }, extraProps), { renderIndex: 0, renderLength: 1 });
}
describe('getMarkerBoxStyle', () => {
    it('should return a width property with the max of paddingValue and markerWidth', () => {
        expect((0, ListElement_1.getMarkerBoxStyle)(10, 12).width).toBe(12);
    });
    it('should fallback the width property to markerWidth when paddingValue is not a number', () => {
        expect((0, ListElement_1.getMarkerBoxStyle)(10, '10%').width).toBe(10);
    });
    it('should fallback to paddingValue when markerWidth is not a number', () => {
        expect((0, ListElement_1.getMarkerBoxStyle)(false, 10).width).toBe(10);
    });
});
describe('ListElement', () => {
    const listStyleTypes = [
        'circle',
        'decimal',
        'decimal-leading-zero',
        'disc',
        'disclosure-closed',
        'disclosure-open',
        'lower-alpha',
        'lower-greek',
        'lower-latin',
        'lower-roman',
        'none',
        'square',
        'upper-alpha',
        'upper-latin',
        'upper-roman'
    ];
    for (const listStyleType of listStyleTypes) {
        for (const dir of ['ltr', 'rtl']) {
            it(`should render and support listStyleType ${listStyleType} in ${dir}`, () => __awaiter(void 0, void 0, void 0, function* () {
                const { renderCount } = (0, react_performance_testing_1.perf)(react_1.default);
                const props = makeListElementProps(`<ol dir="${dir}"><li>One</li></ol>`, 'ol', listStyleType, {
                    enableExperimentalRtl: true
                });
                (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
                    react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
                yield (0, react_performance_testing_1.wait)(() => {
                    // Expect only one instance
                    expect(typeof renderCount.current.ListElement.value).toBe('number');
                    // Expect only one render
                    expect(renderCount.current.ListElement.value).toBeLessThan(2);
                });
            }));
        }
    }
    it('should warn user when list-style-type is a quoted string', () => {
        console.warn = jest.fn();
        const props = makeListElementProps('<ol style="list-style-type: \'/\';"><li>One</li></ol>', 'ol', 'disc', {});
        (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("This library doesn't support strings"));
    });
    it('should warn user when list-style-type is an unregistered type', () => {
        console.warn = jest.fn();
        const props = makeListElementProps('<ol style="list-style-type: foo;"><li>One</li></ol>', 'ol', 'disc', {});
        (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('is not handled by react-native-render-html.'));
    });
    it('should handle getFallbackListStyleTypeFromNestLevel returning undefined', () => {
        const props = makeListElementProps('<ol><li>One</li></ol>', 'ol', undefined, {});
        (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
    });
    it('should support start index', () => __awaiter(void 0, void 0, void 0, function* () {
        const props = makeListElementProps('<ol start="10" ><li>One</li></ol>', 'ol', 'decimal', {});
        const { UNSAFE_getByType } = (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
        const markedList = yield (0, react_native_2.waitFor)(() => UNSAFE_getByType(react_native_li_1.MarkedListItem));
        expect(markedList.props.startIndex).toBe(10);
    }));
    it('should support experimental RTL mode', () => __awaiter(void 0, void 0, void 0, function* () {
        const props = makeListElementProps('<ol dir="rtl" ><li>One</li></ol>', 'ol', 'decimal', {
            enableExperimentalRtl: true
        });
        const { UNSAFE_getByType } = (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
        const markedList = yield (0, react_native_2.waitFor)(() => UNSAFE_getByType(react_native_li_1.MarkedListItem));
        expect(markedList.props.rtlLineReversed).toBe(true);
        expect(markedList.props.rtlMarkerReversed).toBe(true);
    }));
    it('should support enableRemove*MarginIfNested props', () => __awaiter(void 0, void 0, void 0, function* () {
        const props = makeListElementProps('<ol><li><ul></ul></li></ol>', 'ol', 'decimal', {
            enableRemoveTopMarginIfNested: true,
            enableRemoveBottomMarginIfNested: true
        });
        const { findByTestId } = (0, react_native_2.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
            react_1.default.createElement(RenderHTMLConfigProvider_1.default, null, react_1.default.createElement(ListElement_1.default, props))));
        const ul = yield findByTestId('ul');
        expect(react_native_1.StyleSheet.flatten(ul.props.style)).toMatchObject({
            marginTop: 0,
            marginBottom: 0
        });
    }));
});
