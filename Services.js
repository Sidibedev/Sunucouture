import React from 'react';
import { Container, Header,Item , List ,Input , ListItem , Content , AsyncStorage , Footer, FooterTab, Button, Left , Right , Body,  Icon, Text , StyleProvider , Title } from 'native-base'
import {Image , ListView,FlatList,StyleSheet,Alert, View , ImageBackground, StatusBar} from 'react-native'
import {StackNavigator} from 'react-navigation'
import { AppLoading, Asset, Font } from 'expo'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import axios from 'axios';

import SearchBar from 'react-native-searchbar';



import { FontAwesome } from '@expo/vector-icons';

import Placeholder from 'rn-placeholder';
import firebase from 'firebase'



export default class Services extends React.Component {

  state = {name : ''}

  


  componentDidMount() {
    this.setState({name : firebase.auth().currentUser.displayName })
}



render() {
  
  return (
   <StyleProvider style={getTheme(platform)}>
     <Container>
         
          <Header>
            <Left> 
               <Icon style={{color:"white"}} name="home" onPress={() => this.props.navigation.navigate("Search")}/>
            </Left>
                <Body>
                    <Title style={{color : 'white'}}>Acceuil </Title>
                </Body>

                <Right>
                <Icon style={{color:"white"}} name="contact" onPress={() => this.props.navigation.navigate("Profil")}/>
                </Right>
               
         </Header>
                
         <Content>

         <ImageBackground
            source={require('./img/background.jpeg')} 
            style= {styles.container}> 
         <View style={{width:'100%', height:200}} >

        

         
         </View>

           
         </ImageBackground>


         {firebase.auth().currentUser == null ? 

          <Text> Merci de vous connecter </Text>
          :
          <Text> Bienvenue {this.state.name} </Text>
        
        }    
        
                
            
             
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