"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStringListPrefixFromIndex_1 = require("../getStringListPrefixFromIndex");
describe('getStringPrefixFromIndex', () => {
    it('should return a one-length caracter when index < modulo', () => {
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(0, 97, 26)).toEqual('a');
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(1, 97, 26)).toEqual('b');
    });
    it('should return a two-length caracter when index > 1 mod && index < 2 mod', () => {
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(26, 97, 26)).toEqual('aa');
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(26 * 8, 97, 26)).toEqual('ha');
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(27, 97, 26)).toEqual('ab');
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(26 * 2 + 2, 97, 26)).toEqual('bc');
        expect((0, getStringListPrefixFromIndex_1.getStringPrefixFromIndex)(26 * 27, 97, 26)).toEqual('aaa');
    });
});
