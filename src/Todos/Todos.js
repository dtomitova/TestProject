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
import TodosFilterComponent from './components/TodosFilterComponent/TodosFilterComponent';
import {
  getTodos,
  getIsLoading,
  getSortOption,
  getSortOptions,
} from './actions/todos';
import {connect} from 'react-redux';

class TodosScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: navigation.getParam('username') + "'s Todos",
      headerRight: (
        <TouchableOpacity onPress={params.headerRightButtonPressed}>
          <Text style={styles.headerButton}>Sort</Text>
        </TouchableOpacity>
      ),
    };
  };

  state = {
    error: null,
    isModalVisible: false,
    currentRadioValue: 'default',
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setParams({headerRightButtonPressed: this.sortButtonPressed});
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getTodos(userId);
    this.props.getIsLoading(true);
  }

  sortButtonPressed = () => {
    this.setState({isModalVisible: true});
  };

  handleSortOptionChanged = currentRadioValue => {
    this.setState({currentRadioValue});
  };

  handleSaveSortOption = shouldSave => {
    if (shouldSave === true) {
      this.props.getSortOption(this.state.currentRadioValue);
    }
    this.setState({isModalVisible: false});
  };

  render() {
    const {currentRadioValue} = this.state;
    const {sortOption, isLoading, todos, sortOptions} = this.props;

    sortAppliedMessage = null;
    if (sortOption !== 'default' || !sortOption)
      sortAppliedMessage = (
        <Text style={styles.sortAplliedMessage}>
          Todos sorted by:{' '}
          {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
        </Text>
      );

    if (isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        {sortAppliedMessage}
        <Modal isVisible={this.state.isModalVisible}>
          <TodosFilterComponent
            color="black"
            radioButtonOptions={sortOptions}
            radioValue={currentRadioValue}
            sortOptionChanged={this.handleSortOptionChanged}
            saveSortOption={this.handleSaveSortOption}
          />
        </Modal>
        <FlatList
          style={styles.todosList}
          data={todos}
          renderItem={({item}) => (
            <View style={styles.todoItemContainer}>
              <Text style={styles.todoItem}>{item.title}</Text>
              <Icon
                style={styles.todoIcon}
                name={item.completed === true ? 'checkmark' : 'close'}
              />
            </View>
          )}
          keyExtractor={({id}, index) => id.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTodos: userId => dispatch(getTodos(userId)),
    getIsLoading: isLoading => dispatch(getIsLoading(isLoading)),
    getSortOption: sortOption => dispatch(getSortOption(sortOption)),
    getSortOptions: () => dispatch(getSortOptions()),
  };
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    isLoading: state.todos.isLoading,
    sortOption: state.todos.sortOption,
    sortOptions: state.todos.sortOptions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosScreen);

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
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    padding: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
    borderRadius: 4,
  },
  todoItem: {
    width: '90%',
    fontFamily: 'Avenir',
    padding: 5,
  },
  todoIcon: {
    width: '10%',
    padding: 5,
  },
});
