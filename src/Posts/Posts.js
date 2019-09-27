import React, {Fragment, Component} from 'react';
import {View, SafeAreaView, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-ionicons';
import { getPosts } from './actions/posts';
import { connect } from 'react-redux';

class PostsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('username') + "'s Posts",
      headerBackTitle: null,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: true,      
      activeSections: [],
      openedPosts: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getPosts(userId);
  }

  renderHeader = section => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'lightblue',
          margin: 4,
        }}>
        <Text style={styles.todoItem}>{section.title}</Text>
        <Icon
          style={styles.todoCheck}
          name={
            this.state.activeSections.filter(
              s => s == section.id - this.props.posts[0].id,
            ).length > 0
              ? 'arrow-up'
              : 'arrow-down'
          }
        />
      </View>
    );
  };

  renderContent = section => {
    return (
      <View style={styles.userItem}>
        <Text>{section.body}</Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({activeSections});
  };

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={{flex: 1, padding: 20}}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.containerStartTop}>
          <Accordion
            style={{justifyContent: 'flex-start', alignItems: 'center'}}
            sections={this.props.posts}
            activeSections={this.state.activeSections}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
            expandMultiple="true"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: userId => dispatch(getPosts(userId))
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);


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
  todoItem: {
    width: '90%',
  },
  todoCheck: {
    width: '10%',
    padding: 5,
  }
});
