import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import type { IMGElementProps } from './img-types';
export type { IMGElementProps } from './img-types';
/**
 * A component to render images based on an internal loading state.
 */
declare function IMGElement({ source, alt, altColor, height, width, style, computeMaxWidth, contentWidth, enableExperimentalPercentWidth, initialDimensions, onPress, testID, objectFit, cachedNaturalDimensions, containerProps }: IMGElementProps): ReactElement;
declare namespace IMGElement {
    var propTypes: {
        source: PropTypes.Validator<object>;
        alt: PropTypes.Requireable<string>;
        altColor: PropTypes.Requireable<string>;
        height: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        width: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
        style: PropTypes.Requireable<object>;
        computeMaxWidth: PropTypes.Validator<(...args: any[]) => any>;
        contentWidth: PropTypes.Requireable<number>;
        enableExperimentalPercentWidth: PropTypes.Requireable<boolean>;
        initialDimensions: PropTypes.Requireable<PropTypes.InferProps<{
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
        }>>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        testID: PropTypes.Requireable<string>;
        objectFit: PropTypes.Requireable<string>;
        cachedNaturalDimensions: PropTypes.Requireable<PropTypes.InferProps<{
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
        }>>;
        containerProps: PropTypes.Requireable<object>;
    };
}
export default IMGElement;
