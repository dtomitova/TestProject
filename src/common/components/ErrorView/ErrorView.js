import React from 'react';
import {StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import MainText from '../MainText/MainText';
import Constants from '../../Constants';

const TRY_AGAIN = 'Try again';
const ERROR_FONT_SIZE = 20;
const BUTTON_TITLE_FONT_SIZE = 16;

const ErrorView = props => {
  const {errorMessage} = props;

  return (
    <View style={styles.container}>
      <MainText style={styles.errorText}>{errorMessage}</MainText>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onTryAgainBtnPressed}>
        <MainText style={styles.buttonTtitle}>{TRY_AGAIN}</MainText>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor: 'lightgray',
    padding: 8,
    marginTop: 10,
  },
  buttonTtitle: {
    fontSize: BUTTON_TITLE_FONT_SIZE,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: ERROR_FONT_SIZE,
    paddingTop: 20,
  },
});
