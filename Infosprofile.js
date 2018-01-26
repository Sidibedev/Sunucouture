import React, { Component } from 'react';
import { Container, Text, Button , Header, Content, Left ,Form, Item, Input,Icon, Label , Body , Right,Title } from 'native-base';
import {StyleSheet, AsyncStorage} from 'react-native'
import firebase from 'firebase'
export default class Infosprofile extends Component {

    state = { name :'' };

    update() {


        
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: this.state.name,
    
          
        }).then(function() {
          alert('votre profil a été mis a jour')
          

        }).catch(function(error) {
         alert(error)
        });

        this.props.navigation.navigate("Menuprincipal")
       

    }
  render() {
    return (
      <Container>
      <Header>
      <Left> 
     <Icon style={{color:"white"}} name="arrow-back" onPress={() => this.props.navigation.goBack()}/>
      </Left>
          <Body>
              <Title style={{color : 'white'}}>Mes infos </Title>
          </Body>

          <Right>

          </Right>
         
   </Header>
        <Content>
          <Form>
           

            <Item fixedLabel>
            <Label>Renseigner votre nom </Label>
            <Input onChangeText = {name => this.setState({ name })}/>
          </Item>

       
            
          </Form>

          <Button style={styles.button} onPress={this.update.bind(this)} >
                    
                <Text style={styles.text}> Mettre a jour
                 </Text>
        
         </Button>
        </Content>
      </Container>
    );
  }
}
const styles  = StyleSheet.create({
    container : {
        flex : 1 ,
        justifyContent:'center',
        alignItems : 'center',
        backgroundColor: '#F77062'
    },
     connectezVous :{
      
        marginTop:30,
        fontSize: 30,
        fontWeight: "bold",
       
        textAlign: "center",
        color: "#ffffff"
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
        marginTop:15,
        borderRadius: 50,         // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#FFFFFF',   // White colored border
        paddingHorizontal: 122,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"#F77062",
        alignSelf:'center'
         
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
        fontSize: 15,
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
})