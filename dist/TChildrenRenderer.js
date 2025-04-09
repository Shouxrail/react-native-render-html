"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderChildren_1 = __importDefault(require("./renderChildren"));
/**
 * A component to render collections of tnodes.
 * Especially useful when used with {@link useTNodeChildrenProps}.
 */
const TChildrenRenderer = (props) => (0, renderChildren_1.default)(Object.assign({ propsForChildren: {} }, props));
exports.default = TChildrenRenderer;
