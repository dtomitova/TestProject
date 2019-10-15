import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-ionicons';

const SearchBar = props => {
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
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    height: 40,
    margin: 7,
  },
  searchBarTextInput: {
    marginLeft: 8,
    height: '100%',
    width: '85%',
  },
  searchBarIcon: {
    height: 20,
    fontSize: 20,
    width: '15%',
    color: 'gray',
  },
});

export default SearchBar;
