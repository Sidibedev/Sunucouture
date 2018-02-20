import React, { Component } from 'react';
import { View , FlatList, Animated , Image , StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Right, Button,SwipeRow, Header, Content, List,Icon, Title, ListItem, Thumbnail, Text, Body , Left } from 'native-base';
import ajoutypehabit from './ajoutypehabit'
import axios from 'axios'
import firebase from 'firebase'
import LottieView from 'lottie-react-native';
import { DangerZone } from 'expo';
import InfoText from './InfoText'
let { Lottie } = DangerZone;


export default class typehabit extends Component {

  //Constructeur

  constructor(){
    super()
    this.state = {
      typehabit : '',
      emailUser:firebase.auth().currentUser.email,
      icone:'',
      userid:'',
      refreshing : false,
      loading : true,
      

     
    }
    this.fetchType() 
   

  }


  
  handleRefresh = () => {
    this.setState(
      {
        
        refreshing: true
      },
      () => {
        this.fetchType()
      }
    );
  };
  fetchType() {
  
    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
    .then((response) => {
      this.setState({userid : response.data.id})
     
    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+response.data.id+'/typeHabits') // Fetching info of hospital
    .then((response1) => {
      
      this.setState({typehabit : response1.data , loading : false})
      console.log(this.state.typehabit)
       

       
    }) 
    }) 
    
   
  }


  componentWillReceiveProps(){
    this.forceUpdate()
  }

 

  removeType(id) {

    axios.delete('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/'+this.state.userid+'/typeHabits/'+id)
    .then((response) => {
      this.handleRefresh()
    })
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
                <Title>Types d'habits</Title>
              </Body>
              <Right> 
              <Button transparent onPress={() => this.props.navigation.navigate("ajoutypehabit" , {userid : this.state.userid})}>
              <Icon name="add-circle" style={{color:"white"}}  />
              </Button>
              </Right>
            </Header>

            <Content>


            <InfoText text="Type d'habits par defaut" />


            <ListItem>
            <Left>

            <Image source={require('./img/shirt.png')} style={{width : 30 , height : 30}}/>
            <Text> Chemise </Text>
            </Left>
           
             
            </ListItem>


            <ListItem>
            <Left>

            <Image source={require('./img/dres.png')} style={{width : 30 , height : 30}}/>
            <Text> Robe </Text>
            </Left>
           
             
            </ListItem>

         

            <InfoText text="Mes types d'habits"/>


            {this.state.typehabit == '' 
            ? 

            

              <View style ={{flex : 1 , justifyContent : 'center' , alignItems:'center'}}>

              <Text style = {{ fontSize : 20 , fontWeight : 'bold' , color : '#686868' , marginTop : 12}}> Pas encore de type d'habit</Text>

              <Image source={require('./img/sad.png')} style={{width : 45 , height : 45 , marginTop : 15}}/>


              <Button style={styles.button} onPress={() => this.props.navigation.navigate("ajoutypehabit" , {userid : this.state.userid})} >
                    
                <Text style={styles.text}> Ajouter </Text>
        
              </Button>

              </View>
          

            :

            <FlatList
            data={this.state.typehabit}
            refreshing={this.state.refreshing}
            keyExtractor={item => item.id}
            onRefresh={this.handleRefresh}
            renderItem={({ item }) => <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
                <Button primary onPress={() => this.props.navigation.navigate("ajoutypehabit" , {id : item.id , userid : this.state.userid , nomtype : item.nom , url : item.icon})} >
                  <Icon active name="create" />
                </Button>
              }
            body={
                <TouchableOpacity style={{paddingLeft : 12 , flexDirection:'row'}} onPress = {() => this.props.navigation.navigate("Catalogue" , {idta : item.id})}>
                  <Thumbnail square small source={{ uri: item.icon }} />
                  <Text style={{paddingLeft : 5}}>{item.nom}</Text>
                </TouchableOpacity>
              }
            right={
                <Button danger onPress={() => this.removeType(item.id)}>
                  <Icon active name="trash" />
                </Button>
              }
            

            
         />}
         />
          

          
           }

           
          
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
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowRadius: 10,
    shadowOpacity: 2.0
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
    marginTop:10,
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: 'white',   // White colored border
    paddingHorizontal: 70,    // Horizontal padding
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