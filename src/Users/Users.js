import React, {Fragment, Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {getUsers} from 'Users/actions/users';
import {connect} from 'react-redux';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import ListItemWithTitle from 'Users/components/ListItemWithTitle/ListItemWithTitle';
import HeaderView from 'common/components/Header/HeaderView';
import ErrorView from 'common/components/ErrorView/ErrorView';

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

  handleTryAgainBtnPressed = () => {
    this.props.getUsers();
  };

  render() {
    const {users, error, isLoading} = this.props;

    if (isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }
    if (error) {
      return (
        <ErrorView
          errorMessage={error.message}
          onTryAgainBtnPressed={this.handleTryAgainBtnPressed}
        />
      );
    }
    return (
      <FlatList
        style={styles.usersList}
        data={users}
        renderItem={({item}) => (
          <ListItemWithTitle
            renderItem={item}
            onItemSelected={this.handleUserSelection}
          />
        )}
        keyExtractor={({id}) => id.toString()}
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
    error: state.users.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);

const styles = StyleSheet.create({
  usersList: {
    margin: 10,
  },
});
