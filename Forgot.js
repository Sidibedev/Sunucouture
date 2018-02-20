import React, { Component } from 'react';
import { Container, StyleProvider ,  Header,Left,Icon, Text , Title ,Content, Body, Form, Item, Input, Label ,Button } from 'native-base';
import {StyleSheet , TextInput, View} from 'react-native'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import firebase from 'firebase'
import Right from './native-base-theme/components/Right';



export default class Forgot extends Component {
    state = { email: ''};
    reset () {

        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(() => { 
            alert('merci de verifier votre boite mail pour un nouveau mot de passe')
            this.props.navigation.navigate("Connexion")
          }).catch( () => {

            alert('Email incorrecte , verifiez bien')
          }


          )


    }
  render() {
    return (

      
    <StyleProvider style={getTheme(platform)}>
      <Container>
      <Header />

        <Content>


        <TextInput style = {{width:'100%' , height:'50%' , marginLeft:5}}
        underlineColorAndroid ='transparent'
        placeholder = "Entrer votre email "
        placeholderTextColor = "#F77062"
        autoCapitalize = "none"
        onChangeText={email => this.setState({ email })} />

          <Button style={styles.button}  onPress={this.reset.bind(this)}>
                    
                <Text style={styles.text}> Envoyer </Text>
        
         </Button>
         
        </Content>
      </Container>
      </StyleProvider>
      
    );
  }

}

const styles  = StyleSheet.create({
    container : {
        flex : 1 ,
        justifyContent:'center',
        alignItems : 'center',
        backgroundColor: '#F77062'
    },
     connectezVous :{
      
        marginTop:30,
        fontSize: 30,
        fontWeight: "bold",
       
        textAlign: "center",
        color: "#ffffff"
    },
    authentification : {
   
	marginTop : 100,
	fontSize: 15,
	fontWeight: "bold",
	letterSpacing: 0.5,
	textAlign: "center",
	color: "#ffffff"
    },
    button: {
        marginTop:15,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#FFFFFF',   // White colored border
        paddingHorizontal: 100,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"#F77062",
        alignSelf:'center'
         
      },
      google: {
        marginTop:15,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: 'red',   // White colored border
        paddingHorizontal: 122,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"red",
        alignSelf:'center'
         
      },
      facebook: {
        marginTop:15,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: 'blue',   // White colored border
        paddingHorizontal: 122,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"blue",
        alignSelf:'center'
         
      },
      // Button text
      text: {
        color: 'white',
        
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
})