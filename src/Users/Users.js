import React, {Fragment, Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import UsersListView from './components/UsersListView';
import {getUsers} from './actions/users';
import {connect} from 'react-redux';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import HeaderView from '../globalComponents/Header/headerView';

class UsersScreen extends Component {
  static navigationOptions = {
    header: <HeaderView headerTitle="Users" />,
  };

  componentDidMount() {
    this.props.getUsers();
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
      <UsersListView
        usersDataSource={this.props.users}
        userSelected={this.handleUserSelection}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers: () => dispatch(getUsers()),
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
