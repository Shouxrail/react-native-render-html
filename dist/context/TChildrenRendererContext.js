"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTNodeChildrenRenderer = useTNodeChildrenRenderer;
exports.useTChildrenRenderer = useTChildrenRenderer;
const react_1 = __importDefault(require("react"));
/**
 * This context allows dependency injection to avoid circular dependencies.
 */
const TChildrenRenderersContext = react_1.default.createContext({
    TChildrenRenderer: null,
    TNodeChildrenRenderer: null
});
function useTNodeChildrenRenderer() {
    return react_1.default.useContext(TChildrenRenderersContext).TNodeChildrenRenderer;
}
function useTChildrenRenderer() {
    return react_1.default.useContext(TChildrenRenderersContext).TChildrenRenderer;
}
exports.default = TChildrenRenderersContext;
