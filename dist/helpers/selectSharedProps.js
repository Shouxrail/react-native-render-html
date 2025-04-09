"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pickBy_1 = __importDefault(require("ramda/src/pickBy"));
const pick_1 = __importDefault(require("ramda/src/pick"));
const pipe_1 = __importDefault(require("ramda/src/pipe"));
const mergeRight_1 = __importDefault(require("ramda/src/mergeRight"));
const defaultSharedProps_1 = __importDefault(require("../context/defaultSharedProps"));
const selectSharedProps = (0, pipe_1.default)((0, pick_1.default)(Object.keys(defaultSharedProps_1.default)), (0, pickBy_1.default)((val) => val != null), (0, mergeRight_1.default)(defaultSharedProps_1.default));
exports.default = selectSharedProps;
