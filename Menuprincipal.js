import React, { Component } from 'react';
import {View , ImageBackground, StyleSheet , TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native'
import { Container, Header,Item , List ,Input , ListItem , Content , AsyncStorage , Footer, FooterTab, Button, Left , Right , Body,  Icon, Text , StyleProvider , Title } from 'native-base'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import firebase from 'firebase'
import Parametre from './Parametre'
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Menuprincipal extends Component {

    state = {name : ''}

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged( (user) => {
    //         this.setState({name : user.displayName})

    //     })
    
        
    // }

    constructor(props) {
        super(props);
        this.state = { showAlert: false };
      };
    
      showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
    
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
     


    rendertemplate() {
        if(firebase.auth().currentUser.emailVerified == false) {
            return (
                <View style={{flex : 1}}>
                <Text style={{color :'red' , fontWeight: 'bold' , fontSize : 28}}>DESOLE VOUS N'AVEZ ENCORE VALIDER VOTRE COMPTE</Text>
                
                </View>
            )
        }else {

            const {showAlert} = this.state;


        return (
            <StyleProvider style={getTheme(platform)}>
            <Container>
                
                 <Header>
                   <Left> 

                   </Left>
                       <Body>
                           <Title style={{color : 'white'}}>Acceuil </Title>
                       </Body>
       
                       <Right>
                      
                       </Right>
                      
                </Header>
                       
                <Content>
       
                <ImageBackground
                   source={require('./img/background.jpeg')} 
                   style= {styles.container}> 
                
            <View style={{width :'100%' , height:250 , flex:1,
        
            backgroundColor : 'rgba(247, 112, 98, .4)'}}>

            <View style={styles.top}>

                        <Text style={styles.sunu}>
                        S U N U C O U T U R E 
                        </Text>

                   
                    <Text style={styles.bienvenu}>
                    Bienvenue  {this.state.name}
                    
                    
                   </Text>




                   

                   

            </View>

           
                
             </View>
                  
            </ImageBackground>


            <ScrollView>

                    
                    <View style={styles.container}>

                        <TouchableOpacity style={styles.box}   onPress={() => {
                            this.showAlert();
                          }}>
                        <Image source={require('./img/ogmes.png')} style={{width : 90 , height : 90}}/>
                         <Text style={styles.textmenu}>Prendre une mesure</Text> 
                        </TouchableOpacity>

                         <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("Commande")}> 
                         <Image source={require('./img/comog.png')} style={{width : 80 , height : 80}}/>
                         <Text style={styles.textmenu}>  Commandes </Text> 
                         </TouchableOpacity>


                         <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("Client")}>
                         <Image source={require('./img/ogclient.png')} style={{width : 80 , height : 80}}/>
                         <Text style={styles.textmenu}>Clients</Text> 
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => this.props.navigation.navigate("Allcatalogues")}>
                         <View style={styles.box}>
                         <Image source={require('./img/cata.png')} style={{width : 80 , height : 80}}/>
                         <Text style={styles.textmenu}> Catalogue </Text> 
                         </View>
                         </TouchableOpacity>



                         <TouchableOpacity style={styles.box}  onPress={() => this.props.navigation.navigate("Agendas")}>
                         <Image source={require('./img/agen.png')} style={{width : 80 , height : 80}}/>
                         <Text style={styles.textmenu}> Agenda </Text> 
                         </TouchableOpacity>
                         

                        
                         <TouchableOpacity onPress={() => this.props.navigation.navigate("Parametre")}>
                         <View style={styles.box}>
                         <Image source={require('./img/param.png')} style={{width : 80 , height : 80}}/>
                         <Text style={styles.textmenu}> Parametres </Text> 
                         </View>

                         </TouchableOpacity>



                         </View>


                        

           </ScrollView>


           <AwesomeAlert
           show={showAlert}
           showProgress={false}
           title="Prendre une nouvelle mesure"
           
           closeOnTouchOutside={true}
           closeOnHardwareBackPress={true}
           showCancelButton={true}
           showConfirmButton={true}
           cancelText="Nouveau client"
           confirmText="Client existant"
           confirmButtonColor="#F77062"
           cancelButtonColor="#3b5998"
           onCancelPressed={() => {
             this.hideAlert();
             this.props.navigation.navigate("Ajoutclientmesure")
           }}
           onConfirmPressed={() => {
             this.hideAlert();
             this.props.navigation.navigate("Clientselect")

           }}
         />

                
       
                       
                   
                    
                 </Content>
             </Container>
         </StyleProvider>
        );

        }
    }

    
    render() {


       return (this.rendertemplate())
    
    }
}


const styles  = StyleSheet.create({
    scrollContainer : {
        flex : 1,
    },
    box : {

        margin : 2 ,
        width : Dimensions.get('window').width/2 -6,
        justifyContent : 'center',
        alignItems : 'center',
        height:140,
        shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
       
       

    },
    container : {
        
        flexDirection : 'row',
        flexWrap : 'wrap',
        
        
    },
    overlay : {
        flex:1,
        
        backgroundColor : 'rgba(247, 112, 98, .4)'

    },
    top : {
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
        marginTop : 140,
        
        fontSize:18,
        color:'white',
        fontWeight : "bold"
        

        
    },
    sunu :{
        marginTop :10,
        fontSize : 28,
        color : 'white',
        fontWeight : 'bold'
    },
    textmenu : {
        marginTop : 10,
        fontSize : 18,
        fontWeight:'bold',
        color : '#1d3461'
        
       
    }
})
