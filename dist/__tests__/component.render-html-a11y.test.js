"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const transient_render_engine_1 = require("@native-html/transient-render-engine");
const react_native_1 = require("@testing-library/react-native");
const react_native_accessibility_engine_1 = __importDefault(require("react-native-accessibility-engine"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
describe('RenderHTML a11y', () => {
    describe('regarding anchors', () => {
        describe('should add accessibility features to anchors when href is non-empty', () => {
            const snippets = [
                // Block
                `<a href="https://domain.com">test</a>`,
                // Inline
                `<span><a href="https://domain.com">test</a> other text</span>`
            ];
            for (const snippet of snippets) {
                it(`should pas snippet "${snippet}"`, () => {
                    const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                            html: snippet
                        }, debug: false, contentWidth: 0 }));
                    const { getByTestId } = (0, react_native_1.render)(element);
                    const anchor = getByTestId('a');
                    expect(anchor).toHaveProp('accessibilityRole', 'link');
                    expect(anchor).toHaveProp('accessible', true);
                    expect(() => react_native_accessibility_engine_1.default.check(element)).not.toThrow();
                });
            }
        });
        it('should not add accessibility features to anchors when href is empty', () => {
            const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: `<a href="">test</a>`
                }, debug: false, contentWidth: 0 }));
            const { getByTestId } = (0, react_native_1.render)(element);
            const anchor = getByTestId('a');
            expect(anchor).not.toHaveProp('accessibilityRole');
            expect(anchor).not.toHaveProp('accessible');
            expect(() => react_native_accessibility_engine_1.default.check(element)).not.toThrow();
        });
    });
    describe('regarding headings', () => {
        it("should add accessibility role 'header' to headings", () => {
            for (const header of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
                const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                        html: `<${header}>test</${header}>`
                    }, debug: false, contentWidth: 0 }));
                const { getByTestId } = (0, react_native_1.render)(element);
                expect(getByTestId(header)).toHaveProp('accessibilityRole', 'header');
                expect(() => react_native_accessibility_engine_1.default.check(element)).not.toThrow();
            }
        });
    });
    describe('regarding images', () => {
        it('should provide accessibility properties to <img> renderer when alt attribute is defined', () => __awaiter(void 0, void 0, void 0, function* () {
            const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<img alt="An image" src="https://img.com/1x1" />'
                }, debug: false, contentWidth: 200 }));
            const { getByA11yRole, findByTestId } = (0, react_native_1.render)(element);
            yield findByTestId('image-success');
            const image = getByA11yRole('image');
            expect(image).toHaveProp('accessibilityRole', 'image');
            expect(image).toHaveProp('accessibilityLabel', 'An image');
            // Waiting for AccessibilityEngine to support async udpates
            // see https://github.com/aryella-lacerda/react-native-accessibility-engine/issues/97
            // await waitFor(() =>
            //   expect(() => AccessibilityEngine.check(element)).not.toThrow()
            // );
        }));
        it('<img> should not be accessible when alt attribute is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<img src="https://img.com/1x1" />'
                }, debug: false, contentWidth: 200 }));
            const { getByTestId, findByTestId } = (0, react_native_1.render)(element);
            yield findByTestId('image-success');
            const image = getByTestId('img');
            expect(image).toHaveProp('accessibilityRole', 'none');
            expect(image).not.toHaveProp('accessibilityLabel');
            // Waiting for AccessibilityEngine to support async udpates
            // see https://github.com/aryella-lacerda/react-native-accessibility-engine/issues/97
            // await waitFor(() =>
            //   expect(() => AccessibilityEngine.check(element)).not.toThrow()
            // );
        }));
    });
    describe('regarding pressable custom renderers', () => {
        it('should add a button role if onPress is defined for custom renderers with a block content model', () => {
            const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<button aria-label="Click me!"></button>'
                }, customHTMLElementModels: Object.assign(Object.assign({}, transient_render_engine_1.defaultHTMLElementModels), { button: transient_render_engine_1.defaultHTMLElementModels.button.extend({
                        contentModel: transient_render_engine_1.HTMLContentModel.block
                    }) }), renderers: {
                    button: (_a) => {
                        var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                        return (react_1.default.createElement(TDefaultRenderer, Object.assign({ onPress: () => { } }, props)));
                    }
                }, debug: false, contentWidth: 200 }));
            const { getByA11yRole } = (0, react_native_1.render)(element);
            const button = getByA11yRole('button');
            expect(button).toHaveProp('accessibilityRole', 'button');
            expect(() => react_native_accessibility_engine_1.default.check(element)).not.toThrow();
        });
        it('should add a button role if onPress is defined for custom renderers with a textual content model', () => {
            const element = (react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span><customlink aria-label="Click me!"></customlink></span>'
                }, customHTMLElementModels: Object.assign(Object.assign({}, transient_render_engine_1.defaultHTMLElementModels), { customlink: transient_render_engine_1.defaultHTMLElementModels.span }), renderers: {
                    customlink: (_a) => {
                        var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                        return (react_1.default.createElement(TDefaultRenderer, Object.assign({ onPress: () => { } }, props)));
                    }
                }, debug: false, contentWidth: 200 }));
            const { getByA11yRole } = (0, react_native_1.render)(element);
            const button = getByA11yRole('link');
            expect(button).toHaveProp('accessibilityRole', 'link');
            expect(() => react_native_accessibility_engine_1.default.check(element)).not.toThrow();
        });
    });
});
