import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store/ReduxStore'
import { asyncAddMenuItem, MenuItem } from '../../store/slices/MenuItems'
import EditButton from '../../components/staff/EditButton'
import { useNavigation } from '@react-navigation/native'
import { FUNCTIONS } from '../../constants/Functions'
import { TEXTS } from '../../constants/Texts'
import { LAYOUTS } from '../../constants/Layouts'

import SelectDropdown from 'react-native-select-dropdown'

const CreateItemScreen: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const [item, setItem] = useState('Enter name')
  const [doEditItem, setDoEditItem] = useState(false)

  const [price, setPrice] = useState(0)
  const [doEditPrice, setDoEditPrice] = useState(false)

  const [validName, setValidName] = useState(true)
  const [validPrice, setValidPrice] = useState(true)
  const [disabled, setDisabled] = useState(false)

  const [description, setDescription] = useState('')
  const [doEditDescription, setDoEditDescription] = useState(false)

  const [selected, setSelected] = useState<MenuItem['foodType']>('FOOD');

  const data = ['FOOD', 'DRINK', 'DESSERT']

  const { currentUser } = useAppSelector((state) => state.currentUser)

  const handleEditItem = (text) => {
    setItem(text)
    setDoEditItem(false)
  }

  const handleEditDescription = (text) => {
    setDescription(text)
    setDoEditDescription(false)
  }

  const handleEditPrice = (text) => {
    const parsed_text = Number(text.replace(/[^0-9]/g, ''))
    setPrice(parsed_text)
    setDoEditPrice(false)
  }

  const handleCreate = async () => {
    setDisabled(true)
    if (!currentUser) {
      setDisabled(false)
      throw new Error('currentUser not found')
    }
    let exitEarly = false
    if (!(item.length >= 2 && item.length <= 26 && item != 'Enter name')) {
      setValidName(false)
      exitEarly = true
    } else {
      setValidName(true)
    }
    if (!(price >= 50 && price <= 2000)) {
      setValidPrice(false)
      exitEarly = true
    } else {
      setValidPrice(true)
    }
    if (exitEarly) {
      setDisabled(false)
      return
    }

    console.log(selected)
    
    const buffer: MenuItem = {
      item: item,
      college: currentUser.college,
      price: price,
      isActive: true,
      foodType: selected,
      description: description,
    }

    dispatch(asyncAddMenuItem(buffer)).then((success: boolean) => {
      if (success) {
        navigation.goBack()
      } else {
        Alert.alert('Please connect to the internet and try again')
        setDisabled(false)
      }
    })
  }

  const getEditItemVisual = () => {
    if (doEditItem) {
      return (
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
      )
    } else {
      return (
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
      )
    }
  }

  const getEditPriceVisual = () => {
    if (doEditPrice) {
      return (
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
      )
    } else {
      return (
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
      )
    }
  }

  const getEditDescriptionVisual = () => {
    if (doEditDescription) {
      return (
        <TextInput
          multiline={false}
          style={styles.inputTitleSingle}
          autoCorrect={false}
          autoFocus={true}
          onBlur={() => setDoEditDescription(false)}
          onSubmitEditing={(event) => {
            handleEditDescription(event.nativeEvent.text)
          }}
        />
      )
    } else {
      return (
        <View style={styles.inputContainer}>
          <View style={styles.inputString}>
            <Text style={styles.titleText}>{description}</Text>
          </View>
          <EditButton
            size={LAYOUTS.getWidth(18)}
            top={LAYOUTS.getWidth(-3.5)}
            right={LAYOUTS.getWidth(8)}
            action={() => {
              setDoEditDescription(true)
            }}
          />
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tag}>
          <Text style={styles.labelText}>Item:</Text>
          {getEditItemVisual()}
        </View>
        {!validName && <Text style={styles.error}>Name must be between 3 and 25 characters</Text>}
        <View style={styles.tag}>
          <Text style={styles.labelText}>Price:</Text>
          {getEditPriceVisual()}
        </View>
        {!validPrice && <Text style={styles.error}>Price must be at between $0.50 and $20.00</Text>}
        <View style={styles.tag}>
          <Text style={styles.labelText}>Description:</Text>
          {getEditDescriptionVisual()}
        </View>
        <View style={[styles.tag]}>
          <Text style={styles.labelText}>Item Type:</Text>
          <View style={{ marginLeft: 'auto' , borderRadius: 8 }}>
            <SelectDropdown
              data={data}
              defaultValue={'FOOD'}
              onSelect={(selectedItem, index) => {
                setSelected(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              selectedRowStyle={{ backgroundColor: '#bbb' }}
              buttonTextStyle={styles.text}
              buttonStyle={{ borderRadius: 8, backgroundColor: 'orange'}}
            />
          </View>
        </View>
        <View style={styles.buttonHolder}>
          <TouchableOpacity
            style={{ ...styles.saveButton, marginBottom: LAYOUTS.getWidth(30) }}
            onPress={handleCreate}
            disabled={disabled}
          >
            <Text style={{ ...styles.buttonText }}>Submit item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateItemScreen

const styles = StyleSheet.create({
  text: {
    color: 'white', 
    fontFamily: 'HindSiliguri-Bold', 
    fontSize: 18, 
  },
  error: {
    color: '#bb3333',
    fontFamily: 'HindSiliguri',
    fontSize: 11,
  },
  saveButton: {
    fontSize: 20,
    width: LAYOUTS.getWidth(160),
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: LAYOUTS.getWidth(10),
    marginTop: LAYOUTS.getWidth(10),
    backgroundColor: 'green',
    padding: 15,
  },
  button: {
    width: LAYOUTS.getWidth(150),
    height: LAYOUTS.getWidth(20),
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: TEXTS.adjust(16),
    fontWeight: '300',
    fontFamily:  'HindSiliguri-Bolder',
    textAlign: 'center',
    color: 'white',
  },
  buttonHolder: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
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
  typeButton: {
    padding: 20,
    alignSelf: 'flex-end',
    shadowColor: '#000',
  },
  pressed: {
    backgroundColor: 'blue',
  },
  notPressed: {
    backgroundColor: 'white',
  }
})
