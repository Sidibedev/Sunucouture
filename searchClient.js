import React from 'react';
import { Container, Header, Item , List ,Input , ListItem , Content , Footer, FooterTab, Button, Left , Right , Body,  Icon, Text , StyleProvider , Title } from 'native-base'
import {Image , ListView,FlatList, View , StatusBar , TouchableOpacity , Alert} from 'react-native'
import {StackNavigator} from 'react-navigation'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import axios from 'axios';
import firebase from 'firebase'
import SearchBar from 'react-native-searchbar';
import Communications from 'react-native-communications';



export default class searchClient extends React.Component {


  

  


  constructor(props) {
   super(props)
    this.state = {
        
        clients :[],
        results: [],
        emailUser : firebase.auth().currentUser.email
      
       
        
    }
    this._handleResults = this._handleResults.bind(this);
    this.back = this.back.bind(this)
    
    
}

componentDidMount() {
  this.fetchclients()
}

fetchclients () {
  
    this.setState({loading : true})
    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/tailleurs/findOne?filter[where][email]='+this.state.emailUser) // Fetching info of hospital
    .then((response) => {
      this.setState({userid : response.data.id})
     
    axios.get('https://sunucouture-api-agileague.herokuapp.com/api/clients?filter[where][idTailleur]='+response.data.id) // Fetching info of hospital
    .then((response1) => {
      
      this.setState({clients : response1.data})

      
       

       
    }) 
    }) 
  
          
}
 


  
   

   _handleResults(results) {
    this.setState({ results });
  }
 
  back(){
      this.props.navigation.goBack()
  }
  
  render() {

   
    
    return (

      

      <StyleProvider style={getTheme(platform)}>
          <Container>
                
         

             
                
              <Content>


                       


                        <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        data={this.state.clients}
                        handleResults={this._handleResults}
                        showOnLoad
                        placeholder = "Rechercher un client"
                        onBack={this.back}
                        
                        
                      />



                      
                      
                       


                        <View style={{ marginTop: 110 }}>
                        {
                          this.state.results.map((result, i) => {
                            return (
                            <ListItem key={i}>

                            <TouchableOpacity  onPress={() => {
                                Alert.alert(
                                    result.nom+' '+result.prenom,
                                    result.adresse +' '+result.telephone,
                                    [
                                      {text: 'Appeler', onPress: () => Communications.phonecall(result.telephone , isPrompt = true)},
                                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    { cancelable: false }
                                  )
                              }} style={{paddingLeft : 12 , flexDirection:'row'}} >
                              <Image source={require('./img/user.png')} style={{width : 30 , height : 30}}/>
                              <Text style={{paddingLeft : 5}}>
                                {typeof result === 'object' && !(result instanceof Array) ? result.prenom + ' ' + result.nom : result.toString()}
                              </Text>
                             
                            </TouchableOpacity>

                            
                              
                              </ListItem>
                            );
                          })
                        }

                        </View>

                   
                     
                      
                      


           
                        
                      
                        
                       

              
              </Content>
              
      
        </Container>
    </StyleProvider>

  
    
    );
  }
}




