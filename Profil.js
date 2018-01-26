import React from 'react';
import { Container, Header,Item , List ,Input , ListItem , Content , AsyncStorage , Footer, FooterTab, Button, Left , Right , Body,  Icon, Text , StyleProvider , Title } from 'native-base'
import {Image , ListView,FlatList,StyleSheet,Alert, View , ImageBackground, StatusBar , StackNavigator} from 'react-native'

import { AppLoading, Asset, Font } from 'expo'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import axios from 'axios';

import SearchBar from 'react-native-searchbar';

import { FontAwesome } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation'
import Placeholder from 'rn-placeholder';
import firebase from 'firebase'
import Connexion from './Connexion';

export default class Profil extends React.Component {
  logout(){
  
    //this.props.navigation.navigate("Connexion")

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Connexion'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    firebase.auth().signOut()
    .then(function() {
     
       alert('A bientot ')
     
    
    
    
    })
    .catch(function(error) {
      alert(error)
    });
  }


  disable (){
    this.props.navigation.navigate("Screens")

    var user = firebase.auth().currentUser;

  user.delete().then(function() {
  alert('compte desactivé')
 
}).catch(function(error) {
  alert('something wrong')
});
  }
render() {
  
  return (
   <StyleProvider style={getTheme(platform)}>
     <Container>
         
          <Header>
            <Left> 
          <Icon style={{color:"white"}} name="home" onPress={() => this.props.navigation.goBack()}/>
            </Left>
                <Body>
                    <Title style={{color : 'white'}}>Mon Profil </Title>
                </Body>

                <Right>
                <Icon style={{color:"white"}} name="contact" onPress={() => this.props.navigation.navigate("Profil")}/>
                </Right>
               
         </Header>
                
         <Content>


         <List>

            

              
         <ListItem button onPress={this.logout.bind(this)}>
         <Left>
         <Image source={require('./img/logout.png')} style={{width : 40 , height : 40}} />
         <Text>Deconnexion</Text>
         </Left>
         </ListItem>

        
           
         <ListItem button   onPress={() => this.props.navigation.navigate("Infosprofile")}>
         <Left>
         <Image source={require('./img/infos.png')} style={{width : 40 , height : 40}} />
         <Text>Mes informations </Text>
         </Left>
         </ListItem>

        
           
        

        <ListItem button onPress={this.disable.bind(this)}>
         <Left>
         <Image source={require('./img/disable.png')} style={{width : 40 , height : 40}} />
         <Text>Desactiver mon compte</Text>
         </Left>
         </ListItem>

        

       

        



       
        
 </List>

       

           
       
               
                
            
             
            </Content>
      </Container>
  </StyleProvider>

  
    
    );
  }
}


const styles  = StyleSheet.create({
  container : {
      flex : 1 ,
      width : '100%',
      height : '100%'
  },
  overlay : {
      flex:1,
      backgroundColor : 'rgba(247, 112, 98, .4)'

  },
  top : {
      height:'50%',
      alignItems:'center',
      justifyContent : 'center'
  },
  button: {
      marginTop:15,
      borderRadius: 50,         // Rounded border
      borderWidth: 2,           // 2 point border widht
      borderColor: '#F77062',   // White colored border
      paddingHorizontal: 122,    // Horizontal padding
      paddingVertical: 10,      // Vertical padding
      backgroundColor:"#F77062",
      alignSelf:'center'
       
    },
  header:{
      color : '#fff',
      fontSize:15,
      alignItems:'center',
      borderColor:'#F77062',
      borderWidth: 2,
      padding : 20,
      paddingLeft : 40,
      paddingRight:40,
      backgroundColor:'#F77062'

  },
  bienvenu : {

      fontSize:28,
      color:'#fff',
      fontWeight : "bold"
      

      
  }
})
