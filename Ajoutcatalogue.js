import React, { Component } from 'react';
import { ImagePicker} from 'expo';
import { View , StyleSheet , Dimensions  ,TextInput, ScrollView , Image , TouchableOpacity} from 'react-native';
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

    Form,
    Item as FormItem 
  } from "native-base";
  const Item = Picker.Item;
  import Elevated from 'react-native-elevated-view'
  import firebase from 'firebase'
  import axios from 'axios'

export default class Ajoutcatalogue extends Component {

    constructor(){
        super()
        this.state = {
            emailUser : firebase.auth().currentUser.email,
            userid : '',
            image: null,
             nomtype : '',
            nomUpdate : '',
            imageUp : null,
            
            types: [{"id":"1110", "nom":"choisissez un type"}],
            typehabit : ''
          };
        
          this.fetchType()
    }
   
  
  fetchType() {
  
    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
    .then((response) => {
      this.setState({userid : response.data.id})
     
    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+response.data.id+'/typeHabits') // Fetching info of hospital
    .then((response1) => {
      
      this.setState({types : response1.data})
      console.log(this.state.types)
       

       
    }) 
    }) 
}

  onValueChange5(value) {
    this.setState({
      typehabit: value
    });
  }


  update(){

    var _this = this
    axios.put('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+this.state.userid+'/typeHabits/'+this.props.navigation.state.params.id, {
      "nom": ""+this.state.nomUpdate+"",
      "icon": ""+this.state.imageUp+"",
      "idTailleur": ""+this.state.userid+""
    })
    .then(function (response) {
      alert('Votre type a été bien modifié')
      _this.props.navigation.navigate("typehabit")
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  addCatalogue(){
    var _this = this
    axios.post('https://sunucouture-api-agileague.herokuapp.com/api/catalogues', {
      "nom": ""+this.state.nomtype+"",
      "imgUrl": ""+this.state.image+"",
      "idTypeHabit": ""+this.state.typehabit+""
    })
    .then(function (response) {
      alert('Votre Catalogue a été bien enegistré')
     
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


  _pickImageUp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ imageUp: result.uri });
    }
  };


    render() {
        let { image } = this.state;
        let {imageUp} = this.state;
        return (
            <Container style={{backgroundColor : "white"}}>
            <Header style={{backgroundColor : '#F77062'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Text style={{color:"white"}}> Back </Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color : "white"}}>Ajout Catalogue</Title>
                    </Body>
                    <Right/>
            </Header>
            <Content>


         
    <View>

   

    <View style={{justifyContent:'center' , flex : 1 , alignItems:'center'}}>

     <Text style={{fontSize : 25 , fontWeight:"300" , color : 'grey' , fontStyle:'normal' , marginTop : 20}}> Informations du Catalogue </Text>

    <Elevated elevation={10} style={{marginTop : 30,width:'90%' , height:'50%',flex:1}}>


    <View style={{flexDirection:'row'}}>

    <Text style={{ marginTop : 13 , fontSize : 15 , color : 'grey'}}> Entrer un nom </Text>

    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
    underlineColorAndroid ='transparent'
    placeholder = "nom"
    autoCapitalize = "none"
    autoFocus
    placeholderTextColor='#F77062'
    selectionColor='#F77062'
    onChangeText={nomtype => this.setState({ nomtype })} />

    </View>

   

    <View style={{flexDirection : 'row' , marginTop : 15}}>

    <Text style={{ marginTop : 15 , fontSize :15 , color : 'grey'}}> Attacher une image </Text>
    <TouchableOpacity style={{marginLeft : 10, marginTop : 12}} onPress={this._pickImage}> 
    <Image source={require('./img/picture.png')} style={{width : 35 , height : 35}}/>
    </TouchableOpacity>

    {image &&
        <Image source={{ uri: image }} style={{ width: 100, height: 100 , paddingTop : 12 }} />}
  

    </View>


    <View style={{flexDirection : 'row' , marginTop : 15}}>

   
    <TouchableOpacity style={{marginLeft : 10, marginTop : 12}}> 
   

    <Text style={{fontSize :15 , color : 'grey'}}> Type d'habits </Text>

    <Form> 
  
    <Picker
      mode="dropdown"
      headerStyle={{ backgroundColor: "#F5A623" }}
      headerBackButtonTextStyle={{ color: "#fff" }}
      headerTitleStyle={{ color: "#fff" }}
      selectedValue={this.state.typehabit}
      onValueChange={this.onValueChange5.bind(this)}
    >
   
    {this.state.types.map((l, i) => {return  <Item value={l.id} label={l.nom} key={i}  /> })}
    </Picker>
  </Form>
    </TouchableOpacity>

    </View>


   
    </Elevated>



    {image &&
      <Image source={{ uri: image }} style={{ width: 100, height: 100 , paddingTop : 12 }} />}


    </View>

    
       



       
    

        <View style={{marginTop : 20}}>

       <Button style={styles.button}  onPress={this.addCatalogue.bind(this)}>
                    
                <Text style={styles.text}> Ajouter </Text>
        
       </Button>

      </View>
        
         
   </View>



            


           


     
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
        backgroundColor: 'white'
    },
    containerel : {
      flex: 1,
      backgroundColor: 'white'
    },
    stayElevated: {
      width: '90%',
      height: '40%',
      margin: 5,
      backgroundColor: 'white',
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
      marginTop:25,
      borderRadius: 50,         // Rounded border
      borderWidth: 2,           // 2 point border widht
      borderColor: 'white',   // White colored border
      paddingHorizontal: 122,    // Horizontal padding
      paddingVertical: 10,      // Vertical padding
      backgroundColor:"white",
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
        color: '#F77062',
        fontWeight: 'bold',
       
        
      },
      textgoogle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        
      },
      
    
  })