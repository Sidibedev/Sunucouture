import React, { Component } from 'react';
import { View, TextInput , StyleSheet} from 'react-native';
import Form from 'react-native-form'
import Elevated from 'react-native-elevated-view'
import axios from 'axios'

import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Text,
    Badge,
    Left,
    Right,
    Body,
    Switch,
    Radio,
    Picker,
    Separator,
    ListItem,
    List,
    Thumbnail,
    Spinner
  } from "native-base";
import firebase from 'firebase'
export default class Ajoutclient extends Component {


    constructor(){
        super()
        this.state = {
          
          emailUser:firebase.auth().currentUser.email,
          nom:'',
          prenom:'',
          adresse:'',
          telephone:'',
          userid:'',
          loading : false
          
    
         
        }
        this.fetchUser() 
       
    }


    fetchUser() {

    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
    .then((response) => {

        this.setState({userid : response.data.id})

    }) 
    }


    renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner />;    
        }
        
    }


    addClient(){
        var _this = this
        axios.post('https://sunucouture-api-agileague.herokuapp.com/api/clients', {
          "nom":""+this.state.nom+"",
          "prenom":""+this.state.prenom+"",
          "adresse":""+this.state.adresse+"",
          "telephone":""+this.state.telephone+"",
          "idTailleur": ""+this.state.userid+"",

        })
        .then(function (response) { 
          alert('Client bien ajouté')
          _this.props.navigation.goBack()
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    updateClient(){
        this.setState({loading : true})
        var _this = this
        axios.put('https://sunucouture-api-agileague.herokuapp.com/api/clients/'+this.props.navigation.state.params.id, {
            "nom": this.state.nom != ''?""+this.state.nom+"":""+ this.props.navigation.state.params.nomClient +"",
            "prenom":this.state.prenom != '' ? ""+this.state.prenom+"" :  ""+ this.props.navigation.state.params.prenomClient +"" ,
            "adresse":this.state.adresse != '' ? ""+this.state.adresse+"" :""+ this.props.navigation.state.params.adresseClient +"",
            "telephone":this.state.telephone !='' ? ""+this.state.telephone+"" : ""+ this.props.navigation.state.params.telephoneClient +"",
            "idTailleur": ""+this.state.userid+"",
        })
        .then(function (response) {
        _this.setState({loading : false})
          alert('Client a été bien modifié')
          _this.props.navigation.goBack()
          
        })
        .catch(function (error) {
          console.log(error);
        });
    
      }


      renderTemplate(){

        if (this.props.navigation.state.params.id != null) {

            return (


                <Container style={{backgroundColor : "white"}}>
                <Header style={{backgroundColor : '#F77062'}}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Text style={{color:"white"}}> Back </Text>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color : "white"}}>Modifier un client</Title>
                        </Body>
                        <Right/>
                </Header>
                <Content style={{backgroundColor:'#fafafa'}}>
    
                <Text style={{fontSize : 24 , fontWeight : 'bold' , color : '#686868' , marginTop : 10 , alignSelf : 'center'}}> Mofifier les informations du client</Text>
    
                <View style={{marginTop  : 70}}>
    
    
    
               
    
    
                <Elevated elevation={20} style={styles.stayElevated}>
    
               
    
                <View style={{flexDirection : 'row' , marginTop : 10 }}>
                <Text style={{marginLeft : 5 , color : '#F77062'}}>Entrer le nom:</Text>
                <TextInput style={{marginLeft : 20 , width : '40%'}}
                 
                placeholder = {this.props.navigation.state.params.nomClient}
                placeholderTextColor = '#929292'
                onChangeText={nom => this.setState({ nom})} 
                />
    
                </View>
    
    
                
                             
    
    
                <View style={{marginTop : 30, flexDirection : 'row'}}>
                <Text style={{marginLeft : 5, color : '#F77062'}}>Entrer le prenom:</Text>
                <TextInput style={{marginLeft : 20 , width : '40%'}}
                 
                placeholder = {this.props.navigation.state.params.prenomClient}
                placeholderTextColor = '#929292'
                onChangeText={prenom => this.setState({ prenom})} 
                />
    
                </View>
    
    
    
    
    
                <View style={{marginTop : 30,flexDirection : 'row'}}>
                <Text style={{marginLeft : 5, color : '#F77062'}}>Entrer l'adresse:</Text>
                <TextInput style={{marginLeft : 20 , width : '40%'}}
                 
                placeholder = {this.props.navigation.state.params.adresseClient}
                placeholderTextColor = '#929292'
                onChangeText={adresse => this.setState({adresse})} 
                />
    
                </View>
    
    
    
                <View style={{marginTop : 30,flexDirection : 'row' , marginBottom : 10}}>
                <Text style={{marginLeft : 5, color : '#F77062'}}>Entrer le numero:</Text>
                <TextInput style={{marginLeft : 20 , width :'40%'}}
                 
                placeholder =  {this.props.navigation.state.params.telephoneClient}
                placeholderTextColor =  '#929292'
                onChangeText={telephone => this.setState({telephone})} 
                />
    
                </View>
    
                </Elevated>
    
               
    
    
                {this.renderButtonOrSpinner()}
    
    
           <Button style={styles.button} onPress={this.updateClient.bind(this)}>
                        
           <Text style={styles.text}> Modifier </Text>
    
          </Button>
    
    
    
                
                </View>
    
                    
    
                </Content>
    
    
                </Container>

            )
        }else {



            return (

                <Container style={{backgroundColor : "white"}}>
                <Header style={{backgroundColor : '#F77062'}}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Text style={{color:"white"}}> Back </Text>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color : "white"}}>Ajouter un client</Title>
                        </Body>
                        <Right/>
                </Header>
                <Content style={{backgroundColor:'#fafafa'}}>
    
                <Text style={{fontSize : 24 , fontWeight : 'bold' , color : '#686868' , marginTop : 10 , alignSelf : 'center'}}> Entrez les infos du client</Text>
    
                <View style={{marginTop  : 70}}>
    
    
    
               
    
    
                <Elevated elevation={20} style={styles.stayElevated}>
    
               
    
                <View style={{flexDirection : 'row' , marginTop : 10 }}>
                <Text style={{marginLeft : 5 , color : '#F77062'}}>Entrer le nom:</Text>
                <TextInput style={{marginLeft : 20 , width : '40%'}}
                autoFocus 
                placeholder = 'nom'
                placeholderTextColor = '#929292'
                onChangeText={nom => this.setState({ nom})} 
                />
    
                </View>
    
    
                
                             
    
    
                <View style={{marginTop : 30, flexDirection : 'row'}}>
                <Text style={{marginLeft : 5, color : '#F77062'}}>Entrer le prenom:</Text>
                <TextInput style={{marginLeft : 20 , width : '40%'}}
                 
                placeholder = 'prenom'
                placeholderTextColor = '#929292'
                onChangeText={prenom => this.setState({ prenom})} 
                />
    
                </View>
    
    
    
    
    
                <View style={{marginTop : 30,flexDirection : 'row'}}>
                <Text style={{marginLeft : 5, color : '#F77062'}}>Entrer l'adresse:</Text>
                <TextInput style={{marginLeft : 20 , width : '40%'}}
                 
                placeholder = 'Adresse'
                placeholderTextColor = '#929292'
                onChangeText={adresse => this.setState({adresse})} 
                />
    
                </View>
    
    
    
                <View style={{marginTop : 30,flexDirection : 'row' , marginBottom : 10}}>
                <Text style={{marginLeft : 5, color : '#F77062'}}>Entrer le numero:</Text>
                <TextInput style={{marginLeft : 20 , width :'40%'}}
                 
                placeholder = 'Numero tel'
                placeholderTextColor =  '#929292'
                onChangeText={telephone => this.setState({telephone})} 
                />
    
                </View>
    
                </Elevated>
    
               
    
    
    
    
           <Button style={styles.button} onPress={this.addClient.bind(this)}>
                        
           <Text style={styles.text}> Ajouter </Text>
    
          </Button>
    
    
    
                
                </View>
    
                    
    
                </Content>
    
    
                </Container>


            )
        }
      }


    render() {
        return (
          this.renderTemplate()
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
      height: '70%',
      margin: 5,
      backgroundColor: 'white',
      flex : 1 ,
      alignSelf : 'center'

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
      marginTop:50,
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