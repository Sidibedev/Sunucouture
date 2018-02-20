import React from 'react';
import { Container, Header,Item , List ,Input , ListItem , Content , AsyncStorage , Footer, FooterTab, Button, Left , Right , Body,  Icon , StyleProvider , Title } from 'native-base'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ActionButton from 'react-native-action-button';

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
import ElevatedView from 'react-native-elevated-view'
export default class Profil extends React.Component {


  
  constructor(){
    super()
    this.state = {
      
      emailUser:firebase.auth().currentUser.email,
      nom :'',
      prenom:'',
      tel : '',
      adresse : '',
      avatar :null,
      refreshing : false

     
    }
    this.fetchUSer()
   

  }

  fetchUSer(){


    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
    .then((response) => {


      
      
      this.setState({nom : response.data.nom  , prenom : response.data.prenom  , adresse : response.data.adresse , tel : response.data.tel , avatar : response.data.avatar  })
     

    }) 
  
    

  }
  
render() {
  
  return (
   <StyleProvider style={getTheme(platform)}>
     <Container>
         
          <Header>
            <Left> 
          <Icon style={{color:"white"}} name="arrow-back" onPress={() => this.props.navigation.goBack()}/>
            </Left>
                <Body>
                    <Title style={{color : 'white'}}>Mon Profil </Title>
                </Body>

                <Right>
                
                </Right>
               
         </Header>
                
         <Content>





         <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={20}
          source={require('./img/background.jpeg')}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{ uri: this.state.avatar ? this.state.avatar : './img/ava.png' }}
            />
            <Text style={styles.userNameText}>{this.state.nom}  {this.state.prenom}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon 
                  style={{color : "white"}}
                  name="md-navigate"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                 {this.state.adresse} 
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>


      <View style={{paddingTop : 12 , justifyContent : 'center' , alignItems : 'center' }}>

     
     

      <ElevatedView
      elevation={10}
      style={styles.stayElevated}
       >

          <ListItem icon button>
            <Left>
              <Button>
              <Icon active name="mail"/>
              </Button>
              
            </Left>
            <Body>
              <Text>Email : {this.state.emailUser} </Text>
            </Body>
           
          </ListItem>

          </ElevatedView>


         


          <ElevatedView
      elevation={10}
      style={styles.stayElevated}
       >
          <ListItem icon button>
          <Left>
            <Button>
            <Icon active name="md-call"  />
            </Button>
          </Left>
          <Body>
            <Text>Telephone :  {this.state.tel} </Text>
          </Body>
         
        
          </ListItem>

          </ElevatedView>
          
          
         

       </View>



       
               
                
            
             
            </Content>
      </Container>
  </StyleProvider>

  
    
    );
  }
}


const styles  = StyleSheet.create({


  containerO: {
    flexDirection: 'row',
  },
  stayElevated: {
    width: '90%',
    height: '30%',
    margin: 5,
    backgroundColor: '#fffcfc'
  },
  separatorOffsetO: {
    flex: 2,
    flexDirection: 'row',
  },
  separatorO: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },



  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: "#01C89E",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  
})
