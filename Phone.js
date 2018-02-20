
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
      code : '',
      spinner: false,
      country: {
        cca2: 'SN',
        callingCode: '221'
      }
    };
  }

  componentDidMount(){

    this.setState({code : Math.floor(1000 + Math.random() * 9000)})
  }

  _renderCallingCode = () => {

    return (
      <View style={styles.callingCodeView}>
        <Text style={styles.callingCodeText}>+221</Text>
      </View>
    );

  }

  submit(){
    
    var _this = this
    axios.post('https://rest.nexmo.com/sms/json', {
        "api_key" : "fa5f48d7" ,
        "api_secret" : "ae71503aaf8687e1",
        "to" : '221'+this.state.numero,
        "from" : "SUNUCOUTURE",
        "text" : "Bonjour , voici votre code :"+this.state.code
    })
    .then(function (response) {
        
        Alert.alert('Envoyé !', "Un message avec votre code a été envoyé.", [{
            text: 'OK',
            onPress: () => _this.props.navigation.navigate("Phoneverif" , {verif : _this.state.code})
     }]);



 
    
     
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    
    return (

      <View style={styles.container}>

        <Text style={styles.header}>Entrer votre numero de telephone</Text>

        <Form ref={'form'} style={styles.form}>

          <View style={{ flexDirection: 'row' }}>

          {this._renderCallingCode()}

            <TextInput
              type={'TextInput'}
              underlineColorAndroid={'transparent'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this._onChangeText}
              placeholder='Numero de telephone'
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
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>

          

        </Form>

        <View style={{flex:1}}>
        <Text style={styles.disclaimerText}>En tapant "Envoyer le code de confirmation" ci-dessus, nous vous enverrons un SMS pour confirmer votre numéro de téléphone. Message et les débits de données peuvent s'appliquer.</Text>
        </View>

        <Spinner
          visible={this.state.spinner}
          textContent={'Un moment ....'}
          style={{ color: '#fff' }} />

      </View>

    );
  }
}
