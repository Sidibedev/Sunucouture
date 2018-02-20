import React, { Component } from "react";
import { Platform , Image  , StyleSheet} from "react-native";
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import Connexion from './Connexion';
import { Share } from 'react-native';
import Communications from 'react-native-communications';
import { ListItem , List } from 'react-native-elements'
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
  Separator
} from "native-base";
import Icon from './Icon'
import InfoText from './InfoText'





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


  Share() {
    Share.share({
      message:'Sunucouture est une application mobile qui aide les tailleurs dans la gestion de leur atelier',
      url: 'https://sunucouture-api-agileague.herokuapp.com/',
      title: 'Sunucouture , the tailor app'
    }, {
      // Android only:
      dialogTitle: 'Partager Sunucouture aux autres tailleurs',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  

  sendmail() {
    let email = 'contact@sunucouture.sn'
    Communications.email(email, null, null, null, 'Via Sunucouture')
  
  }

  noter(){

    Communications.web('https://play.google.com/store')
  }
  propos() {
    Communications.web('https://sunucouture-api-agileague.herokuapp.com')
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
           <Text style={{color:"white"}}> Back </Text>
            </Button>
          </Left>
          <Body>
            <Title style={{color : "white"}}>Parametres</Title>
          </Body>
          <Right />
        </Header>

        <Content>

        <InfoText text="Compte" />
        <List containerStyle={styles.listContainer}>
         



         <ListItem
            title="Deconnexion"
            
            onPress={this.logout.bind(this)}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                raised
                containerStyle={{ backgroundColor: '#F77062' }}
                icon={{
                  name: 'logout',
                  type:'material-community'
                }}
              />
            }
          />

         


          <ListItem
            title="Mettre a jour mes informations"
            
            onPress={() => this.props.navigation.navigate("Infosprofile")}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                containerStyle={{ backgroundColor: '#96ceb4' }}
                icon={{
                  name: 'update',
                }}
              />
            }
          />


          <ListItem
            title="Mon profil"
            
            onPress={() => this.props.navigation.navigate("Profil")}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                containerStyle={{ backgroundColor: '#03396c' }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
          />


          <ListItem
          title="Desactiver mon compte"
          
          onPress={this.disable.bind(this)}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <Icon
              containerStyle={{ backgroundColor: '#ae5a41' }}
              icon={{
                name: 'sync-disabled',
              }}
            />
          }
        />
         
          

        <InfoText text="Configuration"/>

        

          
          

          <ListItem
          title="Gestion des types d'habits"
          
          onPress={() => this.props.navigation.navigate("typehabit")}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <Icon
              containerStyle={{ backgroundColor: '#FAD291' }}
              icon={{
                type: 'entypo',
                name: 'light-bulb'
              }}
            />
          }
        />

 

        <ListItem
            switchButton
            hideChevron
            title="Notifications"
            switched={this.state.pushNotifications}
            onSwitch={this.onChangePushNotifications}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                containerStyle={{
                  backgroundColor: '#a32020',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />
         

         

          <InfoText text="Support" />


          <ListItem
          title="Partager"
          
          onPress={this.Share.bind(this)}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <Icon
              containerStyle={{ backgroundColor: '#be29ec' }}
              icon={{
                name: 'share',
              }}
            />
          }
        />


        <ListItem
        title="send feeback"
        onPress={this.sendmail.bind(this)}
        containerStyle={styles.listItemContainer}
        leftIcon={
          <Icon
            containerStyle={{
              backgroundColor: '#00C001',
            }}
            icon={{
              type: 'materialicon',
              name: 'feedback',
            }}
          />
        }
      />


          
          
      <ListItem
      title="Noter l'app"
      onPress={this.noter.bind(this)}  
      containerStyle={styles.listItemContainer}
      leftIcon={
        <Icon
          containerStyle={{
            backgroundColor: '#FECE44',
          }}
          icon={{
            type: 'entypo',
            name: 'star',
          }}
        />
      }
    />


    <ListItem
    title="A propos de nous"
    onPress={this.propos.bind(this)}
    containerStyle={styles.listItemContainer}
    leftIcon={
      <Icon
        containerStyle={{ backgroundColor: '#A4C8F0' }}
        icon={{
          type: 'ionicon',
          name: 'md-information-circle',
        }}
      />
    }
  />
       

      </List>

          
         
        </Content>
      </Container>
    );
  }
}

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
})
