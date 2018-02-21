import React, { Component } from 'react';
import {View} from 'react-native'
import { Container, Header,List , Switch , ListItem , Left, Body, Right, Title , Button, Icon, Segment, Content, Text } from 'native-base'
class Commande extends Component {

    constructor(props) {

        super(props)
        this.state = {
            seg : 1
        }
    }
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

         {this.state.seg === 1 ? 

            <List>
            <ListItem icon style={{marginTop : 12}}>
              <Left>
                <Icon name="ios-reorder" color="#3b5998" />
              </Left>
              <Body>
                <Text style={{fontSize : 15}}> Boubou 3 pieces - Moussa Ndiaye</Text>
                <View style={{flexDirection : 'row'}}>
                <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
                <Text note style={{marginLeft : 5}}>15/ 09 / 10</Text>
                </View>
                
                

                
              
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>


            <ListItem icon style={{marginTop : 12}}> 
            <Left>
              <Icon name="ios-reorder" color="#3b5998" />
            </Left>
            <Body>
              <Text style={{fontSize : 15}}> Boubou 3 pieces - Moussa Ndiaye</Text>
              <View style={{flexDirection : 'row'}}>
              <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
              <Text note style={{marginLeft : 5}}>15/ 09 / 10</Text>
              </View>
              
              

              
            
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>

          <ListItem icon style={{marginTop : 12}}>
          <Left>
            <Icon name="ios-reorder" color="#3b5998" />
          </Left>
          <Body>
            <Text style={{fontSize : 15}}> Boubou 3 pieces - Moussa Ndiaye</Text>
            <View style={{flexDirection : 'row'}}>
            <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
            <Text note style={{marginLeft : 5}}>15/ 09 / 10</Text>
            </View>
            
            

            
          
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>


        <ListItem icon style={{marginTop : 12}}>
        <Left>
          <Icon name="ios-reorder" color="#3b5998" />
        </Left>
        <Body>
          <Text style={{fontSize : 15}}> Boubou 3 pieces - Moussa Ndiaye</Text>
          <View style={{flexDirection : 'row'}}>
          <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
          <Text note style={{marginLeft : 5}}>15/ 09 / 10</Text>
          </View>
          
          

          
        
        </Body>
        <Right>
          <Switch value={false} />
        </Right>
      </ListItem>

      <ListItem icon style={{marginTop : 12}}>
      <Left>
        <Icon name="ios-reorder" color="#3b5998" />
      </Left>
      <Body>
        <Text style={{fontSize : 15}}> Boubou 3 pieces - Moussa Ndiaye</Text>
        <View style={{flexDirection : 'row'}}>
        <Icon name="ios-calendar-outline" color="#3b5998" style={{fontSize : 15}} />
        <Text note style={{marginLeft : 5}}>15/ 09 / 10</Text>
        </View>
        
        

        
      
      </Body>
      <Right>
        <Switch value={false} />
      </Right>
    </ListItem>
            
            </List>

            :

            <List>
            <ListItem icon style={{marginTop : 12}}>
              <Left>
                <Icon name="ios-reorder" color="#3b5998" />
              </Left>
              <Body>
                <Text style={{fontSize : 14}}> Boubou 3 pieces - Moussa Ndiaye</Text>
                
                
                <Text note style={{marginLeft : 5}}>Terminé le 12/ 09 / 10</Text>
                
                
                

                
              
              </Body>
              <Right>
                <Button danger transparent> 
                <Text style={{fontSize : 12}}> Supprimer </Text>
                </Button>
              </Right>
            </ListItem>


            <ListItem icon style={{marginTop : 12}}>
              <Left>
                <Icon name="ios-reorder" color="#3b5998" />
              </Left>
              <Body>
                <Text style={{fontSize : 14}}> Boubou 3 pieces - Moussa Ndiaye</Text>
                
                
                <Text note style={{marginLeft : 5}}>Terminé le 12/ 09 / 10</Text>
                
                
                

                
              
              </Body>
              <Right>
                <Button danger transparent> 
                <Text style={{fontSize : 12}}> Supprimer </Text>
                </Button>
              </Right>
            </ListItem>


            <ListItem icon style={{marginTop : 12}}>
              <Left>
                <Icon name="ios-reorder" color="#3b5998" />
              </Left>
              <Body>
                <Text style={{fontSize : 14}}> Boubou 3 pieces - Moussa Ndiaye</Text>
                
                
                <Text note style={{marginLeft : 5}}>Terminé le 15/ 09 / 10</Text>
                
                
                

                
              
              </Body>
              <Right>
                <Button danger transparent> 
                <Text style={{fontSize : 12}}> Supprimer </Text>
                </Button>
              </Right>
            </ListItem>


            <ListItem icon style={{marginTop : 12}}>
              <Left>
                <Icon name="ios-reorder" color="#3b5998" />
              </Left>
              <Body>
                <Text style={{fontSize : 15}}> Boubou 3 pieces - Moussa Ndiaye</Text>
                
                
                <Text note style={{marginLeft : 5}}>Terminé le 15/ 09 / 10</Text>
                
                
                

                
              
              </Body>
              <Right>
                <Button danger transparent> 
                    <Text style={{fontSize : 12}}> Supprimer </Text>
                </Button>
              </Right>
            </ListItem>
            </List>

         }

         </Content>
            
          </Container>
        );
    }
}

export default Commande;