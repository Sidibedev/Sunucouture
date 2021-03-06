import React, { Component } from 'react';
import {View ,Text,ImageBackground,Image, StyleSheet} from 'react-native'
import {Button} from 'native-base'
import Connexion from './Connexion'
import Inscription from './Inscription'
import firebase from 'firebase'
export default class Acceuil extends Component {
   
    render() {

        
       
        return (
           <ImageBackground
            source={require('./img/background.jpeg')} 
            style= {styles.container}> 


            <View style={styles.overlay}>

            <View style={styles.top}>

                   <Image source={require('./img/dressmaker.png')} style={{paddingTop : 20, width : 70 , height : 70}}/>
                    <Text style={styles.bienvenu}>
                    SUNUCOUTURE 
                    </Text>

                   

            </View>

            <View style={{position : 'absolute' , bottom:0  ,paddingBottom : 10, flex : 1, alignItems:'center' , justifyContent:'center' , alignSelf:'center'}}>
                    <Button block style={styles.button}   onPress={() => this.props.navigation.navigate("Connexion")}>
                    
                            <Text style={{color:'white' , fontWeight:'bold' }} > Connexion </Text>
                    
                    </Button>

                    <Button block style={styles.button}  onPress={() => this.props.navigation.navigate("Inscription")}>
                    
                            <Text style={{color:'white' , fontWeight : 'bold'}}> Inscription </Text>
                    
                    </Button>
            </View>

                
             </View>
            
             <View>

            

             </View>
            
           </ImageBackground>
        
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
        backgroundColor : 'rgba(247, 112, 98, .3)'

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
        paddingHorizontal: 120,    // Horizontal padding
        paddingVertical: 5,      // Vertical padding
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

        fontSize:18,
        color:'#fff',
        fontWeight : "bold"
        

        
    }
})

