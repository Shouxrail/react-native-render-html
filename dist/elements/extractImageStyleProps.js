"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pick_1 = __importDefault(require("ramda/src/pick"));
const extractProps = (0, pick_1.default)([
    'resizeMode',
    'tintColor',
    'overlayColor'
]);
function mapObjectFit(objectFit) {
    let resizeMode;
    switch (objectFit) {
        case 'contain':
        case 'cover':
            resizeMode = objectFit;
            break;
        case 'fill':
            resizeMode = 'stretch';
            break;
        case 'scale-down':
            resizeMode = 'contain';
            break;
        default:
            return null;
    }
    return { resizeMode };
}
function extractImageStyleProps(style, objectFit) {
    const resizeModeFromFit = objectFit ? mapObjectFit(objectFit) : null;
    return Object.assign(Object.assign({}, extractProps(style)), resizeModeFromFit);
}
exports.default = extractImageStyleProps;
