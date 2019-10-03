import React, {Fragment, Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-ionicons';
import {getPosts} from './actions/posts';
import {connect} from 'react-redux';
import SearchBar from './components/searchBar';

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
      filteredActiveSections: null,
      filteredPosts: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    this.props.getPosts(userId);
  }

  renderHeader = section => {
    return (
      <View style={styles.accordionHeader}>
        <Text style={styles.accordionHeaderTitle}>{section.title}</Text>
        <Icon
          style={styles.accordionHeaderArrow}
          name={
            (this.state.filteredActiveSections
              ? this.state.filteredActiveSections
              : this.state.activeSections
            ).filter(s => s == section.id - this.props.posts[0].id).length > 0
              ? 'arrow-up'
              : 'arrow-down'
          }
        />
      </View>
    );
  };

  renderContent = section => {
    return (
      <View style={styles.accordionContent}>
        <Text>{section.body}</Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({activeSections: activeSections});
  };

  searchInputChanged = event => {
    if (!event) {
      this.setState({currentInputText: null});
      this.setState({filteredPosts: null});
      this.setState({filteredActiveSections: null});
      return;
    }

    const {text} = event.nativeEvent;
    const trimmedText = text.trimLeft();
    this.setState({currentInputText: trimmedText});

    const filtered = this.props.posts.filter(post => {
      return (
        post.title.toLowerCase().includes(trimmedText.toLowerCase()) ||
        post.body.toLowerCase().includes(trimmedText.toLowerCase())
      );
    });
    this.setState({filteredPosts: filtered});

    if (filtered) {
      const filteredActive = filtered.filter(post =>
        this.state.activeSections.includes(post),
      );
      this.setState({filteredActiveSections: filteredActive});
    } else {
      this.setState({filteredActiveSections: null});
    }
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
        <SearchBar handleSearchInputChanged={this.searchInputChanged} />
        <View style={styles.containerStartTop}>
          <Accordion
            style={styles.accordion}
            sections={
              this.state.filteredPosts !== null
                ? this.state.filteredPosts
                : this.props.posts
            }
            activeSections={this.state.activeSections}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
            expandMultiple="true"
            underlayColor="white"
          />
        </View>
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
});
