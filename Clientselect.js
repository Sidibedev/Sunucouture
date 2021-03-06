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
    Item,
    Input,
    SwipeRow,
    Spinner
    
  } from "native-base";
  import ActionButton from 'react-native-action-button'

export default class Clientselect extends Component {

    

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
          id : '',
          
    
         
        }
        
       
    
      }


      renderButtonOrSpinner() {
        if (this.state.loading) {
            return <Spinner color="#F77062" />;    
        }
        
    }



    componentDidMount(){

      this.fetchClient()
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
            
            <Button transparent onPress={() => this.props.navigation.navigate("searchClientSelect")} >
              <Icon name="search" style={{color : "white"}} />
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
            renderItem={({item}) => {

              return (

                <TouchableOpacity onPress={() => this.props.navigation.navigate("selecType" , {idClient : item.id})} style={{paddingLeft : 12 , flexDirection:'row' , marginTop : 15}} >


                <Image source={require('./img/user.png')} style={{width : 30 , height : 30}}/>
                <Text style={{paddingLeft : 5 , marginTop : 5}}> {item.prenom} {item.nom} </Text>
                

                </TouchableOpacity>
              )

            } 
            
          }
            
         />

         
        




        




      
           

           

          
                
            </Content>
          </Container>
        );
    }
}

