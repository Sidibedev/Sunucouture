import React, { Component } from 'react';
import { View , StyleSheet , Image } from 'react-native';

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
  Icon,
  Item,
  Input,
  SwipeRow,
  Spinner
  
} from "native-base";
import {LocaleConfig} from 'react-native-calendars';
import {Agenda} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

export default class Agendas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
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
            <Title style={{color : "white"}}>Agenda</Title>
          </Body>
          <Right>
            
            <Button transparent onPress={() => this.props.navigation.navigate("searchClient")} >
              <Icon name="search" style={{color : "white"}} />
            </Button>

            </Right>
          </Header>
                   
            
            <Content>

            <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={new Date()}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            // markingType={'period'}
            // markedDates={{
            //    '2017-05-08': {textColor: '#666'},
            //    '2017-05-09': {textColor: '#666'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
             // monthFormat={'yyyy'}
             // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}

            theme={{
              
              agendaDayTextColor: '#3b5998',
              agendaDayNumColor: 'red',
              agendaTodayColor: '#F77062',
              agendaKnobColor: '#F77062'
            }}
            style={{backgroundColor : "#F77062"}}
          />
    


            </Content>

            </Container>

        );
    }
    loadItems(day) {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            const numItems = Math.floor(Math.random() * 5);
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                name: 'Rendez vous avec vendeur de tissu',
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }
        console.log(this.state.items);
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 1000);
      // console.log(`Load Items for ${day.year}-${day.month}`);
    }
  
    renderItem(item) {
      return (
        <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
      );
    }
  
    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}>
        <Text>Pas de rendez vous a cette date!</Text>

        <Button transparent info>
          <Text> Ajouter </Text>
         </Button>
        </View>
      );
    }
  
    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }
  
    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
  }

  const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30,
      flexDirection : 'row'
    }
  });






