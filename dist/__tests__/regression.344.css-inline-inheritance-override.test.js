"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_1 = require("@testing-library/react-native");
/**
 * https://github.com/meliorence/react-native-render-html/issues/344
 */
describe('RenderHTML component should pass regression #344', () => {
    it('when anchors nested in paragraphs have their tagStyles overridden by inline inheritance', () => {
        const tagsStyles = {
            p: {
                color: 'red'
            },
            a: {
                color: 'green'
            }
        };
        const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, tagsStyles: tagsStyles, source: { html: '<p><img src="https://img.com/1"/>foo<a>bar</a></p>' } }));
        const text = getByTestId('a');
        expect(text).toHaveStyle({
            color: 'green'
        });
    });
});
