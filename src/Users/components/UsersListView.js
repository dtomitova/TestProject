import React, {Component} from 'react';
import {FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';

const userListView = props => {
  const {usersDataSource, userSelected} = props;
  return (
    <FlatList
      style={styles.usersList}
      data={usersDataSource}
      renderItem={({item}) => (
        <TouchableOpacity onPress={userSelected.bind(this, item.id)}>
          <Text style={styles.userItem}>
            {item.name}, {item.username}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={({id}) => id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  usersList: {
    margin: 10,
  },
  userItem: {
    fontFamily: 'Avenir',
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 4,

    borderRadius: 4,
  },
});

export default userListView;
