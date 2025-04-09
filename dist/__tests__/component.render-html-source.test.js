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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domhandler_1 = require("domhandler");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("@testing-library/react-native");
const debugMessages_1 = __importDefault(require("../debugMessages"));
const RenderHTMLConfigProvider_1 = __importDefault(require("../RenderHTMLConfigProvider"));
const RenderHTMLSource_1 = __importDefault(require("../RenderHTMLSource"));
const RenderTTree_1 = __importDefault(require("../RenderTTree"));
const TRenderEngineProvider_1 = __importDefault(require("../TRenderEngineProvider"));
beforeAll(function () {
    //@ts-expect-error __DEV__ defined by RN env
    global.__DEV__ = true;
});
function renderSource(props) {
    return (0, react_native_1.render)(react_1.default.createElement(TRenderEngineProvider_1.default, null,
        react_1.default.createElement(RenderHTMLConfigProvider_1.default, null,
            react_1.default.createElement(RenderHTMLSource_1.default, Object.assign({}, props)))));
}
describe('RenderHTMLSource', () => {
    it('should warn when source has not been provided', () => {
        console.warn = jest.fn();
        //@ts-expect-error missing source
        renderSource({ contentWidth: 10 });
        expect(console.warn).toHaveBeenNthCalledWith(1, debugMessages_1.default.noSource);
    });
    it('should warn when contentWidth has not been provided', () => {
        console.warn = jest.fn();
        renderSource({ source: { html: 'hello' } });
        expect(console.warn).toHaveBeenNthCalledWith(1, debugMessages_1.default.contentWidth);
    });
    it('should render html sources', () => {
        renderSource({ source: { html: 'hello' }, contentWidth: 0 });
    });
    it('should render dom sources', () => {
        renderSource({ source: { dom: new domhandler_1.Element('div', {}) }, contentWidth: 0 });
    });
    describe('should render uri sources', () => {
        it('should render content when remote resource is available', () => __awaiter(void 0, void 0, void 0, function* () {
            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: true,
                    text() {
                        return Promise.resolve('<div>Hello world!</div');
                    }
                });
            });
            const { UNSAFE_getByType } = renderSource({
                source: { uri: 'https://motherfuckingwebsite.com/' },
                contentWidth: 0
            });
            yield (0, react_native_1.waitFor)(() => UNSAFE_getByType(RenderTTree_1.default));
        }));
        it('should render the error view when remote resource is unavailable', () => __awaiter(void 0, void 0, void 0, function* () {
            global.fetch = jest.fn(() => {
                return Promise.resolve({
                    ok: false
                });
            });
            const { findByTestId } = renderSource({
                source: { uri: 'https://motherfuckingwebsite.com/' },
                contentWidth: 0
            });
            yield findByTestId('loader-error');
        }));
        it('should render the error view when the fetch call throws', () => __awaiter(void 0, void 0, void 0, function* () {
            global.fetch = jest.fn(() => {
                return Promise.reject('Ooops!');
            });
            const { findByTestId } = renderSource({
                source: { uri: 'https://motherfuckingwebsite.com/' },
                contentWidth: 0
            });
            yield findByTestId('loader-error');
        }));
    });
});
