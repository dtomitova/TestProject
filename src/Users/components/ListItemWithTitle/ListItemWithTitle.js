import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import MainText from 'common/components/MainText/MainText';

const ListItemWithTitle = props => {
  const {renderItem, onItemSelected} = props;
  return (
    <TouchableOpacity onPress={() => props.onItemSelected(renderItem.id)}>
      <MainText style={styles.listItem}>
        {renderItem.name}, {renderItem.username}
      </MainText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 4,
    borderRadius: 4,
  },
});

export default ListItemWithTitle;
