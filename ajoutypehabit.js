import React from 'react';
import { Image, View , TextInput , Text , StyleSheet, TouchableOpacity} from 'react-native';
import { ImagePicker} from 'expo';
import { Container, Right, Button, Header, Content, List,Icon, Title, ListItem, Thumbnail, Body , Left } from 'native-base';
import axios from 'axios'
import Elevated from 'react-native-elevated-view'
import MultiSelect from 'react-native-multiple-select';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    userid : this.props.navigation.state.params.userid,
    nomtype : '',
    nomUpdate : '',
    imageUp : null,
    selectedItems : []
  };

  

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

  addType(){
    var _this = this
    axios.post('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+this.state.userid+'/typeHabits', {
      "nom": ""+this.state.nomtype+"",
      "icon": ""+this.state.image+"",
      "idTailleur": ""+this.state.userid+"",
      "mesures" : this.state.selectedItems
    })
    .then(function (response) {
      alert('Votre type a été bien enegistré')
      _this.props.navigation.goBack()
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderTemplate(){
    const { selectedItems } = this.state;
    let { image } = this.state;
    let {imageUp} = this.state;
    if(this.props.navigation.state.params.id != null)

    {
      return (






    <View>

   

    <View style={{justifyContent:'center' , flex : 1 , alignItems:'center'}}>

     <Text style={{fontSize : 25 , fontWeight:"300" , color : '#F77062' , fontStyle:'italic' , marginTop : 20}}> Modifier les informations </Text>

    <Elevated elevation={10} style={{marginTop : 30,width:'90%' , height:'50%',flex:1}}>


    <View style={{flexDirection:'row'}}>

    <Text style={{ marginTop : 13 , fontSize : 15}}> Entrer un nom </Text>

    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
    underlineColorAndroid ='transparent'
    placeholder = {this.props.navigation.state.params.nomtype}
    autoCapitalize = "none"
    autoFocus
    placeholderTextColor='#F77062'
    selectionColor='#F77062'
    onChangeText={nomUpdate => this.setState({ nomUpdate })} />

    </View>

   

    <View style={{flexDirection : 'row'}}>

    <Text style={{ marginTop : 14 , fontSize :15}}> Attacher une image </Text>
    <TouchableOpacity style={{marginLeft : 10, marginTop : 12}} onPress={this._pickImage}> 
    <Image source={require('./img/picture.png')} style={{width : 35 , height : 35}}/>
    </TouchableOpacity>



    </View>

    


   
    </Elevated>



    {imageUp 
      ? <Image source={{ uri: imageUp }} style={{ width: 100, height: 100 }} />
      : <Image source={{ uri: this.props.navigation.state.params.url }} style={{ width: 100, height: 100 }} />
    
    }
    </View>

    
       



         <View style={{justifyContent:'center' , flex : 1 , marginTop : 20, alignItems:'center'}}>

        
    
        <Elevated elevation={10} style={{marginTop : 30,width:'90%',marginTop : 15, height:'50%',flex:1}}>
    
    
        
        <MultiSelect
        hideTags







 


        items={[{
          id: 'Poignet',
          name: 'Poignet',
        }, {
          id: 'Manche',
          name: 'Manche',
        }, {
          id: 'Hauteur',
          name: 'Hauteur',
        }, {
          id: 'cou',
          name: 'cou',
        },
         {
          id: 'Bras',
          name: 'Bras',
        }, {
          id: 'hanche',
          name: 'hanche',
        }]}
        uniqueKey="id"
        ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Selectionnez les mensurations"
        searchInputPlaceholderText="Rechercher mensuration..."
        onChangeInput={ (text)=> console.log(text)}
        tagRemoveIconColor="#F77062"
        tagBorderColor="#F77062"
        tagTextColor="#F77062"
        selectedItemTextColor="#F77062"
        selectedItemIconColor="#F77062"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#F77062' }}
        submitButtonColor="#F77062"
        submitButtonText="valider"
      />


       
        </Elevated>
    
    
        </View>
    

        <View style={{marginTop : 20}}>

       <Button style={styles.button}  onPress={this.update.bind(this)}>
                    
                <Text style={styles.text}> Modifier </Text>
        
       </Button>

      </View>
        
         
   </View>





      )
    }else {
      return (



    <View>

   

    <View style={{justifyContent:'center' , flex : 1 , alignItems:'center'}}>

     <Text style={{fontSize : 25 , fontWeight:"300" , color : '#F77062' , fontStyle:'italic' , marginTop : 20}}> Informations du type d'habit </Text>

    <Elevated elevation={10} style={{marginTop : 30,width:'90%' , height:'50%',flex:1}}>


    <View style={{flexDirection:'row'}}>

    <Text style={{ marginTop : 13 , fontSize : 15}}> Entrer un nom </Text>

    <TextInput style={{ marginTop :13 , marginLeft : 10 , width : '40%'}}
    underlineColorAndroid ='transparent'
    placeholder = "nom"
    autoCapitalize = "none"
    autoFocus
    placeholderTextColor='#F77062'
    selectionColor='#F77062'
    onChangeText={nomtype => this.setState({ nomtype })} />

    </View>

   

    <View style={{flexDirection : 'row'}}>

    <Text style={{ marginTop : 14 , fontSize :15}}> Attacher une image </Text>
    <TouchableOpacity style={{marginLeft : 10, marginTop : 12}} onPress={this._pickImage}> 
    <Image source={require('./img/picture.png')} style={{width : 35 , height : 35}}/>
    </TouchableOpacity>

    </View>


   
    </Elevated>



    {image &&
      <Image source={{ uri: image }} style={{ width: 100, height: 100 , paddingTop : 12 }} />}


    </View>

    
       



         <View style={{justifyContent:'center' , flex : 1 , marginTop : 20, alignItems:'center'}}>

        
    
        <Elevated elevation={10} style={{marginTop : 30,width:'90%',marginTop : 15, height:'50%',flex:1}}>
    
    
        
        <MultiSelect
        hideTags







 


        items={[{
          id: 'Poignet',
          name: 'Poignet',
        }, {
          id: 'Manche',
          name: 'Manche',
        }, {
          id: 'Hauteur',
          name: 'Hauteur',
        }, {
          id: 'Cou',
          name: 'cou',
        },
         {
          id: 'Bras',
          name: 'Bras',
        }, {
          id: 'hanche',
          name: 'hanche',
        }]}
        uniqueKey="id"
        ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Selectionnez les mensurations"
        searchInputPlaceholderText="Rechercher mensuration..."
        onChangeInput={ (text)=> console.log(text)}
        tagRemoveIconColor="#F77062"
        tagBorderColor="#F77062"
        tagTextColor="#F77062"
        selectedItemTextColor="#F77062"
        selectedItemIconColor="#F77062"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#F77062' }}
        submitButtonColor="#F77062"
        submitButtonText="valider"
      />


       
        </Elevated>
    
    
        </View>
    

        <View style={{marginTop : 20}}>

       <Button style={styles.button}  onPress={this.addType.bind(this)}>
                    
                <Text style={styles.text}> Ajouter </Text>
        
       </Button>

      </View>
        
         
   </View>


      )
    }
    t
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

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
                <Title>Ajout</Title>
              </Body>

              <Right>
              </Right>
             
            </Header>

            <Content>

            {this.renderTemplate()}
            
            </Content>
      </Container>

     
    );
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