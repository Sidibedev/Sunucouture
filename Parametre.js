import React, { Component } from "react";
import { Platform , Image } from "react-native";
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import Connexion from './Connexion';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator
} from "native-base";




const Item = Picker.Item;



export default class Parametre extends Component {

  logout(){
  
    //this.props.navigation.navigate("Connexion")

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Connexion'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
    firebase.auth().signOut()
    .then(function() {
     
      
      
      
      alert('A bientot ')
     
    
    
    
    })
    .catch(function(error) {
      alert(error)
    });
  }


  disable (){
    this.props.navigation.navigate("Screens")

    var user = firebase.auth().currentUser;

  user.delete().then(function() {
  alert('compte desactivé')
 
}).catch(function(error) {
  alert('something wrong')
});
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: "key1",
      results: {
        items: []
      }
    };
  }
  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color:"white"}} />
            </Button>
          </Left>
          <Body>
            <Title>Parametres</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <ListItem itemDivider>
        <Text style={{fontWeight:'bold'}}>Mon profil</Text>
        </ListItem> 
          <ListItem icon button onPress={this.logout.bind(this)}>
            <Left>
            <Image source={require('./img/logout.png')} style={{width : 30 , height : 30}}/>
            </Left>
            <Body>
              <Text>Deconnexion</Text>
            </Body>
           
          </ListItem>
          <ListItem icon button onPress={() => this.props.navigation.navigate("Infosprofile")}>
            <Left>
            <Image source={require('./img/curriculum.png')} style={{width : 30 , height : 30}}/>
            </Left>
            <Body>
              <Text>Mes infos</Text>
            </Body>
           
          </ListItem>
          <ListItem icon last button onPress={this.disable.bind(this)}>
            <Left>
            <Image source={require('./img/disable.png')} style={{width : 30 , height : 30}}/>
            </Left>
            <Body>
              <Text>Desactiver mon compte</Text>
            </Body>
            
          </ListItem>

          <ListItem itemDivider>
          <Text style={{fontWeight:'bold'}}>Configuration</Text>
          </ListItem> 


          <ListItem icon button onPress={() => this.props.navigation.navigate("typehabit")}>
            <Left>
            <Image source={require('./img/clothes.png')} style={{width : 30 , height : 30}}/>
            </Left>
            <Body>
              <Text>gerer mes types d'habit</Text>
            </Body>
            
          </ListItem>
         

          <ListItem itemDivider>
          <Text style={{fontWeight:'bold'}}>Support</Text>
          </ListItem> 

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="notifications" style={{color : "white"}}  />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
            <Right>
            <Switch value={false} onTintColor="#50B948" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="share" style={{color : "white"}} />
              </Button>
            </Left>
            <Body>
              <Text>Partager l'application</Text>
            </Body>
           
          </ListItem>
          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: "#5855D6" }}>
                <Icon active name="help" style={{color : "white"}} />
              </Button>
            </Left>
            <Body>
              <Text >some help ?</Text>
            </Body>
            <Right>
              <Text>Yes</Text>
            </Right>
          </ListItem>
            

          
         
        </Content>
      </Container>
    );
  }
}