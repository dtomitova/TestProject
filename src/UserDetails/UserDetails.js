import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {getUserDetails} from './actions/userDetails';
import {connect} from 'react-redux';
import UserDetailsComponent from './components/UserDetailsComponent';
import HeaderView from '../globalComponents/Header/headerView';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
} from 'native-base';

class UserDetailsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderView
        leftButtonPressed={() => navigation.goBack()}
        leftIcon="arrow-back"
        headerTitle="Details"
      />
    ),
  });

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getUserDetails(userId);
  }

  buttonPressedWithTitle = title => {
    this.props.navigation.navigate(title, {
      userId: this.props.userDetails.id,
      username: this.props.userDetails.username,
    });
  };

  render() {
    const {userDetails, isLoading} = this.props;

    if (isLoading || !this.props.userDetails) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <UserDetailsComponent
        postsPressed={this.buttonPressedWithTitle}
        todosPressed={this.buttonPressedWithTitle}
        user={userDetails}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserDetails: userId => dispatch(getUserDetails(userId)),
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
