import React, {Component} from 'react';
import {getTodos, setSortOption} from './actions/todos';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import HeaderView from '../common/components/Header/HeaderView';
import Modal from 'react-native-modal';
import TodosSortComponent from './components/TodosSortComponent/TodosSortComponent';
import ListItemWithTitleAndIcon from './components/ListItemWithTitleAndIcon/ListItemWithTitleAndIcon';

class TodosScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderView
        leftButtonPressed={() => navigation.goBack()}
        leftIcon="arrow-back"
        leftButtonTitle="Details"
        headerTitle={navigation.getParam('username') + "'s Todos"}
        rightButtonPressed={navigation.state.params.headerRightButtonPressed}
        rightButtonTitle="Sort"
      />
    ),
  });

  state = {
    isModalVisible: false,
    currentRadioValue: 'default',
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setParams({headerRightButtonPressed: this.sortButtonPressed});
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getTodos(userId);
  }

  sortButtonPressed = () => {
    this.setState({isModalVisible: true});
  };

  handleSortOptionChanged = currentRadioValue => {
    this.setState({currentRadioValue});
  };

  handleSaveSortOption = shouldSave => {
    if (shouldSave === true) {
      this.props.setSortOption(this.state.currentRadioValue);
    } else {
      this.state.currentRadioValue = this.props.sortOption;
    }
    this.setState({isModalVisible: false});
  };

  render() {
    const {currentRadioValue} = this.state;
    const {sortOption, isLoading, todos, sortOptions} = this.props;

    if (isLoading) {
      return <ActivityIndicator style={{padding: 20}} />;
    }

    sortAppliedMessage = null;
    if (sortOption !== 'default' || !sortOption)
      sortAppliedMessage = (
        <Text style={styles.sortAplliedMessage}>
          Todos sorted by:{' '}
          {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
        </Text>
      );

    return (
      <SafeAreaView>
        {sortAppliedMessage}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{height: '50%'}}>
            <TodosSortComponent
              style={{height: 200}}
              color="black"
              radioButtonOptions={sortOptions}
              radioValue={currentRadioValue}
              sortOptionChanged={this.handleSortOptionChanged}
              saveSortOption={this.handleSaveSortOption}
            />
          </View>
        </Modal>
        <FlatList
          style={styles.todosList}
          data={todos}
          renderItem={({item}) => (
            <ListItemWithTitleAndIcon renderItem={item} />
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
    setIsLoading: isLoading => dispatch(setIsLoading(isLoading)),
    setSortOption: sortOption => dispatch(setSortOption(sortOption)),
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
  sortAplliedMessage: {
    fontFamily: 'Avenir',
    fontSize: 15,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
