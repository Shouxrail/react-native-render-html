"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAOnPress = defaultAOnPress;
const react_native_1 = require("react-native");
function defaultAOnPress(_e, href) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield react_native_1.Linking.openURL(href);
        }
        catch (e) {
            console.warn(`Could not open URL "${href}".`, e);
        }
        return null;
    });
}
const defaultRendererProps = {
    img: {
        initialDimensions: {
            height: 50,
            width: 50
        },
        enableExperimentalPercentWidth: false
    },
    a: {
        onPress: defaultAOnPress
    },
    ol: {},
    ul: {}
};
exports.default = defaultRendererProps;
