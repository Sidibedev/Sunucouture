import React, { Component } from 'react';
import { Container, Text, Button , Header, Content, Left ,Form, Item, Input,Icon, Label , Body , Right,Title } from 'native-base';
import {StyleSheet, AsyncStorage , Image} from 'react-native'
import firebase from 'firebase'
import { ImagePicker} from 'expo';
import axios from 'axios'
export default class Infosprofile extends Component {

   
  constructor(){
    super()
    this.state = {
     
      emailUser:firebase.auth().currentUser.email,
      nom :'',
      prenom:'',
      tel : '',
      adresse : '',
      avatar :null,
      userId : '',
      currentNom : '',
      currentPrenom:'',
      currentTel:'',
      currentAdresse :'',
      currentAvatar:''
     
    }
   
   this.getId()
   

  }

  

  _pickImageUp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
    }
  };

  getId(){

    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
    .then((response) => {
      this.setState({userId : response.data.id})
      axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+response.data.id)
    .then((response) => {

      this.setState({currentNom : response.data.nom  , currentPrenom : response.data.prenom  , currentAdresse : response.data.adresse , currentTel : response.data.tel , currentAvatar : response.data.avatar  })

      console.log(response.data)
    })
    
    }) 
    
  }

     
  save(){
    var _this = this
     axios.put('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+this.state.userId , {
      "nom": this.state.nom,
      "prenom": this.state.prenom,
      "adresse": this.state.adresse,
      "tel": this.state.tel,
      "avatar": this.state.avatar,
      "email" : this.state.emailUser
      
     })
     .then(function (response) {
      alert('Profil mis a jour')
      _this.props.navigation.navigate("Profil")
      
    })
     
  }
     
    
  render() {
    let {avatar} = this.state
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
          <Item disabled>
          <Label style={{color : "blue"}}> Email </Label>
          <Input disabled placeholder={this.state.emailUser}/>
          <Icon name='information-circle' />
          </Item>

            <Item floatingLabel>
            <Label style={{color : "blue"}}> Nom </Label>
            <Input   onChangeText = {nom => this.setState({ nom })}/>
          </Item>


          <Item floatingLabel>
          <Label style={{color : "blue"}}> Prenom </Label>
          <Input  onChangeText = {prenom => this.setState({ prenom })}/>
        </Item>



        <Item floatingLabel>
        <Label style={{color : "blue"}}> Adresse </Label>
        <Input  onChangeText = {adresse => this.setState({ adresse })}/>
        </Item>




      <Item floatingLabel>
      <Label style={{color : "blue"}}> Telephone </Label>
      <Input  onChangeText = {tel => this.setState({ tel })}/>
      </Item>



      <Item inlineLabel>
      <Label style={{color : "blue"}}> Avatar </Label>
      <Button transparent info onPress={this._pickImageUp}>
        <Text> attacher une photo de profil</Text> 
       </Button>
      </Item>


      {avatar &&
        <Image source={{ uri: avatar }} style={{ width: 100, height: 100 , paddingTop : 12 }} />}


            
          </Form>
         

          <Button style={styles.button} onPress={this.save.bind(this)} >
                    
                <Text style={styles.text}> Valider </Text>

        
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
        paddingHorizontal: 100,    // Horizontal padding
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
       
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
})