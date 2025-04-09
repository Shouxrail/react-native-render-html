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
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
/**
 * https://github.com/meliorence/react-native-render-html/issues/172
 */
describe('HTMLImageElement component should pass regression test #172', () => {
    it('passes resizeMode to RN Image component', () => __awaiter(void 0, void 0, void 0, function* () {
        const tagsStyles = {
            img: {
                resizeMode: 'contain',
                width: 100,
                height: 100
            }
        };
        const { getByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, source: {
                html: '<img width="100" height="100" src="http://via.placeholder.com/100x100" />'
            }, tagsStyles: tagsStyles }));
        const image = getByTestId('image-success');
        expect(image).toHaveStyle(tagsStyles.img);
    }));
});
