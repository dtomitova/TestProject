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

class UsersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
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
            ListHeaderComponent={<Text style={styles.title}>Users: </Text>}
            style={styles.usersList}
            data={this.state.dataSource}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UserDetails')}>
                <Text style={styles.userItem}>
                  {item.name}, {item.username}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={({id}, index) => id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

class UserDetailsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Detsils!</Text>
      </View>
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
});

const UsersStack = createStackNavigator({
  Users: {
    screen: UsersScreen,
  },
  UserDetails: {
    screen: UserDetailsScreen,
    navigationOptions: () => ({
      headerBackTitle: 'Users',
    }),
  },
});

const EmptyStack = createStackNavigator({
  Empty: EmptyScreen,
});

const TabNavigator = createBottomTabNavigator({
  Users: UsersStack,
  Empty: EmptyStack,
});

export default createAppContainer(TabNavigator);
