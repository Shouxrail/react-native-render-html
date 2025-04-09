"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OLElement;
const react_1 = __importDefault(require("react"));
const ListElement_1 = __importDefault(require("./ListElement"));
function OLElement(props) {
    return react_1.default.createElement(ListElement_1.default, Object.assign(Object.assign({}, props), { listType: 'ol' }));
}
