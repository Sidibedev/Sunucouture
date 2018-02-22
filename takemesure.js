import React, { Component } from 'react';
import { View , FlatList , Image, TextInput , TouchableOpacity , Alert ,StyleSheet } from 'react-native';
import Elevated from 'react-native-elevated-view'
import firebase from 'firebase'
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';
import Communications from 'react-native-communications';
import { ListItem , List } from 'react-native-elements'
import InfoText from './InfoText'
import DatePicker from 'react-native-datepicker'

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
    
    Thumbnail,
    Icon,
    Item,
    Input,
    SwipeRow,
    Spinner
    
  } from "native-base";
class takemesure extends Component {

    constructor(props) {
        super(props)
        this.state = {
            client:'',
            type : '',
            mesures : [],
            mensu : {

              nom : "",
              valeur :""
            },
            emailUser:firebase.auth().currentUser.email,
            userid: '',
        
            date : new Date()

        }
        console.log(this.props.navigation.state.params.idClient)
        console.log(this.props.navigation.state.params.idType)
    }
    componentDidMount() {

        this.fetchClient()
        this.fetchType()
        this.fetchIdtailleur()

    }

    fetchIdtailleur(){

      axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
      .then((response) => {
        this.setState({userid : response.data.id})
     
         
      }) 
    

    }


    commander() {


      var _this = this
      axios.post('https://sunucouture-api-agileague.herokuapp.com/api/commandes', {
        "date":""+this.state.date+"",
        "idClient":""+this.props.navigation.state.params.idClient+"",
        "idTypeHabit":""+this.props.navigation.state.params.idType+"",
        "idTailleur": ""+this.state.userid+"",
        "statut":false,
        "nomClient":""+this.state.client.nom+"",
        "prenomClient":""+this.state.client.prenom+"",
        "nomType":""+this.state.type.nom+"",


      })
      .then(function (response) { 
        alert('Commande bien ajouté')
       
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    fetchClient() {

        axios.get('https://sunucouture-api-agileague.herokuapp.com/api/clients/'+this.props.navigation.state.params.idClient)
        .then((response) => {
            this.setState({client : response.data})
        })
    }

    fetchType () {

        axios.get('https://sunucouture-api-agileague.herokuapp.com/api/TypeHabits/'+this.props.navigation.state.params.idType)
        .then((response) => {
            this.setState({type : response.data , mesures : response.data.mesures})
        })

    }

    render() {

     
        return (
           
                <Container style={{backgroundColor : "white"}}>
                
                <Header  style={{backgroundColor : '#F77062'}}>
                
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" style={{color:"white"}} />
                </Button>
              </Left>
              <Body>
                <Title style={{color : "white"}}>take mesure</Title>
              </Body>
              <Right />
              
           
              </Header>
                   
              <Content> 

              <InfoText text="Information du client"/>


              <List containerStyle={styles.listContainer}>
         



              <ListItem style={{marginLeft : 15}}
                 title={  this.state.client.prenom +' ' +this.state.client.nom + ' '+ this.state.client.telephone}
                 
                
                 containerStyle={styles.listItemContainer}
                 leftIcon={
                   <Icon
                     raised
                     containerStyle={{ backgroundColor: '#3b5998' }}
                     icon={{
                       name: 'md-information-circle',
                       type:'ionicon'
                     }}
                   />
                 }
               />


               <InfoText text="Type d'habit "/>


               <ListItem style={{marginLeft : 15}}
                 title={  this.state.type.nom }
                 
                
                 containerStyle={styles.listItemContainer}
                 leftIcon={
                   <Icon
                     raised
                     containerStyle={{ backgroundColor: '#3b5998' }}
                     icon={{
                       name: 'entypo',
                       type:'light-bulb'
                     }}
                   />
                 }
               />

               </List>


               <InfoText text="Ajouter les mesures du client "/>

               <Elevated elevation={10} style={{marginLeft : 10 ,marginTop : 15,width:'90%',marginTop : 15, height:'50%',flex:1 , alignSelf : 'center' , marginBottom : 10}}>
                 



                    {this.state.mesures.map((l , i) => {

                              return (

                                    <View style={{flexDirection:'row' , marginTop : 10 , marginLeft : 15}} key={i}>

                                    <Text style={{ marginTop : 13 , fontSize : 15}}> {l} : </Text>

                                    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
                                    underlineColorAndroid ='transparent'
                                    placeholder = "Entrer une valeur"
                                    autoCapitalize = "none"
                                    autoFocus
                                    placeholderTextColor='#3b5998'
                                    selectionColor='#F77062'
                                    onChange={this.handleQuerySearch} />

                                    </View>
                              )

                  })}
                            
                    
                  
               

              
               </Elevated>




               <InfoText text="Livraison de la commande "/>



               <View style={{marginTop : 15 , marginLeft : 15}}>



               <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="Choisissez une date"
        format="YYYY-MM-DD"
        minDate="2018-01-01"
        maxDate="2019-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          },
          placeholderText : {
              fontSize : 20
          },
          dateText : {
              fontSize : 15,
              color : "#3b5998"
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />


               </View>



               <Button style={styles.button} onPress={this.commander.bind(this)}>
                    
                <Text style={styles.text}> Valider </Text>
        
              </Button>
           
               

              </Content>

              </Container>

            
        );
    }
}

export default takemesure;


const styles = StyleSheet.create({
    scroll: {
      backgroundColor: 'white',
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 6,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
    },
    userImage: {
      marginRight: 12,
    },
    listContainer: {
      marginBottom: 0,
      marginTop: 0,
      borderTopWidth: 0,
    },
    listItemContainer: {
      borderBottomColor: '#ECECEC',
    },
    button: {
        marginTop:25,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#3b5998',   // White colored border
        paddingHorizontal: 122,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"#3b5998",
        alignSelf:'center',
        shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0
         
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
       
        
      },
  })