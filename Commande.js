import React, { Component } from 'react';
import {View , FlatList} from 'react-native'
import axios from 'axios'
import ToggleSwitch from 'toggle-switch-react-native'
import { Container, Header,List ,  Spinner,Switch , ListItem , Left, Body, Right, Title , Button, Icon, Segment, Content, Text } from 'native-base'
class Commande extends Component {

    constructor(props) {

        super(props)
        this.state = {
            seg : 1,
            commandes : [],
            loading : false,
            switchvalue : false,
            refreshing : false
        }
    }

    componentDidMount(){
      this.fetchCommande()
    }


    renderButtonOrSpinner() {
      if (this.state.loading) {
          return <Spinner color="#F77062" />;    
      }
      
  }

  delete(id) {

    axios.delete('https://sunucouture-api-agileague.herokuapp.com/api/commandes/'+id)
    .then((response) => {
      alert('Commande supprimée')
    //  this.handleRefresh()
    })
  }

    fetchCommande() {
      this.setState({loading : true})
      axios.get('https://sunucouture-api-agileague.herokuapp.com/api/commandes')
      .then((response) => {
          this.setState({commandes : response.data , loading : false})
          
         })
     .catch(function (error) {
          console.log(error);
        });

    }

    renderListencoursOrNot() {
      if (this.state.commandes === []) {
        return (


          <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center' , marginTop : 20}}>

          <Text style = {{ fontSize : 20 , fontWeight : 'bold' , color : '#686868' , marginTop : 12}}> Pas encore de commandes</Text>

          <Image source={require('./img/sad.png')} style={{width : 45 , height : 45 , marginTop : 15}}/>

          </View>

        )
      }else {
        return (


          <FlatList
          data={this.state.commandes.filter(function (el) {
            return el.statut === false 
                   
          })}
            refreshing={this.state.refreshing}
            keyExtractor={item => item.id}
            onRefresh={this.handleRefresh}
            renderItem={({item}) => {

              return (

             <ListItem icon style={{marginTop : 12}}>
              <Left>
                <Icon name="ios-reorder" color="#3b5998" />
              </Left>
              <Body>
                <Text style={{fontSize : 15}}> {item.prenomClient} {item.nomClient} - {item.nomType}</Text>
                <View style={{flexDirection : 'row' , marginLeft : 5}}>
                <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
                <Text note style={{marginLeft : 5}}>{item.date}</Text>
                </View>
                
                

                
              
              </Body>
              <Right>


              <ToggleSwitch
                isOn={this.state.switchvalue}
                onColor='#6cb254'
                offColor='gray'
                
                size='small'
                onToggle={ (isOn) => this.changeValue(item.id) }
              />
              
              </Right>
            </ListItem>
              )

            } 
            
          }
            
         />


        )
      }
    }

    changeValue(id) {

     const  _this = this

     this.setState({switchvalue : true})
     axios.get('https://sunucouture-api-agileague.herokuapp.com/api/commandes/'+id) //
     .then((response) => {


      console.log(response.data.date)

      axios.put('https://sunucouture-api-agileague.herokuapp.com/api/commandes/'+id, {
       
        "date": ""+response.data.date+"",
        "statut": true,
         "nomClient": ""+response.data.nomClient+"",
       "prenomClient": ""+response.data.prenomClient+"",
        "nomType": ""+response.data.nomType+"",
      "idTypeHabit": ""+response.data.idTypeHabit+"",
     "idClient": ""+response.data.idClient+"",
     "idTailleur": ""+response.data.idTailleur+""

        
       

      })
      .then(function (response) { 
        alert('Vous avez terminé votre commande')
        
        _this.handleRefresh()
        
      })
      .catch(function (error) {
        console.log(error);
      });
       

        
     }) .catch(function (error) {
      console.log(error);
    });

     

    }


    handleRefresh = () => {
      this.setState(
        {
          
          refreshing: true
        },
        () => {
          this.fetchCommande()
        }
      );
    };

   

    


    render() {
    
        return (
            <Container>
            <Header hasTabs  style={{backgroundColor : '#F77062'}}>

          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Text style={{color:"white"}}> Back </Text>
            </Button>
            </Left>
                 
            <Body>
                <Title  style={{color : 'white'}}>Commandes</Title>
            </Body>

            <Right>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="search" style={{color : "white"}}/>
            </Button>
            </Right>
          
            </Header>

            <Segment style={{backgroundColor:'#F77062'}}>

                            <Button first
                            active={this.state.seg === 1 ? true : false}
                            onPress={() => this.setState({ seg: 1 })}
                            >
                                <Text style={{color:'white'}}>En cours</Text>
                            </Button>
                            
                            <Button 
                            active={this.state.seg === 2 ? true : false}
                            onPress={() => this.setState({ seg: 2 })}
                            >
                                <Text style={{color:'white'}}>Terminés</Text>
                            </Button>
         </Segment>

         <Content padder style={{backgroundColor : "white"}}>


         {this.renderButtonOrSpinner()}

         {this.state.seg === 1 ? 

          
         

          this.renderListencoursOrNot()
            

            :

          
            <FlatList
            data={this.state.commandes.filter(function (el) {
              return el.statut === true 
                     
            })}
              refreshing={this.state.refreshing}
              keyExtractor={item => item.id}
              onRefresh={this.handleRefresh}
              renderItem={({item}) => {
  
                return (
  
               <ListItem icon style={{marginTop : 12}}>
                <Left>
                  <Icon name="ios-reorder" color="#3b5998" />
                </Left>
                <Body>
                  <Text style={{fontSize : 15}}> {item.prenomClient} {item.nomClient} - {item.nomType}</Text>
                  <View style={{flexDirection : 'row'}}>
                  <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
                  <Text note style={{marginLeft : 5}}>{item.date}</Text>
                  </View>
                  
                  
  
                  
                
                </Body>
                
              </ListItem>
                )
  
              } 
              
            }
              
           />
  
  

        }

         </Content>
            
          </Container>
        );
    }
}

export default Commande;