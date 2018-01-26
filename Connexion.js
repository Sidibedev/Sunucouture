import React, { Component } from 'react';
import {View ,Text,ImageBackground, Alert , StyleSheet,StatusBar,Image , BackHandler,AsyncStorage, TextInput} from 'react-native'
import {Button , Card , CardItem,Form ,Item,Input, Label, Body , Container , Spinner, Content , Header} from 'native-base'
import loginform from './loginform'
import Tab from './Tab'
import firebase from 'firebase'
import FirebaseConfig from './FirebaseConfig'
import {LoginManager , AccessToken} from 'react-native-fbsdk'
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;
import Expo from 'expo'
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
              return <Spinner />;    
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
                backgroundColor: '#F77062'
              }}>
                <View style={{width: '100%', height: 200,  alignItems:"center" , justifyContent:"center"}}>
                
                    <Image source={require('./img/man.png')} style={{marginTop : 10,width : 120 , height : 120}}/>
                    <Text style={styles.connectezVous}>  Connectez vous </Text>
                   
                </View>






                <View style={{width: '100%', height: 300  , alignItems:"center" , justifyContent:"center"}}>

               <View style={{width:'80%',height:'30%', backgroundColor:'white'}}>
              
                <TextInput style = {{width:'100%' , height:'50%' , marginLeft:5}}
                underlineColorAndroid ='transparent'
                placeholder = "Email "
                placeholderTextColor = "#F77062"
                autoCapitalize = "none"
                onChangeText={email => this.setState({ email })} />

              
               <TextInput style = {{width:'100%', height:'50%' , marginLeft:5}}
               underlineColorAndroid ='transparent'
                placeholder = "Mot de passe "
                placeholderTextColor = "#F77062"
                autoCapitalize = "none"
                secureTextEntry = {true}
                onChangeText={password => this.setState({ password })}/>
              
               
                
                </View>
              
                <Button transparent style={{marginLeft:230}} onPress={() => this.props.navigation.navigate("Forgot")}>
                    <Text style={{fontStyle:"italic"}}>Mot de passe oublié ?</Text>
               </Button>
               {this.renderButtonOrSpinner()}

               <Text style={styles.errorTextStyle}>{this.state.error}</Text>

                
                <Button style={styles.button}  onPress={this.onLoginPress.bind(this)} >
                    
                <Text style={styles.text}> Connexion </Text>
        
                </Button>
                
                 
      

                 <View style={{marginTop : 50}}>
                <Button style={styles.google}  onPress={this.signInWithGoogleAsync.bind(this)} >
                    
                <Text style={styles.textgoogle}>  Google </Text>
        
                </Button>
                    
                <Button style={styles.facebook} onPress={this.logIn.bind(this)}>
                    
                <Text style={styles.textgoogle}> Facebook </Text>
        
                </Button>

                 </View>
               
                
               </View>



                <View style={{width: '100%', height: 50, backgroundColor: 'steelblue' , alignItems:"center" , justifyContent:"center"}}>

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
        paddingHorizontal: 122,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"white",
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
        color: '#F77062',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
})