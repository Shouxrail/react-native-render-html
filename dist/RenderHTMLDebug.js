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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const debugMessages_1 = __importDefault(require("./debugMessages"));
const RenderHTMLDebug = function RenderHTMLDebug(props) {
    if (typeof __DEV__ === 'boolean' && __DEV__) {
        if (typeof props.contentWidth !== 'number') {
            console.warn(debugMessages_1.default.contentWidth);
        }
        if ('html' in props) {
            console.warn(debugMessages_1.default.outdatedHtmlProp);
        }
        if ('uri' in props) {
            console.warn(debugMessages_1.default.outdatedUriProp);
        }
        if ('listsPrefixesRenderers' in props) {
            console.warn(debugMessages_1.default.outdatedListPrefixRenderersProps);
        }
        if ('imagesInitialDimensions' in props) {
            console.warn(debugMessages_1.default.outdatedImagesDimensions);
        }
        if ('onLinkPress' in props) {
            console.warn(debugMessages_1.default.outdatedOnLinkPressProp);
        }
        if ('enableExperimentalPercentWidth' in props) {
            console.warn(debugMessages_1.default.outdatedEnableExperimentalPercentWidth);
        }
        if ('ignoreNodesFunction' in props) {
            console.warn(debugMessages_1.default.outdatedIgnoreNodesFunction);
        }
        if ('alterNode' in props) {
            console.warn(debugMessages_1.default.outdatedAlterNode);
        }
        if ('alterChildren' in props) {
            console.warn(debugMessages_1.default.outdatedAlterChildren);
        }
        if ('alterData' in props) {
            console.warn(debugMessages_1.default.outdatedAlterData);
        }
        if ('computeImagesMaxWidth' in props) {
            console.warn(debugMessages_1.default.outdatedComputeImagesMaxWidth);
        }
        if ('triggerTREInvalidationPropNames' in props) {
            console.warn(debugMessages_1.default.outdatedTriggerTREInvalidation);
        }
        if (Array.isArray(props.allowedStyles)) {
            props.allowedStyles.forEach((s) => {
                if (s.indexOf('-') > -1) {
                    console.warn(`Style property '${s}' of 'allowedStyles' prop array must be camelCased.`);
                }
            });
        }
        if (Array.isArray(props.ignoredStyles)) {
            props.ignoredStyles.forEach((s) => {
                if (s.indexOf('-') > -1) {
                    console.warn(`Style property '${s}' of 'ignoredStyles' prop array must be camelCased.`);
                }
            });
        }
    }
    return react_1.default.createElement(react_1.Fragment, null, props.children);
};
exports.default = RenderHTMLDebug;
