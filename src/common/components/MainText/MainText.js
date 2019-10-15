import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Constants from '../../Constants';

const MainText = props => (
  <Text {...props} style={[styles.mainText, props.style]}>
    {props.children}
  </Text>
);

export default MainText;

const styles = StyleSheet.create({
  mainText: {
    fontFamily: Constants.BASE_FONT,
    fontSize: Constants.BASE_FONT_SIZE,
  },
});
