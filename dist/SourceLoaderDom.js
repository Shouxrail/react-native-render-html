"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SourceLoaderDom;
const react_1 = __importDefault(require("react"));
const RenderTTree_1 = __importDefault(require("./RenderTTree"));
function SourceLoaderDom(props) {
    return react_1.default.createElement(RenderTTree_1.default, {
        document: props.source.dom,
        baseUrl: props.source.baseUrl
    });
}
