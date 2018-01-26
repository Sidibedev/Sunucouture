import React, { Component } from 'react';
import { Container, Image, Button ,Left , Icon ,  Right , Title,Body, Text,Header, Content, Form, Item, Input, Label , Rg } from 'native-base';
import {View , TextInput} from 'react-native'

export default class ajoutypehabit extends Component {
  render() {
    return (


        <Container>
                
                 <Header>
                   <Left> 

                   <Icon style={{color:"white"}} name="arrow-back" onPress={() => this.props.navigation.goBack()}/>

                   </Left>
                       <Body>
                           <Title style={{color : 'white'}}> Ajout d'un type habit </Title>
                       </Body>
       
                       <Right>
                      
                       </Right>
                      
                </Header>
                       
                <Content>


                
                <TextInput style = {{marginLeft:5}}
                underlineColorAndroid ='transparent'
                placeholder = "Entrer le nom du type d'habit "
                placeholderTextColor = "#F77062"
                autoCapitalize = "none"
                />
                <Button iconLeft transparent primary>
                <Icon name='beer' />
                <Text>Pub</Text>
                </Button>
                 
        
        
        
              
              
               
                
             

                </Content>
   </Container>

       

    );
  }
}