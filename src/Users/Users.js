import React, {Fragment, Component} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import UsersListView from './components/UsersListView';
import {getUsers} from './actions/users';
import {connect} from 'react-redux';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  state = {
    isLoading: true,
    error: null,
    allUsers: [],
  };

  componentDidMount() {
    this.props.getUsers;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({allUsers: this.props.users});
    }
  }

  handleUserSelection = userId => {
    this.props.navigation.navigate('UserDetails', {
      userId: userId,
    });
  };

  render() {
    // if (this.state.isLoading) {
    //   return <ActivityIndicator style={{padding: 20}} />;
    // }

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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers: dispatch(getUsers),
  };
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
