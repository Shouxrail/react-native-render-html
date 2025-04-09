"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const splitBoxModelStyle_1 = __importDefault(require("../splitBoxModelStyle"));
describe('splitBoxModelStyle', () => {
    it('should split styles in two distinct chunks', () => {
        const { boxModelStyle, otherStyle } = (0, splitBoxModelStyle_1.default)({
            borderBottomColor: 'red',
            color: 'black',
            paddingBottom: 10
        });
        expect(boxModelStyle).toEqual({
            borderBottomColor: 'red',
            paddingBottom: 10
        });
        expect(otherStyle).toEqual({
            color: 'black'
        });
    });
});
