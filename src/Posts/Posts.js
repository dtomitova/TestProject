import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {getPosts} from './actions/posts';
import {connect} from 'react-redux';
import Icon from 'react-native-ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import SearchBar from 'Posts/components/SearchBar';
import HeaderView from '../common/components/Header/HeaderView';
import MainText from '../common/components/MainText/MainText';
import ErrorView from '../common/components/ErrorView/ErrorView';

class PostsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <HeaderView
        onLeftButtonPressed={() => navigation.goBack()}
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
    const userId = navigation.getParam('userId', 'NO-ID');
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
        <MainText style={styles.accordionHeaderTitle}>{post.title}</MainText>
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
        <MainText>{post.body}</MainText>
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
    const {searchText} = this.state;
    const {error, isLoading} = this.props;
    if (isLoading) {
      return <ActivityIndicator style={{padding: 60}} />;
    }
    if (error) {
      return (
        <ErrorView
          errorMessage={error.message}
          onTryAgainBtnPressed={this.handleTryAgainBtnPressed}
        />
      );
    }

    const filteredPosts = this.getFilteredPosts();

    return (
      <View>
        <SearchBar
          searchText={searchText}
          handleSearchChange={searchText => this.setState({searchText})}
        />
        <ScrollView>
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
      </View>
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
    error: state.posts.error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsScreen);

const styles = StyleSheet.create({
  containerStartTop: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
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
});
