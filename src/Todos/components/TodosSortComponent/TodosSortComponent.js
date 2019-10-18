import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MainText from 'common/components/MainText/MainText';
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
} from 'native-base';

const todosSortComponent = props => (
  <Container>
    <Content>
      {props.radioButtonOptions.map((data, key) => {
        return (
          <ListItem key={key}>
            <Left>
              <MainText style={styles.radioButtonTitle}>{data.title}</MainText>
            </Left>
            <Right>
              <Radio
                style={styles.radioButton}
                onPress={() => props.sortOptionChanged(data.value)}
                selectedColor={props.color}
                selected={props.radioValue == data.value}
              />
            </Right>
          </ListItem>
        );
      })}
      <View style={styles.cancelSaveButtonsContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => props.saveSortOption(true)}>
          <MainText style={styles.textCancelSaveButtons}>Save</MainText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => props.saveSortOption(false)}>
          <MainText style={styles.textCancelSaveButtons}>Cancel</MainText>
        </TouchableOpacity>
      </View>
    </Content>
  </Container>
);

export default todosSortComponent;

const styles = StyleSheet.create({
  cancelSaveButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 30,
  },
  cancelButton: {
    width: '50%',
  },
  saveButton: {
    width: '50%',
  },
  textCancelSaveButtons: {
    textAlign: 'center',
    fontSize: 16,
  },
  radioButtonTitle: {
    fontSize: 14,
  },
  radioButton: {
    width: 40,
    height: 30,
    paddingLeft: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
