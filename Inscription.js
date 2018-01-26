'use strict';
import React, { Component } from 'react';
import {View ,Text,ImageBackground, StyleSheet,StatusBar,Image , Spinner , TextInput, TouchableOpacity} from 'react-native'
import {Button , Card , CardItem,Form ,Item,Input, Label, Body , Container , Content , Header} from 'native-base'

import firebase from 'firebase'
import Connexion from './Connexion'
import FirebaseConfig from './FirebaseConfig'

export default class Inscription extends Component {

   
    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
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
                backgroundColor: 'white'
                
              }}>
                <View style={{width: '100%', height: 200,  alignItems:"center" , justifyContent:"center"}}>
                    

                    <Image source={require('./img/sunulogo.png')} style={{marginTop : 45,width : 120 , height : 120}}/>
                    

                    <Text style={styles.connectezVous}>  S U N U C O U T U R E  </Text>
                   
                </View>






                <View style={{width: '100%', height: 300  , alignItems:"center" , justifyContent:"center"}}>

               <View style={{width:'90%',height:'60%', backgroundColor:'#f6f6f7' , shadowOpacity:400 , shadowColor:'white'}}>
                <TextInput style = {{width:'100%' , height:'33%' , marginLeft:5}}
                underlineColorAndroid ='transparent'
                placeholder = "Entrer votre email "
                placeholderTextColor = "#F77062"
                autoCapitalize = "none"
                onChangeText = {email => this.setState({ email })} />

              
               <TextInput style = {{width:'100%', height:'33%' , marginLeft:5}}
               underlineColorAndroid ='transparent'
                placeholder = "Entrer votre Mot de passe "
                placeholderTextColor = "#F77062"
                autoCapitalize = "none"
                secureTextEntry = {true}
                onChangeText = {password => this.setState({ password })} />

                <TextInput style = {{width:'100%', height:'33%' , marginLeft:5}}
               underlineColorAndroid ='transparent'
                placeholder = "Confirmer votre mot de passe "
                placeholderTextColor = "#F77062"
                autoCapitalize = "none"
                secureTextEntry = {true}
                onChangeText = {verifypassword => this.setState({ verifypassword })} />
              
               
                
                </View>

                
              
                
                
                <Text style = {{color : 'red' , marginTop : 14 , fontStyle:'italic'}}> {this.state.error} </Text>
                
                <Button style={styles.button} onPress={this.onsignupPress.bind(this)} >
                    
                <Text style={styles.text} > Inscription </Text>
        
                </Button>

                <View style={{flexDirection : 'row' , marginTop : 50}}>

                <TouchableOpacity>

                <Image source={require('./img/face.png')} style={{width : 50 , height : 50}}/>
                </TouchableOpacity>


                <TouchableOpacity>

                <Image source={require('./img/google.png')} style={{marginLeft:16, width : 50 , height : 50}}/>
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
    button: {
        marginTop:10,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#F77062',   // White colored border
        paddingHorizontal: 130,    // Horizontal padding
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
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
})