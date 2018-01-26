import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Right, Button, Header, Content, List,Icon, Title, ListItem, Thumbnail, Text, Body , Left } from 'native-base';
import ajoutypehabit from './ajoutypehabit'

export default class typehabit extends Component {
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
              <Button transparent onPress={() => this.props.navigation.navigate("ajoutypehabit")}>
              <Icon name="add-circle" style={{color:"white"}}  />
              </Button>
              </Right>
            </Header>

            <Content>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={require('./img/dress.png')} />
              <Body>
                <Text>Robe</Text>
               
              </Body>

              

            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={require('./img/dress.png')} />
              <Body>
                <Text>Chemise</Text>
               
              </Body>

              

            </ListItem>
            
          
          </List>

          
        </Content>

        </Container>
        );
    }
}

