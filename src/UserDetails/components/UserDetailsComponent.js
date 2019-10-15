import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon} from 'native-base';
import MainText from '../../common/components/MainText/MainText';

const POSTS = 'Posts';
const TODOS = 'Todos';

const UserDetailsComponent = props => {
  const {user} = props;
  return (
    <View style={styles.container}>
      <View style={styles.baseInfoContainer}>
        <MainText>{user.name}</MainText>
        <MainText>{user.username}</MainText>
        <MainText>{user.company['name']}</MainText>
      </View>
      <View style={styles.contactsContainer}>
        <MainText>{user.phone}</MainText>
        <MainText>{user.website}</MainText>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          onPress={() => props.onButtonPressed(TODOS)}
          iconRight
          rounded
          light>
          <MainText>{TODOS}</MainText>
          <Icon name="arrow-forward" />
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.onButtonPressed(POSTS)}
          iconRight
          rounded
          light>
          <MainText>{POSTS}</MainText>
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
    paddingLeft: 8,
    backgroundColor: 'lightblue',
  },
});

export default UserDetailsComponent;
