import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {getUserDetails} from './actions/userDetails';
import {connect} from 'react-redux';
import UserDetailsComponent from './components/UserDetailsComponent';
import HeaderView from '../common/components/Header/HeaderView';
import ErrorView from '../common/components/ErrorView/ErrorView';

class UserDetailsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderView
        onLeftButtonPressed={() => navigation.goBack()}
        leftIcon="arrow-back"
        headerTitle="Details"
      />
    ),
  });

  componentDidMount() {
    const {navigation} = this.props;
    const userId = navigation.getParam('userId', 'NO-ID');
    this.props.getUserDetails(userId);
  }

  buttonPressed = title => {
    this.props.navigation.navigate(title, {
      userId: this.props.userDetails.id,
      username: this.props.userDetails.username,
    });
  };

  render() {
    const {userDetails, error, isLoading} = this.props;

    if (error) {
      return (
        <ErrorView
          errorMessage={error.message}
          onTryAgainBtnPressed={this.handleTryAgainBtnPressed}
        />
      );
    }
    if (isLoading || !userDetails) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <UserDetailsComponent
        onButtonPressed={this.buttonPressed}
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
    error: state.userDetails.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsScreen);
