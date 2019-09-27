import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const userListView = props => (
  <FlatList
    style={styles.usersList}
    data={props.usersDataSource}
    renderItem={({item}) => (
      <TouchableOpacity onPress={props.userSelected.bind(this, item.id)}>
        <Text style={styles.userItem}>
          {item.name}, {item.username}
        </Text>
      </TouchableOpacity>
    )}
    keyExtractor={({id}, index) => id.toString()}
  />
);

const styles = StyleSheet.create({
  usersList: {
    margin: 10,
  },
  userItem: {
    fontFamily: 'Avenir',
    backgroundColor: 'lightblue',
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 4,
  },
});

export default userListView;
