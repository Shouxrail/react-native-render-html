"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_1 = require("@testing-library/react-native");
const IMGElement_1 = __importDefault(require("../elements/IMGElement"));
/**
 * https://github.com/meliorence/react-native-render-html/issues/384
 **/
describe('RenderHTML component', () => {
    describe('should pass regression regarding RenderHTML props passed to image renderer', () => {
        it('translated image elements should not contain a renderers prop', () => {
            const { UNSAFE_getByType } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: { html: '<img src="https://img.com/1"/>' } }));
            const image = UNSAFE_getByType(IMGElement_1.default);
            expect(image).not.toHaveProp('renderers');
        });
    });
});
