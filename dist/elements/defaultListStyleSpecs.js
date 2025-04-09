"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const counter_style_1 = __importDefault(require("@jsamr/counter-style"));
const decimal_1 = __importDefault(require("@jsamr/counter-style/presets/decimal"));
const decimalLeadingZero_1 = __importDefault(require("@jsamr/counter-style/presets/decimalLeadingZero"));
const lowerRoman_1 = __importDefault(require("@jsamr/counter-style/presets/lowerRoman"));
const lowerAlpha_1 = __importDefault(require("@jsamr/counter-style/presets/lowerAlpha"));
const lowerGreek_1 = __importDefault(require("@jsamr/counter-style/presets/lowerGreek"));
const upperAlpha_1 = __importDefault(require("@jsamr/counter-style/presets/upperAlpha"));
const upperRoman_1 = __importDefault(require("@jsamr/counter-style/presets/upperRoman"));
const DisclosureClosedSymbolRenderer_1 = __importDefault(require("./symbolic/DisclosureClosedSymbolRenderer"));
const DisclosureOpenSymbolRenderer_1 = __importDefault(require("./symbolic/DisclosureOpenSymbolRenderer"));
const CircleSymbolRenderer_1 = __importDefault(require("./symbolic/CircleSymbolRenderer"));
const DiscSymbolRenderer_1 = __importDefault(require("./symbolic/DiscSymbolRenderer"));
const SquareSymbolRenderer_1 = __importDefault(require("./symbolic/SquareSymbolRenderer"));
const unitaryRenderer = counter_style_1.default.cyclic('*').withSuffix(' ');
const lowerAlphaSpec = {
    type: 'textual',
    counterStyleRenderer: lowerAlpha_1.default
};
const upperAlphaSpec = {
    type: 'textual',
    counterStyleRenderer: upperAlpha_1.default
};
/**
 * Default list style specs supported by this library.
 *
 * @public
 */
const defaultListStyleSpecs = {
    'decimal-leading-zero': {
        type: 'textual',
        counterStyleRenderer: decimalLeadingZero_1.default
    },
    'disclosure-closed': {
        counterStyleRenderer: unitaryRenderer,
        type: 'unitary',
        Component: DisclosureClosedSymbolRenderer_1.default
    },
    'disclosure-open': {
        counterStyleRenderer: unitaryRenderer,
        type: 'unitary',
        Component: DisclosureOpenSymbolRenderer_1.default
    },
    'lower-alpha': lowerAlphaSpec,
    'lower-greek': {
        type: 'textual',
        counterStyleRenderer: lowerGreek_1.default
    },
    'lower-latin': lowerAlphaSpec,
    'lower-roman': {
        type: 'textual',
        counterStyleRenderer: lowerRoman_1.default
    },
    'upper-alpha': upperAlphaSpec,
    'upper-latin': upperAlphaSpec,
    'upper-roman': {
        type: 'textual',
        counterStyleRenderer: upperRoman_1.default
    },
    circle: {
        counterStyleRenderer: unitaryRenderer,
        type: 'unitary',
        Component: CircleSymbolRenderer_1.default
    },
    decimal: {
        type: 'textual',
        counterStyleRenderer: decimal_1.default
    },
    disc: {
        counterStyleRenderer: unitaryRenderer,
        type: 'unitary',
        Component: DiscSymbolRenderer_1.default
    },
    none: {
        counterStyleRenderer: counter_style_1.default.symbolic('').withSuffix(null),
        type: 'unitary',
        Component: () => null
    },
    square: {
        counterStyleRenderer: unitaryRenderer,
        type: 'unitary',
        Component: SquareSymbolRenderer_1.default
    }
};
exports.default = defaultListStyleSpecs;
