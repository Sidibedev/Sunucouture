import React, { Component } from 'react';
import {View ,Text,ImageBackground, TouchableOpacity , Alert , StyleSheet,StatusBar,Image , BackHandler,AsyncStorage, TextInput} from 'react-native'
import {Button , Card , CardItem,Form ,Item,Input, Label, Body , Container , Spinner, Content , Header} from 'native-base'
import loginform from './loginform'
import Tab from './Tab'
import firebase from 'firebase'
import FirebaseConfig from './FirebaseConfig'
import {LoginManager , AccessToken} from 'react-native-fbsdk'
import { SocialIcon } from 'react-native-elements'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
import Expo from 'expo'
import ElevatedView from 'react-native-elevated-view'

export default class Connexion extends Component {

    componentWillMount() {


        BackHandler.exitApp()
           
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
    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
       
      }
    

      state = { email: '', password: '', error: '', loading: false };


      onLoginPress() {
        
          this.setState({ error: '', loading: true });
  
          const { email, password } = this.state;
          firebase.auth().send
          firebase.auth().signInWithEmailAndPassword(email, password)
              .then((user_data) => { 
                  this.setState({ error: '', loading: false }); 
                  //AsyncStorage.setItem('user_data', JSON.stringify(user_data));
                  this.props.navigation.navigate("Menuprincipal")

                }).catch( () => {

                    this.setState({ error: 'Ce compte nexiste pas', loading: false }); 
                }


                )

                
           //839829875428-nevh5l5r54ccg4lra6vnecjhehv01ijo.apps.googleusercontent.com   
      }
      renderButtonOrSpinner() {
          if (this.state.loading) {
              return <Spinner color="#F77062" />;    
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
    
       

     
    render() {
        return (
          
        
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'white'
              }}>
                <View style={{width: '100%', height: 200,  alignItems:"center" , justifyContent:"center"}}>
                
                    <Image source={require('./img/sunulogo.png')} style={{width : 70 , height : 70}}/>
                    <Text style={styles.connectezVous}> S U N U C O U T U R E</Text>
                   
                </View>






                <View style={{width: '100%', height: 300  , alignItems:"center" , justifyContent:"center"}}>

             

               
               <ElevatedView
                 elevation={30}
                 style={styles.stayElevated}
               >

               <TextInput style = {{width:'100%' , height:'50%' , marginLeft:5}}
                underlineColorAndroid ='transparent'
                placeholder = "Email "
                
                autoCapitalize = "none"
                onChangeText={email => this.setState({ email })} />

                <View
                style={{
                  borderBottomColor: '#c0bebd',
                  borderBottomWidth: 1,
                }}
              />
              
               <TextInput style = {{width:'100%', height:'50%' , marginLeft:5}}
               underlineColorAndroid ='transparent'
                placeholder = "Mot de passe "
                
                autoCapitalize = "none"
                secureTextEntry = {true}
                onChangeText={password => this.setState({ password })}/>


               </ElevatedView>

             

                
              
               
                
                
              
                <Button transparent style={{marginLeft:230}} onPress={() => this.props.navigation.navigate("Forgot")}>
                    <Text style={{fontStyle:"italic"}}>Mot de passe oublié ?</Text>
               </Button>
               {this.renderButtonOrSpinner()}

               <Text style={styles.errorTextStyle}>{this.state.error}</Text>

                
                <Button style={styles.button}  onPress={this.onLoginPress.bind(this)} >
                    
                <Text style={styles.text}> Connexion </Text>
        
                </Button>




                
                 
      

                 <View style={{flexDirection : 'row' , marginTop : 20}}>
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate("Phone")}>

                <Image source={require('./img/ph.png')} style={{width : 40 , height : 40}}/>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={this.logIn.bind(this)}>

                <Image source={require('./img/f.png')} style={{marginLeft:16,width : 40 , height : 40}}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.signInWithGoogleAsync.bind(this)}>

                <Image source={require('./img/g.png')} style={{marginLeft:16,width : 40 , height : 40}}/>
                </TouchableOpacity>
 

                
                
                    
                
                 </View>

                 
               
                
               </View>



                <View style={{width: '100%', height: 50, backgroundColor: '#F77062' , alignItems:"center" , justifyContent:"center"}}>

                <Button transparent style={{alignSelf : "center"}} onPress={() => this.props.navigation.navigate("Inscription")}>
                <Text style={{fontWeight : "bold" , fontSize : 15 , color : "white"}} >Pas encore de compte , Inscription </Text>
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
        backgroundColor: 'white'
    },
    containerel : {
      flex: 1,
      backgroundColor: 'white'
    },
    stayElevated: {
      width: '90%',
      height: '40%',
      margin: 5,
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 7
      },
      shadowRadius: 10,
      shadowOpacity: 2.0
    },
    connectezVous :{
      
      marginTop:10,
      fontSize: 18,
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
      marginTop:5,
      borderRadius: 50,         // Rounded border
      borderWidth: 2,           // 2 point border widht
      borderColor: '#F77062',   // White colored border
      paddingHorizontal: 122,    // Horizontal padding
      paddingVertical: 10,      // Vertical padding
      backgroundColor:"#F77062",
      alignSelf:'center',
      shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
       
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
       
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
})