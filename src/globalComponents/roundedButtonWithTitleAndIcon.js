import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-ionicons';

const roundedButtonWithTitleAndIcon = props => {
  const {dataSourceUserDetails, icon} = props;
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => props.handleButtonPressed(props.children)}>
      <Text style={styles.buttonTitle}>{props.children}</Text>
      <Icon style={styles.icon} name={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
  buttonTitle: {
    fontFamily: 'Avenir',
    width: '85%',
  },
  icon: {
    width: '15%',
  },
});

export default roundedButtonWithTitleAndIcon;
