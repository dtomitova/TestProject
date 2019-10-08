import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
} from 'native-base';

const todosFilterComponent = props => (
  <Container>
    <Content>
      {props.radioButtonOptions.map((data, key) => {
        return (
          <ListItem key={key}>
            <Left>
              <Text style={styles.radioButtonTitle}>{data.title}</Text>
            </Left>
            <Right>
              <Radio
                style={styles.radioButton}
                onPress={props.sortOptionChanged.bind(this, data.value)}
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
          onPress={props.saveSortOption.bind(this, true)}>
          <Text style={styles.textCancelSaveButtons}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={props.saveSortOption.bind(this, false)}>
          <Text style={styles.textCancelSaveButtons}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Content>
  </Container>
);

export default todosFilterComponent;

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
