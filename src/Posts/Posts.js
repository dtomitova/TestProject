import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {getPosts} from './actions/posts';
import {connect} from 'react-redux';
import SearchBar from './components/searchBar';
import HeaderView from '../globalComponents/Header/headerView';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
} from 'native-base';

class PostsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderView
        leftButtonPressed={() => navigation.goBack()}
        leftIcon="arrow-back"
        headerTitle={navigation.getParam('username') + "'s Posts"}
      />
    ),
  });

  state = {
    searchText: '',
    allPosts: [],
  };

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getPosts(userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({allPosts: this.props.posts});
    }
  }

  renderHeader = post => {
    return (
      <View style={styles.accordionHeader}>
        <Text style={styles.accordionHeaderTitle}>{post.title}</Text>
        <Icon
          style={styles.accordionHeaderArrow}
          name={post.opened ? 'arrow-up' : 'arrow-down'}
        />
      </View>
    );
  };

  renderContent = post => {
    return (
      <View style={styles.accordionContent}>
        <Text>{post.body}</Text>
      </View>
    );
  };

  updateSections = activeSections => {
    const allPosts = this.state.allPosts.map(post => ({
      ...post,
      opened: false,
    }));

    activeSections.forEach(index => {
      allPosts[index] = {...allPosts[index], opened: true};
    });
    this.setState({allPosts});
  };

  getFilteredPosts = () => {
    const trimmedText = this.state.searchText.trimLeft();
    const filteredPosts = this.state.allPosts.filter(
      post =>
        post.title.toLowerCase().includes(trimmedText.toLowerCase()) ||
        post.body.toLowerCase().includes(trimmedText.toLowerCase()),
    );
    return filteredPosts;
  };

  indexesOfOpenedPosts = () =>
    this.getFilteredPosts()
      .map((_, i) => i)
      .filter(i => this.getFilteredPosts()[i].opened);

  render() {
    if (this.props.isLoading) {
      return <ActivityIndicator style={{padding: 60}} />;
    }

    const filteredPosts = this.getFilteredPosts();

    return (
      <SafeAreaView style={{flex: 1}}>
        <SearchBar
          searchText={this.state.searchText}
          handleSearchChange={searchText => this.setState({searchText})}
        />
        <ScrollView contentContainerStyle={styles.containerStartTop}>
          <Accordion
            style={styles.accordion}
            sections={filteredPosts}
            activeSections={this.indexesOfOpenedPosts()}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
            expandMultiple={true}
            underlayColor="white"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: userId => dispatch(getPosts(userId)),
  };
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    isLoading: state.users.isLoading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  containerStartTop: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 5,
  },
  accordion: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 4,
    padding: 5,
    borderRadius: 8,
  },
  accordionContent: {
    fontFamily: 'Avenir',
    padding: 5,
    marginLeft: 20,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 10,
  },
  accordionHeaderTitle: {
    width: '90%',
  },
  accordionHeaderArrow: {
    width: '10%',
    padding: 5,
    fontSize: 20,
  },
  headerTitle: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
