"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("@testing-library/react-native");
const utils_1 = require("./utils");
function testFontWithSpecialPattern(fontName) {
    it(`preserve special font name matching keywords such as ${fontName}`, () => {
        (0, utils_1.expectTranslatedInlineCSSValueToEqual)({
            render: react_native_1.render,
            cssInlineRules: `font-family: ${fontName}`,
            reactNativePropStyleName: 'fontFamily',
            value: fontName,
            extraProps: {
                systemFonts: [fontName]
            }
        });
    });
}
/**
 * https://github.com/meliorence/react-native-render-html/issues/266
 */
describe('HTML component', () => {
    describe('should pass regression #266 regarding mangeling of specific value patterns', () => {
        testFontWithSpecialPattern('fontWith-em');
        testFontWithSpecialPattern('fontWith-pt');
        testFontWithSpecialPattern('fontWith-px');
        testFontWithSpecialPattern('fontWith-normal');
        testFontWithSpecialPattern('fontWith-inherit');
        testFontWithSpecialPattern('fontWith-calc');
        testFontWithSpecialPattern('fontWith-none');
        testFontWithSpecialPattern('NovelSansPro-SemiBold');
    });
});
