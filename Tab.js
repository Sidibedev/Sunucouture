import React from 'react';
import { Container, Header, Badge,Item , Input ,  Separator , Thumbnail, ListItem , Content , Footer, FooterTab, Button, Left , Right , Body,  Icon, Text , StyleProvider , Title } from 'native-base'
import {Image , ListView} from 'react-native'
import {StackNavigator , TabNavigator} from 'react-navigation'
import { Root } from "native-base";
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import axios from 'axios';
import Services from './Services'

import Acceuil from './Acceuil'
import Profil from './Profil';
import Menuprincipal from './Menuprincipal';
import Forgot from './Forgot';
import Connexion from './Connexion';







export default (MainScreenNavigator = TabNavigator({

  Services : {screen : Services},
  Profil : {screen : Profil},
  Menuprincipal : {screen :Menuprincipal},
  Forgot : {screen : Forgot},
  Connexion : {screen : Connexion}
 
},


{

  tabBarPosition: "bottom",
  swipeEnabled : false,
  tabBarComponent: props => {
    return (
        <StyleProvider style={getTheme(platform)}>
      <Footer>
      
        <FooterTab>
              
              <Button  
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Services")}
              >
                <Icon name="home" />
                <Text>Acceuil</Text>
              </Button>

              <Button
              
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Urgences")}
              
              >
               <Image source={require('./img/catalogue.png')} style={{width : 20 , height : 20}}/>
                <Text>Comm</Text>
              </Button>


              
              <Button vertical  active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Don")}>
              
              
              
              <Image source={require('./img/catalogue.png')} style={{width : 20 , height : 20}}/>
                <Text>Catalog</Text>
              </Button>

              <Button vertical  active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("Don")}>
              
              
              
              <Image source={require('./img/catalogue.png')} style={{width : 20 , height : 20}}/>
                <Text>Clients</Text>
              </Button>

              <Button vertical  active={props.navigationState.index === 4}
              onPress={() => props.navigation.navigate("Don")}>
             
              
              
              <Image source={require('./img/catalogue.png')} style={{width : 20 , height : 20}}/>
                <Text>Agenda</Text>
              </Button>
        </FooterTab>
        
</Footer>

</StyleProvider>

);
    }
  }
));








