
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from 'react-native';

import Frisbee from 'frisbee';
import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios'
import {Button} from 'native-base'
// const Nexmo = require('nexmo')

// const nexmo = new Nexmo({
//   apiKey:'6b519e2c' ,
//   apiSecret: 'b44648506bda0c24'
// })
const api = new Frisbee({
  baseURI: 'https://rest.nexmo.com/sms/json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

// if you want to customize the country picker
const countryPickerCustomStyles = {};

// your brand's theme primary color
const brandColor = '#F77062';

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    paddingLeft : 40,
    flex: 1,
    fontSize: 20,
    color: brandColor
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: brandColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: brandColor,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  }
});

export default class Phone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numero : '',
      spinner: false,
      country: {
        cca2: 'SN',
        callingCode: '221'
      }
    };
  }

  _renderFooter = () => {

    
      return (
        <View>
          <Button transparent warning>
           <Text> Mauvais numero ?  m'envoyer un nouveau code . </Text>
          </Button>
        </View>
      );

    

  }


  _renderCallingCode = () => {

    return (
      <View />
    );

  }

  submit(){
    
    if(this.state.numero == this.props.navigation.state.params.verif) {
        
        Alert.alert('Bingo !', "C'est le bon", [{
            text: 'ok',
            onPress: () => this.props.navigation.navigate("Menuprincipal")
     }]);
     
    }else {

        alert('OOPS ! Mauvais code')
    }
     
        
    
   
  }

  render() {

    
    return (

      <View style={styles.container}>

        <Text style={styles.header}>Entrer votre code de confirmation</Text>

        <Form ref={'form'} style={styles.form}>

          <View style={{ flexDirection: 'row' }}>
  
         

            <TextInput
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this._onChangeText}
              placeholder='__ __ __ __ __ __ __ __ ' 
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              style={[ styles.textInput]}
              returnKeyType='go'
              autoFocus
              placeholderTextColor={brandColor}
              selectionColor={brandColor}
              onChangeText={numero => this.setState({ numero })}
              onSubmitEditing={this.submit.bind(this)} />

          </View>

          <TouchableOpacity style={styles.button} onPress={this.submit.bind(this)}>
            <Text style={styles.buttonText}>Verifier</Text>
          </TouchableOpacity>

          {this._renderFooter()}

        </Form>



        

        <Spinner
          visible={this.state.spinner}
          textContent={'Un moment ....'}
          style={{ color: '#fff' }} />

      </View>

    );
  }
}
