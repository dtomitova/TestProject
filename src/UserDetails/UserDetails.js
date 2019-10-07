import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import RoundedButtonWithTitleAndIcon from '../globalComponents/roundedButtonWithTitleAndIcon';
import {getUserDetails, getIsLoading} from './actions/userDetails';
import {connect} from 'react-redux';

class UserDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
    headerBackTitle: null,
  };

  state = {
    error: null,
  };

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getUserDetails(userId);
    this.props.getIsLoading(true);
  }

  buttonPressedWithTitle = title => {
    this.props.navigation.navigate(title, {
      userId: this.props.userDetails.id,
      username: this.props.userDetails.username,
    });
  };

  render() {
    const {userDetails, isLoading} = this.props;

    if (isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.userDetailsBaseInfoContainer}>
          <Text>{userDetails.name}</Text>
          <Text>{userDetails.username}</Text>
          <Text>{userDetails.company['name']}</Text>
        </View>
        <View style={styles.userDetailsContactsContainer}>
          <Text>{userDetails.phone}</Text>
          <Text>{userDetails.website}</Text>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserDetails: userId => dispatch(getUserDetails(userId)),
    getIsLoading: isLoading => dispatch(getIsLoading(isLoading)),
  };
};

const mapStateToProps = state => {
  return {
    userDetails: state.userDetails.userDetails,
    isLoading: state.userDetails.isLoading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsScreen);

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
