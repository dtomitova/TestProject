import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import Icon from 'react-native-ionicons';

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      dataSource: null,
    };
  }

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  render() {
    //  const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            style={styles.usersList}
            data={this.state.dataSource}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('UserDetails', {
                    userId: item.id,
                  })
                }>
                <Text style={styles.userItem}>
                  {item.name}, {item.username}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={({id}, index) => id.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

class UserDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
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
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
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
            onPress={() => this.props.navigation.navigate('Posts')}>
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

class TodosScreen extends Component {
  static navigationOptions = {
    title: 'Todos',
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: true,
      dataSourceTodos: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    const username = JSON.stringify(navigation.getParam('username', 'NO-ID'));
    const userTodosUrl =
      'https://jsonplaceholder.typicode.com/todos?userId=' + userId;

    this.setState({
      userTodosUrl: userTodosUrl,
    });

    return fetch(userTodosUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSourceTodos: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            style={styles.usersList}
            data={this.state.dataSourceTodos}
            renderItem={({item}) => (
              <View>
                <Text style={styles.userItem}>{item.title}</Text>
                <Icon ios="ios-add" android="md-add" />
              </View>
            )}
            keyExtractor={({id}, index) => id.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

class EmptyScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Empty screen!</Text>
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
  title: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 5,
  },
  usersList: {
    margin: 10,
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

const UsersStack = createStackNavigator(
  {
    Users: UsersScreen,
    UserDetails: UserDetailsScreen,
    Todos: TodosScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'skyblue',
      },
    },
  },
);

const EmptyStack = createStackNavigator({
  Empty: EmptyScreen,
});

const TabNavigator = createBottomTabNavigator({
  Users: UsersStack,
  Empty: EmptyStack,
});

export default createAppContainer(TabNavigator);
