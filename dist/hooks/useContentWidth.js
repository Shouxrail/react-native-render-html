"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useContentWidth;
const react_1 = require("react");
const contentWidthContext_1 = __importDefault(require("../context/contentWidthContext"));
/**
 * A hook to get access to the ambient `contentWidth`.
 *
 * @returns The contentWidth available in context.
 *
 * @public
 */
function useContentWidth() {
    return (0, react_1.useContext)(contentWidthContext_1.default);
}
