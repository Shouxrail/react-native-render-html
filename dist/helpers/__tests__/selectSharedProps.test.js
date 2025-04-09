"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selectSharedProps_1 = __importDefault(require("../selectSharedProps"));
describe('selectSharedProps', () => {
    it('should default to default values', () => {
        expect((0, selectSharedProps_1.default)({ debug: undefined }).debug).toEqual(false);
    });
    it('should retain non-nil values', () => {
        expect((0, selectSharedProps_1.default)({ debug: true }).debug).toEqual(true);
    });
});
