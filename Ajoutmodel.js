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

export default class Ajoutmodel extends Component {

    constructor(props){
        super(props)
        this.state = {
            emailUser : firebase.auth().currentUser.email,
            userid : '',
            image: null,
             nom : '',
             description : '',
             prix : 0,
            nomUpdate : '',
            modeles : [],
            imageUp : null,
            idCatalogue : this.props.navigation.state.params.idCatalogue
            
          };
        
        
         
    }
   
 

  updateModel(){
    var _this = this
    axios.put('https://sunucouture-api-agileague.herokuapp.com/api/modeles/'+this.props.navigation.state.params.id , {
      "nom":this.state.nom != ''?""+this.state.nom+"":""+ this.props.navigation.state.params.nom +"",
      "description":this.state.description != ''?""+this.state.description+"":""+ this.props.navigation.state.params.description +"",
      "prix": this.state.prix != ''?""+this.state.prix+"":""+ this.props.navigation.state.params.prix +"",
      "imgUrl":this.state.image != null ?""+this.state.image+"":""+ this.props.navigation.state.params.imgUrl +"",
      "idCatalogue": ""+this.state.idCatalogue+""
    })
    .then(function (response) {
      alert('Votre Model a été bien modifié')
     
     
      
    })
    .catch(function (error) {
      console.log(error);
    });


  
  }

  addModel() {


    var _this = this
    axios.post('https://sunucouture-api-agileague.herokuapp.com/api/catalogues/'+this.state.idCatalogue+'/modeles' , {
      "nom": ""+this.state.nom+"",
      "description": ""+this.state.description+"",
      "prix": ""+this.state.prix+"",
      "imgUrl": ""+this.state.image+"",
      "idCatalogue": ""+this.state.idCatalogue+""
    })
    .then(function (response) {
      alert('Votre Model a été bien ajouté')
     
      
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
                        <Title style={{color : "white"}}>{this.props.navigation.state.params.id ? 'Modifier Model' : 'Ajouter Modele'}</Title>
                    </Body>
                    <Right/>
            </Header>
            <Content>


         
    <View>

   

    <View style={{justifyContent:'center' , flex : 1 , alignItems:'center'}}>

     <Text style={{fontSize : 25 , fontWeight:"300" , color : 'grey' , fontStyle:'normal' , marginTop : 20}}> Informations du Model </Text>

    <Elevated elevation={10} style={{marginTop : 30,width:'90%' , height:'50%',flex:1}}>


    <View style={{flexDirection:'row'}}>

    <Text style={{ marginTop : 13 , fontSize : 15 , color : 'grey'}}> Entrer Le nom </Text>

    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
    underlineColorAndroid ='transparent'
    placeholder = {this.props.navigation.state.params.id  ? this.props.navigation.state.params.nom : "nom"}
    autoCapitalize = "none"
    autoFocus
    placeholderTextColor='#F77062'
    selectionColor='#F77062'
    onChangeText={nom => this.setState({ nom })} />

    </View>


    <View style={{flexDirection:'row'}}>

    <Text style={{ marginTop : 13 , fontSize : 15 , color : 'grey'}}> Entrer une dscription </Text>

    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
    underlineColorAndroid ='transparent'
    placeholder = {this.props.navigation.state.params.id  ? this.props.navigation.state.params.description : "description"}
    autoCapitalize = "none"
    
    multiline = {true}
    numberOfLines = {2}
    placeholderTextColor='#F77062'
    selectionColor='#F77062'
    onChangeText={description => this.setState({ description })} />

    </View>

    <View style={{flexDirection:'row'}}>

    <Text style={{ marginTop : 13 , fontSize : 15 , color : 'grey'}}> Entrer Le prix </Text>

    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
    underlineColorAndroid ='transparent'
    placeholder = {this.props.navigation.state.params.id  ? ""+this.props.navigation.state.params.prix : "prix"}
    autoCapitalize = "none"
    
    placeholderTextColor='#F77062'
    selectionColor='#F77062'
    onChangeText={prix => this.setState({ prix })} />

    </View>
   

    <View style={{flexDirection : 'row' , marginTop : 15}}>

    <Text style={{ marginTop : 15 , fontSize :15 , color : 'grey'}}> Attacher une image </Text>
    <TouchableOpacity style={{marginLeft : 10, marginTop : 12}} onPress={this._pickImage}> 
    <Image source={require('./img/picture.png')} style={{width : 35 , height : 35}}/>
    </TouchableOpacity>

    {image &&
        <Image source={{ uri: image }} style={{ width: 100, height: 100 , paddingTop : 12 }} />}
  

        {this.props.navigation.state.params.id &&
          <Image source={{ uri: this.props.navigation.state.params.imgUrl }} style={{ width: 100, height: 100 , paddingTop : 12 }} />}
    

    </View>


    

   
    </Elevated>



    </View>

    
       



       
    

        <View style={{marginTop : 20}}>

       <Button style={styles.button}  onPress={this.props.navigation.state.params.id ? this.updateModel.bind(this) : this.addModel.bind(this)}>
                    
                <Text style={styles.text}> {this.props.navigation.state.params.id ? 'Modifier' : 'Ajouter'} </Text>
        
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
      borderColor: '#1d3461',   // White colored border
      paddingHorizontal: 122,    // Horizontal padding
      paddingVertical: 10,      // Vertical padding
      backgroundColor:"#1d3461",
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