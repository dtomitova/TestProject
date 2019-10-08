import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import PostsScreen from './Posts/Posts';
import UsersScreen from './Users/Users';
import TodosScreen from './Todos/Todos';
import UserDetailsScreen from './UserDetails/UserDetails';
import configureStore from './configureStore';
import {Provider} from 'react-redux';

class EmptyScreen extends Component {
  render() {
    return (
      <View>
        <Text>Empty screen!</Text>
      </View>
    );
  }
}

const UsersStack = createStackNavigator({
  Users: UsersScreen,
  UserDetails: UserDetailsScreen,
  Todos: TodosScreen,
  Posts: PostsScreen,
});

const EmptyStack = createStackNavigator({
  Empty: EmptyScreen,
});

const TabNavigator = createBottomTabNavigator({
  Users: UsersStack,
  Empty: EmptyStack,
});

class App extends Component {
  render() {
    const AppNavigator = createAppContainer(TabNavigator);
    const store = configureStore();

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
