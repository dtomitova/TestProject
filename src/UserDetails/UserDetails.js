import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import RoundedButtonWithTitleAndIcon from '../globalComponents/roundedButtonWithTitleAndIcon';

class UserDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
    headerBackTitle: null,
  };

  state = {
    error: null,
    isLoading: true,
    user: null,
  };

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    const userDetailsUrl =
      'https://jsonplaceholder.typicode.com/users/' + userId;

    return fetch(userDetailsUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            user: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  buttonPressedWithTitle = title => {
    this.props.navigation.navigate(title, {
      userId: this.state.user.id,
      username: this.state.user.username,
    });
  };

  render() {
    const {user} = this.state;

    if (this.state.isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.userDetailsBaseInfoContainer}>
          <Text>{user.name}</Text>
          <Text>{user.username}</Text>
          <Text>{user.company['name']}</Text>
        </View>
        <View style={styles.userDetailsContactsContainer}>
          <Text>{user.phone}</Text>
          <Text>{user.website}</Text>
        </View>
        <View style={styles.userDetailsButtonsContainer}>
          <RoundedButtonWithTitleAndIcon
            handleButtonPressed={this.buttonPressedWithTitle}
            icon="arrow-round-forward">
            Todos
          </RoundedButtonWithTitleAndIcon>
          <RoundedButtonWithTitleAndIcon
            handleButtonPressed={this.buttonPressedWithTitle}
            icon="arrow-round-forward">
            Posts
          </RoundedButtonWithTitleAndIcon>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  userDetailsBaseInfoContainer: {
    justifyContent: 'space-between',
    height: '15%',
    padding: 15,
  },
  userDetailsContactsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '5%',
  },
  userDetailsButtonsContainer: {
    justifyContent: 'flex-start',
    height: '80%',
  },
});

export default UserDetailsScreen;
