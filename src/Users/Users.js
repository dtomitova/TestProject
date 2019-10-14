import React, {Fragment, Component} from 'react';
import {ActivityIndicator, View, FlatList, StyleSheet} from 'react-native';
import ListItemWithTitle from './components/ListItemWithTitle/ListItemWithTitle';
import {getUsers} from './actions/users';
import {connect} from 'react-redux';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import HeaderView from '../common/components/Header/headerView';

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
      <FlatList
        style={styles.usersList}
        data={this.props.users}
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
