import React, { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import useIMGElementState from './useIMGElementState';
import IMGElementContentSuccess from './IMGElementContentSuccess';
import IMGElementContainer from './IMGElementContainer';
import IMGElementContentLoading from './IMGElementContentLoading';
import IMGElementContentError from './IMGElementContentError';
import type { IMGElementProps } from './img-types';
import defaultImageInitialDimensions from './defaultInitialImageDimensions';

export type { IMGElementProps } from './img-types';

function identity(arg: any) {
  return arg;
}

/**
 * A component to render images based on an internal loading state.
 */
function IMGElement({
  source,
  alt,
  altColor,
  height,
  width,
  style = {},
  computeMaxWidth = identity,
  contentWidth,
  enableExperimentalPercentWidth = false,
  initialDimensions = defaultImageInitialDimensions,
  onPress,
  testID,
  objectFit,
  cachedNaturalDimensions,
  containerProps
}: IMGElementProps): ReactElement {
  const props: IMGElementProps = {
    source,
    alt,
    altColor,
    height,
    width,
    style,
    computeMaxWidth,
    contentWidth,
    enableExperimentalPercentWidth,
    initialDimensions,
    onPress,
    testID,
    objectFit,
    cachedNaturalDimensions,
    containerProps
  };

  const state = useIMGElementState(props);

  let content: ReactNode;
  if (state.type === 'success') {
    content = <IMGElementContentSuccess {...state} />;
  } else if (state.type === 'loading') {
    content = <IMGElementContentLoading {...state} />;
  } else {
    content = <IMGElementContentError {...state} />;
  }

  return (
    <IMGElementContainer
      testID={testID}
      {...containerProps}
      onPress={onPress}
      style={state.containerStyle}>
      {content}
    </IMGElementContainer>
  );
}

const imgDimensionsType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number
});

IMGElement.propTypes = {
  source: PropTypes.object.isRequired,
  alt: PropTypes.string,
  altColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  computeMaxWidth: PropTypes.func.isRequired,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  initialDimensions: imgDimensionsType,
  onPress: PropTypes.func,
  testID: PropTypes.string,
  objectFit: PropTypes.string,
  cachedNaturalDimensions: imgDimensionsType,
  containerProps: PropTypes.object
};

export default IMGElement;
