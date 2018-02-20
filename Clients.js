import React, { Component } from 'react';
import { View , FlatList , Image, TouchableOpacity , Alert } from 'react-native';
import Elevated from 'react-native-elevated-view'
import firebase from 'firebase'
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';
import Communications from 'react-native-communications';
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
    Icon,
    SwipeRow,
    Spinner
    
  } from "native-base";
  import ActionButton from 'react-native-action-button'

export default class Clients extends Component {

    

    constructor(props){
        super(props)
        this.state = {
          clients : '',
          emailUser:firebase.auth().currentUser.email,
          nom:'',
          prenom:'',
          adresse :'',
          telephone :'',
          refreshing : false,
          showAlert: false ,
          loading : false,
          userid:""
          
    
         
        }
        this.fetchClient() 
       
    
      }


      renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner />;    
        }
        
    }


   
      fetchClient() {


        this.setState({loading : true})
        axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
        .then((response) => {
          this.setState({userid : response.data.id})
         
        axios.get('https://sunucouture-api-agileague.herokuapp.com/api/clients?filter[where][idTailleur]='+response.data.id) // Fetching info of hospital
        .then((response1) => {
          
          this.setState({clients : response1.data , loading : false})

          
           
    
           
        }) 
        }) 
        
       
      }




      handleRefresh = () => {
        this.setState(
          {
            
            refreshing: true
          },
          () => {
            this.fetchClient()
          }
        );
      };


      deleteClient(id){

    axios.delete('https://sunucouture-api-agileague.herokuapp.com/api/clients/'+id)
    .then((response) => {
      this.handleRefresh()
    })
  

      }


    render() {
    
        return (
            <Container style={{backgroundColor : "white"}}>
            <Header style={{backgroundColor : '#F77062'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Text style={{color:"white"}}> Back </Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color : "white"}}>Clients</Title>
                    </Body>
                    <Right>
                    <Button transparent onPress={this.fetchClient()}>
                    <Icon  name="refresh" style={{color:"white"}} />
                   </Button>
                       
                    </Right>
            </Header>
            <Content>


            {this.renderButtonOrSpinner()}
             
            <FlatList
            data={this.state.clients}
            refreshing={this.state.refreshing}
            keyExtractor={item => item.id}
            onRefresh={this.handleRefresh}
            renderItem={({ item }) => <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
                <Button primary onPress={() => this.props.navigation.navigate("Ajoutclient" , {id : item.id , userid : this.state.userid , nomClient : item.nom , prenomClient : item.prenom , adresseClient : item.adresse , telephoneClient : item.telephone})} >
                  <Icon active name="create" />
                </Button>
              }
            body={
                
                <TouchableOpacity  onPress={() => {
                    Alert.alert(
                        item.nom+' '+item.prenom,
                        item.adresse +' '+item.telephone,
                        [
                          {text: 'Appeler', onPress: () => Communications.phonecall(item.telephone , isPrompt = true)},
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      )
                  }} style={{paddingLeft : 12 , flexDirection:'row'}} >
                  <Image source={require('./img/user.png')} style={{width : 30 , height : 30}}/>
                  <Text style={{paddingLeft : 5}}>{item.prenom} {item.nom} </Text>
                 
                </TouchableOpacity>
                

               
              }
            right={
                <Button danger onPress={() => this.deleteClient(item.id)}>
                  <Icon active name="trash" />
                </Button>
              }
            

            
         />}

         
         />




        




      
            
              <ActionButton
             
              buttonColor="#3b5998" style={{  
              
              
              position: 'absolute',                                          
              bottom: 0,                                                    
              }}
              onPress={() => {this.props.navigation.navigate('Ajoutclient' , {id : null})}}
            />




           

          
                
            </Content>
          </Container>
        );
    }
}

