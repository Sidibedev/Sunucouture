import React from 'react';
import { Container, Header, Item , Input ,  Separator , Thumbnail, ListItem , Content , Footer, FooterTab, Button, Left , Right , Body,  Icon, Text , StyleProvider , Title } from 'native-base'
import {Image , ListView , StatusBar} from 'react-native'
import {StackNavigator , TabNavigator} from 'react-navigation'
import { Root } from "native-base";
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import axios from 'axios';
import Services from './Services'


import Tab from './Tab'
import Screens from './Screens'
import Swiper from './Swiper'
import Acceuil from './Acceuil'
import Connexion from './Connexion'
import Inscription from './Inscription'
import Forgot from './Forgot'
import Profil from './Profil';
import Infosprofile from './Infosprofile'
import Menuprincipal from './Menuprincipal'
import Parametre from './Parametre'
import typehabit from './typehabit'
import ajoutypehabit from './ajoutypehabit'



 
const App =  StackNavigator({
 
  Services : { 
    screen: Services,
 },
 ajoutypehabit : {
   screen : ajoutypehabit
 },
 typehabit : {
   screen : typehabit
 },

 Parametre : {
   screen : Parametre
 },
 Profil: {
   screen : Profil
 },
 Infosprofile : {
   screen : Infosprofile
 },
 Forgot : {
   screen : Forgot
 },
  
  
  Tab : {
    screen : Tab
  },
 
  Screens : {
    screen : Screens
  },
  Swiper : {
    screen : Swiper
  },

  Menuprincipal : {
    screen : Menuprincipal
  },
    Acceuil : {
      screen : Acceuil
    },
    Connexion : {
      screen : Connexion
    },
    Inscription : {
      screen : Inscription
    }
},
{
    initialRouteName: "Screens",
    headerMode: "none",
},


);


export default () =>
<Root>
<StatusBar backgroundColor="#00c4cc" />
<App style = {{backgroundColor:"white" }} />
</Root>;




