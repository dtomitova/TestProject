import React, {Fragment, Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';

class PostsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('username') + "'s Posts",
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: true,
      dataSourcePosts: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const userId = JSON.stringify(navigation.getParam('userId', 'NO-ID'));
    const userPostsUrl =
      'https://jsonplaceholder.typicode.com/posts?userId=' + userId;

    return fetch(userPostsUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSourcePosts: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        this.setState({error, isLoading: false});
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            style={styles.usersList}
            data={this.state.dataSourcePosts}
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
              </View>
            )}
            keyExtractor={({id}, index) => id.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default PostsScreen;
