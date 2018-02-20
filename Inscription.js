'use strict';
import React, { Component } from 'react';
import {View ,Text,ImageBackground, StyleSheet,StatusBar,Image , Spinner , TextInput, TouchableOpacity} from 'react-native'
import {Button , Card , CardItem,Form ,Item,Input, Label, Body , Container , Content , Header} from 'native-base'

import firebase from 'firebase'
import Connexion from './Connexion'
import FirebaseConfig from './FirebaseConfig'
import ElevatedView from 'react-native-elevated-view'
import axios from 'axios'
import {LoginManager , AccessToken} from 'react-native-fbsdk'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

export default class Inscription extends Component {

   
    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
      }

      async  logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1551784921556987', {
            permissions: ['public_profile'],
          });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`);
          Alert.alert(
            'Logged in!',
            `Hi ${(await response.json()).name}!`,

          );
          this.props.navigation.navigate("Menuprincipal")

        }
      }

      async  signInWithGoogleAsync() {
        try {
          const result = await Expo.Google.logInAsync({
           // androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '839829875428-nevh5l5r54ccg4lra6vnecjhehv01ijo.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              alert(result.user.name)
           this.props.navigation.navigate("Menuprincipal")
            return result.accessToken;
          } else {
            return {cancelled: true};
          }
        } catch(e) {
          return {error: true};
        }
      }

      state = { email: '', password: '', verifypassword:'' , error: '', loading: false };

      
      onsignupPress() {
          this.setState({ error: '', loading: true });
  
          const { email, password , verifypassword } = this.state;
          if(verifypassword == password) {


            firebase.auth()
       .createUserWithEmailAndPassword(email, password)
       .then(function(user){
           if(user && user.emailVerified === false){
           user.sendEmailVerification().then(function(){
           alert("FELICITATION VOTRE COMPTE A ETE CREE AVEC SUCCES , UN MAIL VOUS A ETE ENVOYER POUR VALIDER VOTRE COMPTE");
           axios.post('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs', {
            "email": ""+email+"",
           
          })
        }).catch(function(error) {
            // Handle Errors here.
           
            alert(error);
          });
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorCode, errorMessage);
    });
            
        //     firebase.auth().createUserWithEmailAndPassword(email, password)
        //       .then(() =>  { 
   
                
                   
        //           //this.setState({ error: 'Votre compte a été créé avec success , connectez vous', loading: false });
        //           alert('Votre compte a bien été créé , Felicitation!');
        //             this.setState({
        //   // Clear out the fields when the user logs in and hide the progress indicator.
        //              email: '',
        //             password: '',
        //             verifypassword:'',
        //             loading: false
        //             });
        //            this.props.navigation.navigate("Connexion")

        //         }).catch( (error) => {

        //             this.setState({
        //                 loading: false
        //               });
        //               alert("Account creation failed: " + error.message );
        //         }

 
        //         )

          }else {
              // password do not match
              this.setState({ error: 'les mots de passe ne sont pas identiques', loading: false }); 
          }
          
              
      }
      renderButtonOrSpinner() {
          if (this.state.loading) {
              return <Spinner />;    
          }
          
      }


    render() {
        return (
           
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#F6F6F7'
                
              }}>
                <View style={{width: '100%', height: 200,  alignItems:"center" , justifyContent:"center"}}>
                    

                    <Image source={require('./img/sunulogo.png')} style={{marginTop : 10,width : 120 , height : 120}}/>
                    

                    <Text style={styles.connectezVous}>  S U N U C O U T U R E  </Text>
                   
                </View>






                <View style={{width: '100%', height: 400  , alignItems:"center" , justifyContent:"center"}}>

                <ElevatedView
                 elevation={10}
                 style={styles.stayElevated}
               >


                <TextInput style = {{width:'100%' , height:'33%' , marginLeft:5}}
                underlineColorAndroid ='transparent'
                placeholder = "Entrer votre email "
        
                autoCapitalize = "none"
                onChangeText = {email => this.setState({ email })} />

                <View
                style={{
                  borderBottomColor: '#c0bebd',
                  borderBottomWidth: 1,
                }}
              />

              
               <TextInput style = {{width:'100%', height:'33%' , marginLeft:5}}
               underlineColorAndroid ='transparent'
                placeholder = "Entrer votre Mot de passe "
               
                autoCapitalize = "none"
                secureTextEntry = {true}
                onChangeText = {password => this.setState({ password })} />

                <View
                style={{
                  borderBottomColor: '#c0bebd',
                  borderBottomWidth: 1,
                }}
              />

                <TextInput style = {{width:'100%', height:'33%' , marginLeft:5}}
               underlineColorAndroid ='transparent'
                placeholder = "Confirmer votre mot de passe "
               
                autoCapitalize = "none"
                secureTextEntry = {true}
                onChangeText = {verifypassword => this.setState({ verifypassword })} />
              
               
                </ElevatedView>
                

                
              
                
                
                <Text style = {{color : 'red' , marginTop : 14 , fontStyle:'italic'}}> {this.state.error} </Text>
                
                <Button style={styles.button} onPress={this.onsignupPress.bind(this)} >
                    
                <Text style={styles.text} > Inscription </Text>
        
                </Button>

                <View style={{flexDirection : 'row' , marginTop : 20}}>
                
                <TouchableOpacity  onPress={this.signInWithGoogleAsync.bind(this)}>

                <Image source={require('./img/f.png')} style={{width : 40 , height : 40}}/>
                </TouchableOpacity>

                <TouchableOpacity  onPress={this.logIn.bind(this)}>

                <Image source={require('./img/g.png')} style={{marginLeft:16,width : 40 , height : 40}}/>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => this.props.navigation.navigate("phoneauth")}>

                <Image source={require('./img/ph.png')} style={{marginLeft:16,width : 40 , height : 40}}/>
                </TouchableOpacity>
                    
                
                 </View>

                

                 
               
                
               </View>



                <View style={{width: '100%', height: 50, backgroundColor: '#F77062' , alignItems:"center" , justifyContent:"center"}}>

                <Button transparent style={{alignSelf : "center"}} onPress={() => this.props.navigation.navigate("Connexion")}>
                <Text style={{fontWeight : "bold" , fontSize : 15 , color : "white"}} >Deja un compte , Connexion  </Text>
                </Button>
                </View>

              </View>
           
           
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
      
        marginTop:10,
        fontSize: 25,
        fontWeight:'bold',
       
        textAlign: "center",
        color: "#F77062"
    },

    authentification : {
   
	marginTop : 100,
	fontSize: 15,
	fontWeight: "bold",
	letterSpacing: 0.5,
	textAlign: "center",
	color: "#ffffff"
    },
    stayElevated: {
        width: '90%',
        height: '40%',
        margin: 5,
        backgroundColor: 'white'
      },
    button: {
        marginTop:10,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#F77062',   // White colored border
        paddingHorizontal: 122,    // Horizontal padding
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