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
const react_native_1 = require("@testing-library/react-native");
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const IMGElement_1 = __importDefault(require("../elements/IMGElement"));
const transient_render_engine_1 = require("@native-html/transient-render-engine");
const react_native_2 = require("react-native");
const RenderersPropsProvider_1 = require("../context/RenderersPropsProvider");
const TNodeChildrenRenderer_1 = __importDefault(require("../TNodeChildrenRenderer"));
const OLElement_1 = __importDefault(require("../elements/OLElement"));
const ULElement_1 = __importDefault(require("../elements/ULElement"));
describe('RenderHTML', () => {
    it('should render without error when providing a source', () => {
        expect(() => (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<p>Hello world</p>' }, debug: false }))).not.toThrow();
    });
    it('should render without error when missing a source', () => {
        //@ts-expect-error missing source
        expect(() => (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false }))).not.toThrow();
    });
    it('should print a snapshot in debug mode when __DEV__ is true', () => {
        console.info = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<p>Hello world</p>' }, debug: true }));
        expect(console.info).toHaveBeenNthCalledWith(1, expect.stringContaining('Transient Render Tree update'));
    });
    describe('regarding internal renderers', () => {
        it('should use internal renderer for <ol> elements', () => __awaiter(void 0, void 0, void 0, function* () {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<ol><li>One</li><li>Two</li><li>Three</li></ol>'
                }, debug: false, contentWidth: 0 }));
            yield (0, react_native_1.waitFor)(() => UNSAFE_getByType(OLElement_1.default));
        }));
        it('should use internal renderer for <ul> elements', () => __awaiter(void 0, void 0, void 0, function* () {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<ul><li>One</li><li>Two</li><li>Three</li></ul>'
                }, debug: false, contentWidth: 0 }));
            yield (0, react_native_1.waitFor)(() => UNSAFE_getByType(ULElement_1.default));
        }));
        it('should update <img> contentWidth when contentWidth prop changes', () => {
            const contentWidth = 300;
            const nextContentWidth = 200;
            const { UNSAFE_getByType, update } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<img src="https://img.com/1" />' }, debug: false, contentWidth: contentWidth }));
            expect(UNSAFE_getByType(IMGElement_1.default)).toHaveProp('contentWidth', contentWidth);
            update(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<img src="https://img.com/1" />' }, debug: false, contentWidth: nextContentWidth }));
            expect(UNSAFE_getByType(IMGElement_1.default)).toHaveProp('contentWidth', nextContentWidth);
        });
        it('should merge `viewStyle` to <img> renderer', () => {
            const { getByA11yRole } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<img alt="An image" src="https://img.com/1" />'
                }, debug: false, defaultViewProps: {
                    style: {
                        backgroundColor: 'red'
                    }
                }, contentWidth: 200 }));
            expect(getByA11yRole('image')).toHaveStyle({
                backgroundColor: 'red'
            });
        });
        it('should use internal text renderer for <wbr> tags', () => __awaiter(void 0, void 0, void 0, function* () {
            const { findByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<wbr>'
                }, debug: false, contentWidth: 0 }));
            yield findByText('\u200B');
        }));
        it('should render <br> tags to line breaks when followed by text', () => {
            const { queryByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<br><span>Two</span>'
                }, debug: false, contentWidth: 0 }));
            expect(queryByText('\n')).toBeDefined();
        });
        it('should render <br> tags to line breaks when the tag closes an inline formatting context', () => {
            const { queryByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: 'Two<br><div></div>'
                }, debug: false, contentWidth: 0 }));
            expect(queryByText('\n')).toBeDefined();
        });
        it('should invoke renderersProps.a.onPress on <a> press', () => __awaiter(void 0, void 0, void 0, function* () {
            const onPress = jest.fn();
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<a href="https://domain.com">Hello world!</a>'
                }, renderersProps: {
                    a: {
                        onPress
                    }
                }, debug: false, contentWidth: 0 }));
            const anchor = yield findByTestId('a');
            (0, react_native_1.act)(() => { var _a, _b; return (_b = (_a = anchor.props).onPress) === null || _b === void 0 ? void 0 : _b.call(_a, {}); });
            expect(onPress).toHaveBeenCalled();
        }));
    });
    describe('regarding customHTMLElementsModels prop', () => {
        it('should support changing block content model to mixed', () => {
            const contentWidth = 300;
            const onTTreeChange = jest.fn((ttree) => expect(ttree.snapshot()).toMatchSnapshot());
            (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<span><article></article>Text</span>' }, debug: false, customHTMLElementModels: {
                    article: transient_render_engine_1.defaultHTMLElementModels.article.extend({
                        contentModel: transient_render_engine_1.HTMLContentModel.mixed
                    })
                }, contentWidth: contentWidth, onTTreeChange: onTTreeChange }));
            expect(onTTreeChange).toHaveBeenCalledTimes(1);
        });
    });
    it('should support fonts from tagsStyles specified in systemFonts', () => {
        const tagsStyles = {
            span: {
                fontFamily: 'Superfont'
            }
        };
        const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<span>hi</span>' }, debug: false, tagsStyles: tagsStyles, systemFonts: ['Superfont'], contentWidth: 100 }));
        const span = getByTestId('span');
        expect(span).toHaveStyle(tagsStyles.span);
    });
    describe('regarding onTTreeChange prop', () => {
        const onTTreeChange = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<a href="test">Yuhuuu</a>' }, debug: false, onTTreeChange: onTTreeChange, contentWidth: 100 }));
        expect(onTTreeChange).toHaveBeenCalled();
    });
    describe('regarding onHTMLLoaded prop', () => {
        const onHTMLLoaded = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<a href="test">Yuhuuu</a>' }, debug: false, onHTMLLoaded: onHTMLLoaded, contentWidth: 100 }));
        expect(onHTMLLoaded).toHaveBeenCalled();
    });
    describe('regarding onDocumentMetadataLoaded prop', () => {
        const onDocumentMetadataLoaded = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<a href="test">Yuhuuu</a>' }, debug: false, onDocumentMetadataLoaded: onDocumentMetadataLoaded, contentWidth: 100 }));
        expect(onDocumentMetadataLoaded).toHaveBeenCalled();
    });
    describe('regarding markers', () => {
        it('should set `anchor` marker for `a` tags', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<a href="test">Yuhuuu</a>' }, debug: false, contentWidth: 100 }));
            const ttext = UNSAFE_getByType(react_native_2.Text).parent;
            expect(ttext.props.tnode.markers.anchor).toBe(true);
        });
        it('should set `edits` marker to "ins" for `ins` tags', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<ins>Yuhuuu</ins>' }, debug: false, contentWidth: 100 }));
            const ttext = UNSAFE_getByType(react_native_2.Text).parent;
            expect(ttext.props.tnode.markers.edits).toBe('ins');
        });
        it('should set `edits` marker to "del" for `del` tags', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<del>Yuhuuu</del>' }, debug: false, contentWidth: 100 }));
            const ttext = UNSAFE_getByType(react_native_2.Text).parent;
            expect(ttext.props.tnode.markers.edits).toBe('del');
        });
        it('should set `lang` marker for `lang` attributes', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<p lang="fr">Voila !</p>' }, debug: false, contentWidth: 100 }));
            const ttext = UNSAFE_getByType(react_native_2.Text).parent;
            expect(ttext.props.tnode.markers.lang).toBe('fr');
        });
        it('should set `dir` marker for `dir` attributes', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: { html: '<p dir="rtl">ٱلسَّلَامُ عَلَيْكُمْ‎</p>' }, debug: false, contentWidth: 100 }));
            const ttext = UNSAFE_getByType(react_native_2.Text).parent;
            expect(ttext.props.tnode.markers.direction).toBe('rtl');
        });
        it('should pass markers deep down in the tree', () => {
            const EmRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return react_1.default.createElement(TDefaultRenderer, Object.assign({}, props));
            };
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div lang="test"><span>One<em>Two</em></span></div>'
                }, renderers: { em: EmRenderer }, debug: false, contentWidth: 100 }));
            const em = UNSAFE_getByType(EmRenderer);
            expect(em.props.tnode.markers.lang).toBe('test');
        });
        it('should handle setMarkersForTNode prop', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<em>Two</em>'
                }, debug: false, setMarkersForTNode: (targetMarkers, __parent, tnode) => {
                    if (tnode.tagName === 'em') {
                        //@ts-expect-error undefined marker
                        targetMarkers.em = true;
                    }
                }, contentWidth: 100 }));
            const em = UNSAFE_getByType(react_native_2.Text).parent;
            expect(em.props.tnode.markers.em).toBe(true);
        });
    });
    describe('regarding propsFromParent prop in custom renderers', () => {
        it('should pass propsForChildren to children', () => {
            const SpanRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { propsForChildren: { test: 1 } })));
            };
            const EmRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return react_1.default.createElement(TDefaultRenderer, Object.assign({}, props));
            };
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>One<em>Two</em></span>'
                }, renderers: { span: SpanRenderer, em: EmRenderer }, debug: false, contentWidth: 100 }));
            const em = UNSAFE_getByType(EmRenderer);
            expect(em.props.propsFromParent.test).toBe(1);
        });
        it('should not pass propsForChildren to sub-children', () => {
            const SpanRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { propsForChildren: { test: 1 } })));
            };
            const EmRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return react_1.default.createElement(TDefaultRenderer, Object.assign({}, props));
            };
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>One<b><em>Two</em></b></span>'
                }, renderers: { span: SpanRenderer, em: EmRenderer }, debug: false, contentWidth: 100 }));
            const em = UNSAFE_getByType(EmRenderer);
            expect(em.props.propsFromParent.test).toBeUndefined();
        });
        it('should apply `viewProps` to TBlock renderers', () => {
            const DivRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { viewProps: { collapsable: false } }));
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div>test</div>'
                }, renderers: { div: DivRenderer }, debug: false, contentWidth: 100 }));
            const div = getByTestId('div');
            expect(div).toHaveProp('collapsable', false);
        });
        it('should apply `textProps` to TPhrasing renderers', () => {
            const SpanRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { textProps: { adjustsFontSizeToFit: true } })));
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>foo<b>bar</b></span>'
                }, renderers: { span: SpanRenderer }, debug: false, contentWidth: 100 }));
            const span = getByTestId('span');
            expect(span).toHaveProp('adjustsFontSizeToFit', true);
        });
        it('should apply `textProps` to TText renderers', () => {
            const SpanRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { textProps: { adjustsFontSizeToFit: true } })));
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>foo</span>'
                }, renderers: { span: SpanRenderer }, debug: false, contentWidth: 100 }));
            const span = getByTestId('span');
            expect(span).toHaveProp('adjustsFontSizeToFit', true);
        });
        it('should apply `props`', () => {
            const SpanRenderer = (_a) => {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { nativeProps: { accessibilityRole: 'adjustable' } })));
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>foo</span>'
                }, renderers: { span: SpanRenderer }, debug: false, contentWidth: 100 }));
            const span = getByTestId('span');
            expect(span).toHaveProp('accessibilityRole', 'adjustable');
        });
        it('should apply `tnode.getReactNativeProps()` to TPhrasing renderers', () => {
            const customHTMLElementModels = {
                span: transient_render_engine_1.defaultHTMLElementModels.span.extend({
                    reactNativeProps: {
                        native: {
                            accessibilityRole: 'adjustable'
                        }
                    }
                })
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>foo<b>bar</br></span>'
                }, customHTMLElementModels: customHTMLElementModels, debug: false, contentWidth: 100 }));
            const span = getByTestId('span');
            expect(span).toHaveProp('accessibilityRole', 'adjustable');
        });
        it('should apply `tnode.getReactNativeProps()` to TText renderers', () => {
            const customHTMLElementModels = {
                span: transient_render_engine_1.defaultHTMLElementModels.span.extend({
                    reactNativeProps: {
                        native: {
                            accessibilityRole: 'adjustable'
                        }
                    }
                })
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>foo</span>'
                }, customHTMLElementModels: customHTMLElementModels, debug: false, contentWidth: 100 }));
            const span = getByTestId('span');
            expect(span).toHaveProp('accessibilityRole', 'adjustable');
        });
        it('should apply `tnode.getReactNativeProps()` to TBlock renderers', () => {
            const customHTMLElementModels = {
                div: transient_render_engine_1.defaultHTMLElementModels.span.extend({
                    reactNativeProps: {
                        native: {
                            accessibilityRole: 'adjustable'
                        }
                    }
                })
            };
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div>test</div>'
                }, customHTMLElementModels: customHTMLElementModels, debug: false, contentWidth: 100 }));
            const div = getByTestId('div');
            expect(div).toHaveProp('accessibilityRole', 'adjustable');
        });
    });
    describe('regarding TNodeRenderer', () => {
        describe('TBlockRenderer', () => {
            it('should render a GenericPressable when provided onPress', () => __awaiter(void 0, void 0, void 0, function* () {
                const onPress = jest.fn();
                const DivRenderer = (_a) => {
                    var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                    return react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { onPress: onPress }));
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                        html: '<div></div>'
                    }, debug: false, contentWidth: 0, renderers: { div: DivRenderer } }));
                yield findByTestId('generic-pressable');
            }));
            it('should use viewProps.style', () => __awaiter(void 0, void 0, void 0, function* () {
                const DivRenderer = (_a) => {
                    var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                    return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { viewProps: { style: { marginBottom: 10 } } })));
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                        html: '<div style="paddingBottom: 10px;"></div>'
                    }, debug: false, contentWidth: 0, renderers: { div: DivRenderer } }));
                const div = yield findByTestId('div');
                expect(div).toHaveStyle({
                    marginBottom: 10,
                    paddingBottom: 10
                });
            }));
            it('should merge viewProps.style with greater specificity than given styles', () => __awaiter(void 0, void 0, void 0, function* () {
                const DivRenderer = (_a) => {
                    var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                    return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { viewProps: { style: { marginBottom: 10 } } })));
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                        html: '<div style="margin-bottom: 5px;"></div>'
                    }, debug: false, contentWidth: 0, renderers: { div: DivRenderer } }));
                const div = yield findByTestId('div');
                expect(div).toHaveStyle({
                    marginBottom: 10
                });
            }));
            describe('TDefaultTextualRenderer', () => {
                it('should merge textProps.style with greater specificity than given styles', () => __awaiter(void 0, void 0, void 0, function* () {
                    const SpanRenderer = (_a) => {
                        var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                        return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props, { textProps: { style: { marginBottom: 10 } } })));
                    };
                    const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                            html: '<span style="margin-bottom: 5px;"></span>'
                        }, debug: false, contentWidth: 0, renderers: { span: SpanRenderer } }));
                    const div = yield findByTestId('span');
                    expect(div).toHaveStyle({
                        marginBottom: 10
                    });
                }));
            });
        });
    });
    describe('regarding enableExperimentalMarginCollapsing prop', () => {
        it('should collapse margins of sibling block children when enabled', () => {
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div style="margin-bottom: 10px;"></div><p style="margin-top: 10px;">text</p>'
                }, debug: false, contentWidth: 100, enableExperimentalMarginCollapsing: true }));
            expect(getByTestId('div')).toHaveStyle({
                marginBottom: 10
            });
            expect(getByTestId('p')).toHaveStyle({ marginTop: 0 });
        });
        it('should not collapse margins of sibling phrasing children when enabled', () => {
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div style="margin-bottom: 10px;"></div><span style="margin-top: 10px;">text</span>'
                }, debug: false, contentWidth: 100, enableExperimentalMarginCollapsing: true }));
            expect(getByTestId('div')).toHaveStyle({ marginBottom: 10 });
            expect(getByTestId('span')).toHaveStyle({ marginTop: 10 });
        });
        it('should not collapse margins of sibling children when disabled', () => {
            const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div style="margin-bottom: 10px;"></div><p style="margin-top: 10px;"></p>'
                }, debug: false, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            expect(getByTestId('div')).toHaveStyle({ marginBottom: 10 });
            expect(getByTestId('p')).toHaveStyle({ marginTop: 10 });
        });
    });
    describe('regarding renderersProps prop', () => {
        it('should pass renderersProps to useRendererProps', () => {
            const DivRenderer = jest.fn(function DivRenderer() {
                expect((0, RenderersPropsProvider_1.useRendererProps)('div')).toBeDefined();
                return null;
            });
            (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div></div>'
                }, debug: false, renderers: {
                    div: DivRenderer
                }, renderersProps: {
                    div: {}
                }, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            expect(DivRenderer).toHaveBeenCalledTimes(1);
        });
    });
    describe('regarding renderers prop', () => {
        it('should support TNodeChildrenRenderer', () => {
            const renderChild = jest.fn(() => null);
            const DivRenderer = jest.fn(function DivRenderer(_a) {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props),
                    react_1.default.createElement(TNodeChildrenRenderer_1.default, { renderChild: renderChild, tnode: props.tnode })));
            });
            (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<div><span>child</span></div>'
                }, debug: false, renderers: {
                    div: DivRenderer
                }, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            expect(renderChild).toHaveBeenCalled();
        });
        it('should have TNodeChildrenRender support a text child', () => __awaiter(void 0, void 0, void 0, function* () {
            const SpanRenderer = jest.fn(function SpanRenderer(_a) {
                var { TDefaultRenderer } = _a, props = __rest(_a, ["TDefaultRenderer"]);
                return (react_1.default.createElement(TDefaultRenderer, Object.assign({}, props),
                    react_1.default.createElement(TNodeChildrenRenderer_1.default, { tnode: props.tnode })));
            });
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<span>hello!</span>'
                }, debug: false, renderers: {
                    span: SpanRenderer
                }, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            yield (0, react_native_1.waitFor)(() => UNSAFE_getByType(react_native_2.Text));
        }));
        it('should warn when using the default WebView component', () => {
            const ImageRenderer = jest.fn(function SpanRenderer({ sharedProps: { WebView } }) {
                return react_1.default.createElement(WebView, null);
            });
            console.warn = jest.fn();
            (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<img />'
                }, debug: false, renderers: {
                    img: ImageRenderer
                }, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            expect(console.warn).toHaveBeenCalled();
        });
    });
    describe('regarding TRenderEngineConfig props', () => {
        it('should update props when they change', () => __awaiter(void 0, void 0, void 0, function* () {
            const initialTagsStyles = {
                img: {
                    borderBottomWidth: 2
                }
            };
            const nextTagsStyles = {
                img: {
                    borderBottomWidth: 4
                }
            };
            const { update, findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { key: 0, source: {
                    html: '<img />'
                }, tagsStyles: initialTagsStyles, debug: false, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            update(react_1.default.createElement(RenderHTML_1.default, { key: 0, source: {
                    html: '<img />'
                }, tagsStyles: nextTagsStyles, debug: false, contentWidth: 100, enableExperimentalMarginCollapsing: false }));
            const img = yield findByTestId('img');
            expect(img).toHaveStyle({
                borderBottomWidth: 4
            });
        }));
    });
    describe('regarding provideEmbeddedHeaders prop', () => {
        it('should apply returned headers to IMG tags', () => __awaiter(void 0, void 0, void 0, function* () {
            const headers = {
                Authorization: 'Bearer XXX'
            };
            const getSizeWithHeaders = jest.spyOn(react_native_2.Image, 'getSizeWithHeaders');
            function provideEmbeddedHeaders(uri, tag) {
                expect(tag).toBe('img');
                return headers;
            }
            const { UNSAFE_getByType, findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<img src="https://custom.domain/" />'
                }, debug: false, contentWidth: 100, provideEmbeddedHeaders: provideEmbeddedHeaders }));
            yield findByTestId('image-success');
            const image = UNSAFE_getByType(react_native_2.Image);
            expect(image.props.source.headers).toBe(headers);
            expect(getSizeWithHeaders).toHaveBeenCalledWith('https://custom.domain/', headers, expect.anything(), expect.anything());
        }));
    });
    describe('regarding enableExperimentalBRCollapsing', () => {
        it('should render <br> tags to line breaks when followed by text', () => {
            const { queryByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: '<br><span>Two</span>'
                }, debug: false, contentWidth: 0, enableExperimentalBRCollapsing: true }));
            expect(queryByText('\n')).toBeDefined();
        });
        it('should render <br> tags to empty text when the tag closes an inline formatting context', () => {
            const { queryByText } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { source: {
                    html: 'Two<br><div></div>'
                }, debug: false, contentWidth: 0, enableExperimentalBRCollapsing: true }));
            expect(queryByText('\n')).toBeNull();
        });
    });
});
