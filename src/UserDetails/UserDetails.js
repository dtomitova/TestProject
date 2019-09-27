import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

class UserDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
    headerBackTitle: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: true,
      dataSourceUserDetails: null,
    };
  }

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
            dataSourceUserDetails: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.userDetailsBaseInfoContainer}>
          <Text>{this.state.dataSourceUserDetails.name}</Text>
          <Text>{this.state.dataSourceUserDetails.username}</Text>
          <Text>{this.state.dataSourceUserDetails.company['name']}</Text>
        </View>
        <View style={styles.userDetailsContactsContainer}>
          <Text>{this.state.dataSourceUserDetails.phone}</Text>
          <Text>{this.state.dataSourceUserDetails.website}</Text>
        </View>
        <View style={styles.userDetailsButtonsContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Posts', {
                userId: this.state.dataSourceUserDetails.id,
                username: this.state.dataSourceUserDetails.username,
              })
            }>
            <Text style={styles.userItem}> Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Todos', {
                userId: this.state.dataSourceUserDetails.id,
                username: this.state.dataSourceUserDetails.username,
              })
            }>
            <Text style={styles.userItem}>Todos</Text>
          </TouchableOpacity>
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
  containerStartTop: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userItem: {
    fontFamily: 'Avenir',
    backgroundColor: 'lightblue',
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 4,
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
