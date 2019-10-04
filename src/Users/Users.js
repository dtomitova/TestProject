import React, {Fragment, Component} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import UsersListView from './components/UsersListView';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  state = {
    isLoading: true,
    error: null,
    allUsers: null,
  };

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            allUsers: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  handleUserSelection = userId => {
    this.props.navigation.navigate('UserDetails', {
      userId: userId,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <SafeAreaView>
        <UsersListView
          usersDataSource={this.state.allUsers}
          userSelected={this.handleUserSelection}
        />
      </SafeAreaView>
    );
  }
}

export default UsersScreen;
