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
const RenderHTML_1 = __importDefault(require("../RenderHTML"));
const react_native_1 = require("@testing-library/react-native");
/**
 * https://github.com/meliorence/react-native-render-html/issues/524
 **/
describe('RenderHTML component', () => {
    describe('should pass regression regarding percent width', () => {
        it('dimensions should not be derived from aspect ratio', () => __awaiter(void 0, void 0, void 0, function* () {
            const renderersProps = {
                img: {
                    enableExperimentalPercentWidth: true
                }
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(RenderHTML_1.default, { debug: false, contentWidth: 300, renderersProps: renderersProps, source: {
                    html: '<img style="width:100%" src="https://img.com/1920x1080" width="800" height="400"/>'
                } }));
            const img = yield findByTestId('image-success');
            expect(img).toHaveStyle({
                width: 300,
                height: 400
            });
        }));
    });
});
