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
} from 'native-base';
import MainText from 'common/components/MainText/MainText';
import Constants from 'common/Constants';

const HeaderView = props => {
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
        <Button transparent onPress={props.onLeftButtonPressed}>
          <Icon style={styles.iconButton} name={leftIcon} />
          <MainText style={styles.headerButton}>{leftButtonTitle}</MainText>
        </Button>
      </Left>
      <Body style={styles.headerTitleContainer}>
        <MainText>
          <Title style={styles.headerTitle}>{headerTitle}</Title>
        </MainText>
      </Body>
      <Right>
        <Button onPress={props.onRightButtonPressed} transparent>
          <Icon style={styles.iconButton} name={rightIcon} />
          <MainText style={styles.headerButton}>{rightButtonTitle}</MainText>
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderView;

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Constants.HEADER_FONT_SIZE,
  },
  headerButton: {
    color: 'grey',
  },
  iconButton: {
    color: 'grey',
  },
});
