import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { useAppDispatch } from '../store/TypedHooks'
import { deleteMenuItem, updateMenuItem } from '../store/slices/MenuItems'
import EditButton from '../components/EditButton'
import { useNavigation } from '@react-navigation/native'

import { FUNCTIONS } from '../constants/Functions'
import { TEXTS } from '../constants/Texts'
import { LAYOUTS } from '../constants/Layouts'

const EditItemScreen: React.FC = (props: any) => {
  const navigation = useNavigation()
  props = props.route.params.data
  console.log(props)
  const dispatch = useAppDispatch()

  const [item, setItem] = useState(props.item)
  const [doEditItem, setDoEditItem] = useState(false)

  const [price, setPrice] = useState(props.price)
  const [doEditPrice, setDoEditPrice] = useState(false)

  const [foodType, setFoodType] = useState(props.foodType)
  const [doEditFoodType, setDoEditFoodType] = useState(false)

  const handleEditItem = async (text) => {
    setItem(text)
    setDoEditItem(false)
    dispatch(updateMenuItem({ ...props, item: text }))
  }

  const handleEditPrice = async (text) => {
    const parsed_text = Number(text.replace(/[^0-9]/g, ''))
    setPrice(parsed_text)
    setDoEditPrice(false)
    dispatch(updateMenuItem({ ...props, price: parsed_text }))
  }

  const handleEditFoodType = async (text) => {
    setFoodType(text)
    setDoEditFoodType(false)
    dispatch(updateMenuItem({ ...props, foodType: text }))
  }

  const handleDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this product? This can not be undone', [
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteMenuItem(props))
          navigation.goBack()
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Delete canceled')
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tag}>
          <Text style={styles.labelText}>Item:</Text>
          {doEditItem ? (
            <TextInput
              multiline={false}
              style={styles.inputTitleSingle}
              autoCorrect={false}
              autoFocus={true}
              onBlur={() => setDoEditItem(false)}
              onSubmitEditing={(event) => {
                handleEditItem(event.nativeEvent.text)
              }}
            />
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.inputString}>
                <Text style={styles.titleText}>{item}</Text>
              </View>
              <EditButton
                size={LAYOUTS.getWidth(18)}
                top={LAYOUTS.getWidth(-3.5)}
                right={LAYOUTS.getWidth(8)}
                action={() => {
                  setDoEditItem(true)
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.tag}>
          <Text style={styles.labelText}>Price:</Text>
          {doEditPrice ? (
            <TextInput
              multiline={false}
              style={styles.inputTitleSingle}
              autoCorrect={false}
              autoFocus={true}
              onBlur={() => setDoEditPrice(false)}
              onSubmitEditing={(event) => {
                handleEditPrice(event.nativeEvent.text)
              }}
            />
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.inputString}>
                <Text style={styles.titleText}>{FUNCTIONS.priceFormat(price)}</Text>
              </View>
              <EditButton
                size={LAYOUTS.getWidth(18)}
                top={LAYOUTS.getWidth(-3.5)}
                right={LAYOUTS.getWidth(8)}
                action={() => {
                  setDoEditPrice(true)
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.tag}>
          <Text style={styles.labelText}>Food type:</Text>
          {doEditFoodType ? (
            <TextInput
              multiline={false}
              style={styles.inputTitleSingle}
              autoCorrect={false}
              autoFocus={true}
              onBlur={() => setDoEditFoodType(false)}
              onSubmitEditing={(event) => {
                handleEditFoodType(event.nativeEvent.text)
              }}
            />
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.inputString}>
                <Text style={styles.titleText}>{foodType}</Text>
              </View>
              <EditButton
                size={LAYOUTS.getWidth(18)}
                top={LAYOUTS.getWidth(-3.5)}
                right={LAYOUTS.getWidth(8)}
                action={() => {
                  setDoEditFoodType(true)
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.buttonHolder}>
          <TouchableOpacity style={{ ...styles.button, marginBottom: LAYOUTS.getWidth(30) }} onPress={handleDelete}>
            <Text style={{ ...styles.buttonText }}>Delete item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default EditItemScreen

const styles = StyleSheet.create({
  button: {
    width: LAYOUTS.getWidth(150),
    height: LAYOUTS.getWidth(20),
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: LAYOUTS.getWidth(10),
    marginTop: LAYOUTS.getWidth(5),
  },
  buttonText: {
    fontSize: TEXTS.adjust(15),
    fontWeight: '400',
    color: 'blue',
    textAlign: 'center',
  },
  buttonHolder: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    paddingBottom: -40,
  },
  inputContainer: {
    flex: 1,
  },
  hiddenContainer: {
    flex: 1,
    marginLeft: LAYOUTS.getWidth(10),
  },
  inputString: {
    flex: 1,
    paddingRight: LAYOUTS.getWidth(40),
  },
  inputHidden: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    paddingTop: LAYOUTS.getWidth(10),
    paddingHorizontal: LAYOUTS.getWidth(10),
    flex: 1,
  },
  tag: {
    borderRadius: 5,
    paddingVertical: LAYOUTS.getWidth(10),
    paddingLeft: LAYOUTS.getWidth(7),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUTS.getWidth(5),
  },
  labelText: {
    fontSize: TEXTS.adjust(15),
    fontWeight: '600',
    marginRight: LAYOUTS.getWidth(3),
    flexWrap: 'wrap',
  },
  inputTitle: {
    fontWeight: '300',
    fontSize: TEXTS.adjust(15),
    color: 'blue',
    flexWrap: 'wrap',
    width: LAYOUTS.getWidth(210),
    paddingBottom: LAYOUTS.getWidth(3.5),
  },
  inputTitleSingle: {
    fontWeight: '300',
    fontSize: TEXTS.adjust(15),
    color: 'black',
    flexWrap: 'wrap',
    width: LAYOUTS.getWidth(210),
    paddingVertical: LAYOUTS.getWidth(3.5),
  },
  titleText: {
    fontSize: TEXTS.adjust(15),
    fontWeight: '300',
    flexWrap: 'wrap',
    paddingVertical: LAYOUTS.getWidth(3.5),
  },
  hiddenText: {
    fontSize: TEXTS.adjust(15),
    fontWeight: '400',
    paddingVertical: LAYOUTS.getWidth(3.5),
    paddingHorizontal: LAYOUTS.getWidth(6),
  },
  imageStyle: {
    height: LAYOUTS.getWidth(180),
    width: LAYOUTS.getWidth(180),
    borderRadius: 5,
    marginRight: LAYOUTS.getWidth(8),
    marginLeft: LAYOUTS.getWidth(8),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: LAYOUTS.getWidth(110),
    paddingBottom: LAYOUTS.getWidth(8),
    width: LAYOUTS.getWidth(190),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    height: LAYOUTS.getWidth(32),
    width: LAYOUTS.getWidth(170),
    elevation: 2,
    justifyContent: 'center',
    marginTop: LAYOUTS.getWidth(5),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: TEXTS.adjust(14),
  },
  modalText: {
    fontWeight: '600',
    fontSize: TEXTS.adjust(14),
    color: 'red',
    marginTop: LAYOUTS.getWidth(10),
  },
  addCategory: {
    //borderWidth: 2,
    marginLeft: LAYOUTS.getWidth(40),
    marginRight: LAYOUTS.getWidth(30),
    alignItems: 'center',
    marginBottom: LAYOUTS.getWidth(12),
  },
  XButton: {
    position: 'absolute',
    left: LAYOUTS.getWidth(1),
    top: LAYOUTS.getWidth(9.2),
  },
  XText: {
    fontWeight: '600',
    fontSize: 20,
  },
})
