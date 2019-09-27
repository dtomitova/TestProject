import React, {Fragment, Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-ionicons';

class TodosScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('username') + "'s Todos",
    };
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
    const userTodosUrl =
      'https://jsonplaceholder.typicode.com/todos?userId=' + userId;

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
    if (this.state.isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            style={styles.usersList}
            data={this.state.dataSourceTodos}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  backgroundColor: 'lightblue',
                  margin: 4,
                }}>
                <Text style={[styles.userItem, styles.todoItem]}>
                  {item.title}
                </Text>
                <Icon
                  style={styles.todoCheck}
                  name={item.completed === true ? 'checkmark' : 'close'}
                />
              </View>
            )}
            keyExtractor={({id}, index) => id.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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
  todoItem: {
    width: '90%',
  },
  todoCheck: {
    width: '10%',
    padding: 5,
  },
});

export default TodosScreen;
