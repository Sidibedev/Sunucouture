import React, { Component } from 'react';

import {
  StyleSheet,   // CSS-like styles
  Dimensions,
  Text,  
  Image,       // Renders text
  View,
  StatusBar         // Container component
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenButton from './ScreenButton';
import Swiper from './Swiper';
import Connexion from './Connexion';
const { width, height } = Dimensions.get('window');

export default class Screens extends Component {

    componentDidMount() {
        // Hide the status bar
        StatusBar.setHidden(true);
      }
     
     
  render() {
    return (
    <Swiper>
            <View style={[styles.slide, { backgroundColor: '#F77062' }]}>
                <Image source={require('./img/oncata1.png')} style={{width : 200 , height : 200}}/>
                <Text style={styles.header}>Gerer vos Catalogues</Text>
                <Text style={styles.text}>Gerer en quelques clics vos Catalogues de modeles </Text>
               
            </View>

            <View style={[styles.slide, { backgroundColor: '#F77062' }]}>
            <Image source={require('./img/oncom1.png')} style={{width : 200 , height : 200}}/>
                <Text style={styles.header}>Gerer vos commandes</Text>
                <Text style={styles.text}>Enregistrer facilement et rapidement vos commandes</Text>
                
            </View> 

            <View style={[styles.slide, { backgroundColor: '#F77062' }]}>
            <Image source={require('./img/oncli1.png')} style={{width : 200 , height : 200}}/>
                <Text style={styles.header}>Gerer vos clients</Text>
                <Text style={styles.text}>Enregistrer vos clients</Text>
               
            </View>

            <View style={[styles.slide, { backgroundColor: '#F77062' }]}>
            <Image source={require('./img/onagen1.png')} style={{width : 200 , height : 200}}/>
                <Text style={styles.header}>Gerer votre agenda</Text>
                <Text style={styles.text}>Enregistrer vos rendez vous de livraison </Text>
                <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
                <ScreenButton text="Commencer" onPress={() => this.props.navigation.navigate("Acceuil")}/>
                </View>
            </View>

      </Swiper>
    );
  }
}

const iconStyles = {
    size: 100,
    color: '#FFFFFF',
  }; 
 
  
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',

    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',

    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  fullScreen: {
    width: width,
    height: height
  },

  
});