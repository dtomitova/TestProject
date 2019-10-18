import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import PostsScreen from './Posts/Posts';
import UsersScreen from './Users/Users';
import TodosScreen from './Todos/Todos';
import UserDetailsScreen from './UserDetails/UserDetails';

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

const TabNavigator = createBottomTabNavigator(
  {
    Users: UsersStack,
    Empty: EmptyStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Users') {
          return <Icon name="people" color={tintColor} />;
        } else {
          return <Icon name="paw" color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'lightblue',
      },
    },
  },
);

const AppNavigator = createAppContainer(TabNavigator);

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default App;
