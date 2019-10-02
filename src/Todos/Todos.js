import React, {Fragment, Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import Icon from 'react-native-ionicons';
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
} from 'native-base';
import Modal from 'react-native-modal';
import TodosFilterComponent from './TodosFilterComponent/TodosFilterComponent';

class TodosScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam('username') + "'s Todos",
      headerRight: (
        <TouchableOpacity onPress={params.handleSave}>
          <Text style={styles.headerButton}>Sort</Text>
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: true,
      dataSourceTodos: null,
      dataSourceTodosDefault: null,
      isModalVisible: false,
      radioValue: 'default',
      currentSortOption: 'default',
      filterOptions: [
        {title: 'Default', value: 'default'},
        {title: 'Name', value: 'name'},
        {title: 'Completion', value: 'completion'},
      ],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setParams({handleSave: this.handleSortButtonPressed});
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
            dataSourceTodosDefault: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  handleSortButtonPressed = () => {
    this.setState({isModalVisible: true});
  };

  handleSortOptionChanged = sortOptionValue => {
    this.setState({currentSortOption: sortOptionValue});
  };

  handleSaveSortOption = shouldSave => {
    if (shouldSave === true) {
      this.setState({radioValue: this.state.currentSortOption});
    } else {
      this.setState({currentSortOption: this.state.radioValue});
    }
    this.setState({isModalVisible: false});

    switch (this.state.currentSortOption) {
      case 'default':
        {
          this.setState({dataSourceTodos: this.state.dataSourceTodosDefault});
        }
        break;
      case 'name':
        {
          const todosSortedByName = []
            .concat(this.state.dataSourceTodos)
            .sort((a, b) => a.title > b.title);
          this.setState({dataSourceTodos: todosSortedByName});
        }
        break;
      case 'completion':
        {
          const todosSortedByCompletion = []
            .concat(this.state.dataSourceTodos)
            .sort((a, b) => a.completed > b.completed);
          this.setState({dataSourceTodos: todosSortedByCompletion});
        }
        break;
      default:
    }
  };

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    sortAppliedMessage = null;
    if (this.state.currentSortOption !== 'default')
      sortAppliedMessage = (
        <Text style={styles.sortAplliedMessage}>
          Todos sorted by:{' '}
          {this.state.currentSortOption.charAt(0).toUpperCase() +
            this.state.currentSortOption.slice(1)}
        </Text>
      );

    return (
      <SafeAreaView style={{flex: 1}}>
        {sortAppliedMessage}
        <View style={styles.container}>
          <Modal isVisible={this.state.isModalVisible}>
            <TodosFilterComponent
              filterOptions={this.state.filterOptions}
              radioValue={this.state.currentSortOption}
              sortOptionChanged={this.handleSortOptionChanged}
              saveSortOption={this.handleSaveSortOption}
            />
          </Modal>
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
  headerButton: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  sortAplliedMessage: {
    fontFamily: 'Avenir',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
  },
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
  modalSortContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

export default TodosScreen;
