"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("@testing-library/react-native");
const debugMessages_1 = __importDefault(require("../debugMessages"));
const RenderHTMLDebug_1 = __importDefault(require("../RenderHTMLDebug"));
function createOutdatedPropTest(propName, propValue, debugName) {
    it(`should warn when outdated ${propName} prop has been provided`, () => {
        console.warn = jest.fn();
        (0, react_native_1.render)(
        // @ts-expect-error test condition
        react_1.default.createElement(RenderHTMLDebug_1.default, {
            [propName]: propValue,
            debug: false,
            contentWidth: 10
        }));
        expect(debugMessages_1.default[debugName]).toBeDefined();
        expect(console.warn).toHaveBeenNthCalledWith(1, debugMessages_1.default[debugName]);
    });
}
describe('RenderHTMLDebug', () => {
    createOutdatedPropTest('html', 'hello world', 'outdatedHtmlProp');
    createOutdatedPropTest('uri', 'https://domain.com', 'outdatedUriProp');
    createOutdatedPropTest('listsPrefixesRenderers', {}, 'outdatedListPrefixRenderersProps');
    createOutdatedPropTest('imagesInitialDimensions', {}, 'outdatedImagesDimensions');
    createOutdatedPropTest('onLinkPress', [], 'outdatedOnLinkPressProp');
    createOutdatedPropTest('enableExperimentalPercentWidth', false, 'outdatedEnableExperimentalPercentWidth');
    createOutdatedPropTest('ignoreNodesFunction', () => { }, 'outdatedIgnoreNodesFunction');
    createOutdatedPropTest('alterNode', () => { }, 'outdatedAlterNode');
    createOutdatedPropTest('alterData', () => { }, 'outdatedAlterData');
    createOutdatedPropTest('alterChildren', () => { }, 'outdatedAlterChildren');
    createOutdatedPropTest('computeImagesMaxWidth', () => { }, 'outdatedComputeImagesMaxWidth');
    createOutdatedPropTest('triggerTREInvalidationPropNames', () => { }, 'outdatedTriggerTREInvalidation');
    it('should warn of allowedStyles items with hyphens', () => {
        console.warn = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTMLDebug_1.default, {
            //@ts-expect-error invalid key
            allowedStyles: ['hello-world', 'color'],
            debug: false,
            contentWidth: 10
        }));
        expect(console.warn).toHaveBeenCalledTimes(1);
    });
    it('should warn of ignoredStyles items with hyphens', () => {
        console.warn = jest.fn();
        (0, react_native_1.render)(react_1.default.createElement(RenderHTMLDebug_1.default, {
            //@ts-expect-error invalid key
            ignoredStyles: ['hello-world', 'color'],
            debug: false,
            contentWidth: 10
        }));
        expect(console.warn).toHaveBeenCalledTimes(1);
    });
});
