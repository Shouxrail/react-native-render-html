"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ARenderer_1 = __importDefault(require("../renderers/ARenderer"));
const IMGRenderer_1 = __importDefault(require("../renderers/IMGRenderer"));
const OLRenderer_1 = __importDefault(require("../renderers/OLRenderer"));
const ULRenderer_1 = __importDefault(require("../renderers/ULRenderer"));
const internalRenderers = {
    img: IMGRenderer_1.default,
    ul: ULRenderer_1.default,
    ol: OLRenderer_1.default,
    a: ARenderer_1.default
};
exports.default = internalRenderers;
