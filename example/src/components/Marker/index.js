import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const Marker = ({style, radius, color}) => {
  return (
    <View
      style={
        (style,
        {
          backgroundColor: color,
          width: 20 + radius,
          height: 20 + radius,
          borderRadius: 10000,
        })
      }
    />
  );
};
export default Marker;

Marker.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  radius: PropTypes.number,
  color: PropTypes.string,
};

Marker.defaultProps = {
  style: null,
  radius: 0,
  color: null,
};
