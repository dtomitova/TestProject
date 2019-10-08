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
          <Icon name={leftIcon} />
          <Text>{leftButtonTitle}</Text>
        </Button>
      </Left>
      <Body style={styles.headerTitle}>
        <Title>{headerTitle}</Title>
      </Body>
      <Right>
        <Button onPress={props.rightButtonPressed} transparent>
          <Icon name={rightIcon} />
          <Text>{rightButtonTitle}</Text>
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
});
