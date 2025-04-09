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
const react_1 = __importDefault(require("react"));
const react_native_1 = require("@testing-library/react-native");
const IMGElement_1 = __importDefault(require("../elements/IMGElement"));
/**
 * https://github.com/meliorence/react-native-render-html/issues/141
 */
describe('HTMLImageElement component should pass regression test #141', () => {
    it("doesn't display the image prior to receiving original dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        const source = { uri: 'http://via.placeholder.com/640x360' };
        const style = {};
        const { findByTestId, getByTestId, queryByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_1.default, { key: "1", style: style, source: source }));
        const placeholder = getByTestId('image-loading');
        expect(placeholder).toBeTruthy();
        const imageLayout = queryByTestId('image-success');
        expect(imageLayout).toBeFalsy();
        yield expect(findByTestId('image-success', { timeout: 100 })).resolves.toBeTruthy();
    }));
});
