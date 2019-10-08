import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from 'native-base';

const userDetailsComponent = props => {
  const {user} = props;
  return (
    <View style={styles.container}>
      <View style={styles.baseInfoContainer}>
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
        <Text>{user.company['name']}</Text>
      </View>
      <View style={styles.contactsContainer}>
        <Text>{user.phone}</Text>
        <Text>{user.website}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          onPress={() => props.postsPressed('Todos')}
          iconRight
          rounded
          light>
          <Text>Todos</Text>
          <Icon name="arrow-forward" />
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.postsPressed('Posts')}
          iconRight
          rounded
          light>
          <Text>Posts</Text>
          <Icon name="arrow-forward" />
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  baseInfoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    padding: 15,
  },
  contactsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '5%',
  },
  buttonsContainer: {
    justifyContent: 'flex-start',
    height: '80%',
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 5,
    backgroundColor: 'lightblue',
  },
});

export default userDetailsComponent;
