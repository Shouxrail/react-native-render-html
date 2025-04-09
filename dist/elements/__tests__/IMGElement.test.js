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
const IMGElement_1 = __importDefault(require("../IMGElement"));
const IMGElement_2 = __importDefault(require("../IMGElement"));
describe('IMGElement', () => {
    it('should render an error fallback component on error', () => __awaiter(void 0, void 0, void 0, function* () {
        const source = { uri: 'error' };
        const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { source: source }));
        yield findByTestId('image-error');
    }));
    it('should render a GenericPressable when provided with onPress prop', () => __awaiter(void 0, void 0, void 0, function* () {
        const onPress = jest.fn();
        const source = { uri: 'http://via.placeholder.com/640x360' };
        const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { onPress: onPress, source: source }));
        yield findByTestId('generic-pressable');
    }));
    it('should call onError when encountering an error after success', () => __awaiter(void 0, void 0, void 0, function* () {
        const source = { uri: 'http://via.placeholder.com/640x360' };
        const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_1.default, { source: source }));
        const imageSuccess = yield findByTestId('image-success');
        (0, react_native_1.act)(() => imageSuccess.props.onError.call(null, {
            nativeEvent: { error: new Error() }
        }));
        yield findByTestId('image-error', { timeout: 50 });
    }));
    describe('object-fit support', () => {
        const defaultRM = 'cover';
        const specs = {
            contain: 'contain',
            cover: 'cover',
            unset: defaultRM,
            fill: 'stretch',
            'scale-down': 'contain',
            '-moz-initial': defaultRM,
            inherit: defaultRM,
            initial: defaultRM,
            none: defaultRM,
            revert: defaultRM
        };
        for (const [objectFit, resizeMode] of Object.entries(specs)) {
            it(`should map object-fit "${objectFit}" to resizeMode "${resizeMode}"`, () => __awaiter(void 0, void 0, void 0, function* () {
                const source = { uri: 'http://via.placeholder.com/640x360' };
                const style = {
                    width: 320,
                    height: 180
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { objectFit: objectFit, style: style, source: source }));
                const image = yield findByTestId('image-success');
                expect(image).toHaveStyle({
                    resizeMode
                });
            }));
        }
    });
    describe('scaling logic', () => {
        it('should use width and height from styles', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 320,
                height: 180
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { style: style, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle(style);
        }));
        it('should use width and height from props', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 320,
                height: 180
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle(style);
        }));
        it('should combine width with aspectRatio', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640' };
            const dimensions = {
                width: 320
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, dimensions, { style: { aspectRatio: 2 }, source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 320,
                height: 160
            });
        }));
        it('should combine height with aspectRatio', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640' };
            const dimensions = {
                height: 160
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, dimensions, { style: { aspectRatio: 2 }, source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 320,
                height: 160
            });
        }));
        it('should scale down required dimensions to contentWidth prop when appropriate', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 320,
                height: 180
            };
            const contentWidth = 160;
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({ contentWidth: contentWidth }, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: contentWidth,
                height: contentWidth / (style.width / style.height)
            });
        }));
        it('should scale the image to contentWidth prop when appropriate when only width or height is required', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 320
            };
            const contentWidth = 160;
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({ contentWidth: contentWidth }, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: contentWidth,
                height: contentWidth / (640 / 360)
            });
        }));
        it('should scale the image down when only width or height is required', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 320
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 320,
                height: 180
            });
        }));
        it('should use physical dimensions when no width or height requirements are provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { contentWidth: 800, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 640,
                height: 360
            });
        }));
        it('should handle 0-width and height requirements', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 0,
                height: 0
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 0,
                height: 0
            });
        }));
        it('should handle 0-width or height requirements', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: 0
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 0,
                height: 0
            });
        }));
        it('should handle maxWidth requirements', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                maxWidth: 320
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { style: style, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 320,
                height: 180
            });
        }));
        it('should handle maxHeight requirements', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                maxHeight: 180
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { style: style, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 320,
                height: 180
            });
        }));
        it('should handle minWidth requirements', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/10x12' };
            const style = {
                minWidth: 30
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { style: style, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 30,
                height: 36
            });
        }));
        it('should handle minHeight requirements', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/10x12' };
            const style = {
                minHeight: 36
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { style: style, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 30,
                height: 36
            });
        }));
    });
    describe('special units', () => {
        it('should ignore requirements in percentage when enableExperimentalPercentWidth or contentWidth props are not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: '50%'
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 640,
                height: 360
            });
        }));
        it('should support strings for width and height which can be parsed to numbers', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                width: '50'
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, style, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 50
            });
        }));
        describe('when given enableExperimentalPercentWidth + contentWidth props', () => {
            it('should support requirements in percentage', () => __awaiter(void 0, void 0, void 0, function* () {
                const source = { uri: 'http://via.placeholder.com/640x360' };
                const contentWidth = 250;
                const style = {
                    width: '50%'
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({ enableExperimentalPercentWidth: true, contentWidth: contentWidth }, style, { source: source })));
                const image = yield findByTestId('image-success');
                expect(image).toBeTruthy();
                expect(image).toHaveStyle({
                    width: contentWidth * 0.5
                });
            }));
            it('should constrain a percentage width with the value returned by computeMaxWidth', () => __awaiter(void 0, void 0, void 0, function* () {
                const source = { uri: 'http://via.placeholder.com/640x360' };
                const contentWidth = 250;
                const style = {
                    width: '80%'
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({ enableExperimentalPercentWidth: true, computeMaxWidth: (c) => c * 0.7, contentWidth: 250 }, style, { source: source })));
                const image = yield findByTestId('image-success');
                expect(image).toBeTruthy();
                expect(image).toHaveStyle({
                    width: contentWidth * 0.7
                });
            }));
            it('should ignore percentage heights', () => __awaiter(void 0, void 0, void 0, function* () {
                const source = { uri: 'http://via.placeholder.com/640x360' };
                const contentWidth = 250;
                const style = {
                    height: '10%'
                };
                const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({ enableExperimentalPercentWidth: true, contentWidth: 250 }, style, { source: source })));
                const image = yield findByTestId('image-success');
                expect(image).toBeTruthy();
                expect(image).toHaveStyle({
                    width: contentWidth,
                    height: (360 / 640) * contentWidth
                });
            }));
        });
    });
    describe('capabilities regarding spacing', () => {
        it('should take into account horizontal margins when scaling down', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const style = {
                margin: 25,
                marginHorizontal: 30
            };
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { contentWidth: 200, style: style, source: source }));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle({
                width: 200 - 30 * 2
            });
        }));
    });
    describe('when changing props', () => {
        it('should update box width and height when requirements change', () => __awaiter(void 0, void 0, void 0, function* () {
            const source = { uri: 'http://via.placeholder.com/640x360' };
            const initialStyle = {
                width: 640,
                height: 360
            };
            const nextStyle = {
                width: 320,
                height: 180
            };
            const { findByTestId, update } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, Object.assign({}, initialStyle, { source: source })));
            update(react_1.default.createElement(IMGElement_2.default, Object.assign({}, nextStyle, { source: source })));
            const image = yield findByTestId('image-success');
            expect(image).toBeTruthy();
            expect(image).toHaveStyle(nextStyle);
        }));
        it('should update uri and fetch new dimensions when source changes', () => __awaiter(void 0, void 0, void 0, function* () {
            const initialSource = { uri: 'http://via.placeholder.com/640x360' };
            const nextSource = { uri: 'http://via.placeholder.com/1920x1080' };
            const { findByTestId, update } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { source: initialSource }));
            const image1 = yield findByTestId('image-success');
            expect(image1).toBeTruthy();
            expect(image1).toHaveStyle({
                width: 640,
                height: 360
            });
            update(react_1.default.createElement(IMGElement_2.default, { source: nextSource }));
            yield findByTestId('image-loading');
            const image2 = yield findByTestId('image-success');
            expect(image2).toBeTruthy();
            expect(image2).toHaveStyle({
                width: 1920,
                height: 1080
            });
        }));
        it('should retain inline style prior to attributes width and height to compute concrete dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
            const { findByTestId } = (0, react_native_1.render)(react_1.default.createElement(IMGElement_2.default, { width: "1200", height: "800", contentWidth: 500, enableExperimentalPercentWidth: true, style: {
                    width: '50%',
                    height: 100
                }, source: { uri: 'http://via.placeholder.com/1200x800' } }));
            const image2 = yield findByTestId('image-success');
            expect(image2).toBeTruthy();
            expect(image2).toHaveStyle({
                width: 250,
                height: 100
            });
        }));
    });
});
