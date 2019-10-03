import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-ionicons';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInputText: null,
    };
  }

  handleSearchChange = newSearch => {
    const trimmedSearch = newSearch.trimLeft();
    if (trimmedSearch === null || trimmedSearch === '') {
      this.setState({currentInputText: null});
    } else {
      this.setState({currentInputText: trimmedSearch});
    }
  };

  handleDeleteInputText = () => {
    this.setState({currentInputText: null});
    this.props.handleSearchInputChanged();
  };

  render() {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          value={this.state.currentInputText}
          placeholder="Search"
          style={styles.textInput}
          onChange={this.props.handleSearchInputChanged}
          onChangeText={text => this.handleSearchChange(text)}
        />
        <Icon
          onPress={this.handleDeleteInputText}
          style={styles.searchIcon}
          name={
            this.state.currentInputText !== null ? 'close-circle' : 'search'
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
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
  textInput: {
    marginLeft: 8,
    height: 34,
    width: '85%',
  },
  searchIcon: {
    width: '15%',
    color: 'gray',
    fontSize: 20,
    padding: 4,
  },
});

export default SearchBar;
