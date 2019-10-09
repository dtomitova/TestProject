import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text,
} from 'native-base';

const headerView = props => {
  const {
    leftIcon,
    leftButtonTitle,
    headerTitle,
    rightButtonTitle,
    rightIcon,
  } = props;

  return (
    <Header>
      <Left>
        <Button transparent onPress={props.leftButtonPressed}>
          <Icon style={styles.iconButton} name={leftIcon} />
          <Text style={styles.headerButton}>{leftButtonTitle}</Text>
        </Button>
      </Left>
      <Body style={styles.headerTitle}>
        <Title>{headerTitle}</Title>
      </Body>
      <Right>
        <Button onPress={props.rightButtonPressed} transparent>
          <Icon style={styles.iconButton} name={rightIcon} />
          <Text style={styles.headerButton}>{rightButtonTitle}</Text>
        </Button>
      </Right>
    </Header>
  );
};

export default headerView;

const styles = StyleSheet.create({
  headerTitle: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerButton: {
    color: 'grey',
  },
  iconButton: {
    color: 'grey',
  },
});
