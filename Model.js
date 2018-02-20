import React, { Component } from 'react';

import Masonry from 'react-native-masonry';

import { View , StyleSheet , Dimensions , ScrollView , Image , TouchableOpacity} from 'react-native';
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
    DeckSwiper,
    Icon,
    Card,
    CardItem,
  } from "native-base";
import firebase from 'firebase'
import axios from 'axios'

  


class Model extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idCatalogue : this.props.navigation.state.params.idcatalogue,
      emailUser : firebase.auth().currentUser.email,
      modeles : []
    }
    this.fetchModel()
 
  }

  fetchModel(){

    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/catalogues/'+this.state.idCatalogue+'/modeles') // Fetching info of hospital
    .then((response1) => {
      
      this.setState({modeles : response1.data})
     
       

       
    }) 
   
  }

  returnData(modeles) {
    this.setState({modeles: modeles});
  }

  deleteModel(id) {

    axios.delete('https://sunucouture-api-agileague.herokuapp.com/api/modeles/'+id)
    .then((response) => {
      this.fetchModel()
    })
  }
  
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
                        <Title style={{color : "white"}}>Modele</Title>
                    </Body>
                    <Right>

                    
                    <Button transparent onPress={() => this.props.navigation.navigate("Ajoutmodel" , {idCatalogue : this.state.idCatalogue})}>
                    <Text style={{color:"white"}}> New </Text>
                    </Button>
                    </Right>
            </Header>
            <Content>


             
          <View>
          {this.state.modeles.length > 0 ? 
          
            <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={this.state.modeles}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                 
                <Text style={{marginTop : 10 , fontSize : 25}}>pas de modeles</Text>
              </View>
            }
            
            renderItem={(item) => {

              console.log('salut ' +item)
              return (



              <Card style={{ elevation: 10 }}>
              <CardItem>
              <Text style= {{fontSize : 16 , fontWeight : 'bold'}}>Modele du catalogue</Text>
              
              </CardItem>
              <CardItem cardBody>
              {item.imgUrl != "string" ?  <Image style={{ height: 300, flex: 1 }} source={{ uri: item.imgUrl }} /> :  <Image style={{ height: 300, flex: 1 }} source={require('./img/wolof.jpg')} /> }
               
              </CardItem>
              <CardItem>
              <Text style= {{fontSize : 16 , fontWeight : 'bold'}}>{item.nom}</Text>
              </CardItem>
              <CardItem>
                
                <Text> {item.description} </Text>
              </CardItem>
              <CardItem style={{flexDirection : 'row' , justifyContent : 'space-between' , padding  : 15}}>
              
                <Text> {item.prix} FCFA</Text>

                <View style={{flexDirection : 'row'}}>
                <Button transparent onPress={() => this.deleteModel(item.id)}>
                    <Icon style={{color:"red"}} name="trash"/>
                </Button>
                <Button style={{marginLeft : 5}} transparent onPress={() => this.props.navigation.navigate("Ajoutmodel" , {idCatalogue : item.idCatalogue , nom : item.nom , description : item.description , prix : item.prix , imgUrl : item.imgUrl , id : item.id , returnData: this.returnData.bind(this)})}>
                    <Icon style={{color:"blue"}} name="create" /> 
                </Button>

                </View>
                
                
              </CardItem>

              
            </Card>

              )
            }
             

          
       
            }
          />


            :


            <Text style={{color : 'red' , alignSelf : 'center'}}>Nothing to show here , Pas de modeles pour ce catalogue</Text>


          }
         
        
          </View>
        
          <View style={{marginTop : 500, flexDirection: "row" ,justifyContent: 'space-between', padding: 15 }}>
                <Button style={{backgroundColor: '#1d3461'}} iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
                  <Icon name="arrow-back" />
                  <Text>Precedent</Text>
                </Button>
                <Button style={{backgroundColor : '#1d3461'}} iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
                 
                  <Text>Suivant</Text>
                  <Icon name="arrow-forward" />
                </Button>
         </View>


          
            </Content>
          </Container>
        );
    }
}

export default Model;