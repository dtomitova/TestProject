import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const listItemWithTitle = props => {
  const {renderItem, userSelected} = props;
  return (
    <TouchableOpacity onPress={() => props.userSelected(renderItem.id)}>
      <Text style={styles.listItem}>
        {renderItem.name}, {renderItem.username}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    fontFamily: 'Avenir',
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 4,
    borderRadius: 4,
  },
});

export default listItemWithTitle;
