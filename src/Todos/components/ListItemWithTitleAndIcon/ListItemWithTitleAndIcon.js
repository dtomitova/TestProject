import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-ionicons';

const listItemWithTitle = props => {
  const {renderItem} = props;
  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemTitle}>{renderItem.title}</Text>
      <Icon
        style={styles.listItemIcon}
        name={renderItem.completed === true ? 'checkmark' : 'close'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    padding: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
    borderRadius: 4,
  },
  listItemTitle: {
    fontFamily: 'Avenir',
    backgroundColor: 'lightblue',
    textAlign: 'left',
    padding: 10,
    margin: 4,
    borderRadius: 4,
    width: '90%',
  },
  listItemIcon: {
    width: '10%',
    padding: 5,
  },
});

export default listItemWithTitle;
