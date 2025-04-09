"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IMGElementContainer;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const GenericPressable_1 = __importDefault(require("../GenericPressable"));
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
/**
 * Container for the {@link IMGElement} component.
 */
function IMGElementContainer(_a) {
    var { style, onPress, testID, children } = _a, otherProps = __rest(_a, ["style", "onPress", "testID", "children"]);
    const containerStyle = (0, react_1.useMemo)(() => {
        const { width, height } = style, remainingStyle = __rest(style, ["width", "height"]);
        return [styles.container, remainingStyle];
    }, [style]);
    const Container = typeof onPress === 'function' ? GenericPressable_1.default : react_native_1.View;
    return react_1.default.createElement(Container, Object.assign(Object.assign({}, otherProps), { style: containerStyle, onPress, testID }), children);
}
