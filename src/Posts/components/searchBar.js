import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-ionicons';

const searchBar = props => {
  const {handleSearchChange, searchText} = props;

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        value={searchText}
        placeholder="Search"
        style={styles.searchBarTextInput}
        onChangeText={text => handleSearchChange(text)}
      />
      <Icon
        onPress={() => handleSearchChange('')}
        style={styles.searchBarIcon}
        name={searchText !== '' ? 'close-circle' : 'search'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    height: 34,
    margin: 7,
  },
  searchBarTextInput: {
    marginLeft: 8,
    height: 34,
    width: '85%',
  },
  searchBarIcon: {
    width: '15%',
    color: 'gray',
    fontSize: 20,
    padding: 4,
  },
});

export default searchBar;
