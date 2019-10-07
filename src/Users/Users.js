import React, {Fragment, Component} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import UsersListView from './components/UsersListView';
import {getUsers, getIsLoading} from './actions/users';
import {connect} from 'react-redux';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  state = {
    error: null,
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getIsLoading(true);
  }

  handleUserSelection = userId => {
    this.props.navigation.navigate('UserDetails', {
      userId: userId,
    });
  };

  render() {
    if (this.props.isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <SafeAreaView>
        <UsersListView
          usersDataSource={this.props.users}
          userSelected={this.handleUserSelection}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers: () => dispatch(getUsers()),
    getIsLoading: isLoading => dispatch(getIsLoading(isLoading)),
  };
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    isLoading: state.users.isLoading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
