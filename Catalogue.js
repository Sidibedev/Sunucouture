import React, { Component } from 'react';
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
    Thumbnail
  } from "native-base";
  import axios from 'axios'
  import firebase from 'firebase'
export default class Catalogue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            catalogues : [],
            idta : this.props.navigation.state.params.idta
        }

        this.fetchCata()
    }


    fetchCata() {

        axios.get('https://sunucouture-api-agileague.herokuapp.com/api/catalogues?filter[where][idTypeHabit]='+this.state.idta) // Fetching info of hospital
        .then((response) => {
          this.setState({catalogues : response.data})
         
      
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
                        <Title style={{color : "white"}}>Catalogue</Title>
                    </Body>
                    <Right/>
            </Header>
            <Content>


            <ScrollView>

                    
            <View style={styles.container}>


            {this.state.catalogues.map((l, i) => {return (

                <TouchableOpacity key={i} style={styles.box} onPress={() => this.props.navigation.navigate("Model" ,  {idcatalogue : l.id})}>
                {l.imgUrl == "null" ? <Image source={require('./img/al1.png')} style={{width : 100 , height : 100}}/> :  <Image source={{ uri: l.imgUrl }}  style={{width : 100 , height : 100}} /> }
                
                <Text style={{color:"#686868" , fontWeight : 'bold' , marginTop : 5}}>{l.nom}</Text>
             
                </TouchableOpacity>

            )  })}

                

                



                 </View>



            


           </ScrollView>


             
     <View style={{marginTop : 50, alignItems:'center' , justifyContent:'center' , alignSelf:'center'}}>
          
                  
       <Button style={styles.button} onPress={() => this.props.navigation.navigate("Ajoutcatalogue")}>
       
        <Text style={styles.text}> Add new </Text>

        </Button>

    </View>
          
            </Content>
          </Container>
        );
    }
}



const styles  = StyleSheet.create({
    scrollContainer : {
        flex : 1,
    },
    box : {

        margin : 2 ,
        width : Dimensions.get('window').width/2 -6,
        justifyContent : 'center',
        alignItems : 'center',
        height:140,
  
       
       

    },
    container : {
        
        flexDirection : 'row',
        flexWrap : 'wrap',
        
        
    },
    overlay : {
        flex:1,
        
        backgroundColor : 'rgba(247, 112, 98, .4)'

    },
    top : {
        alignItems:'center',
        justifyContent : 'center'
    },
    button: {
        marginTop:15,
                // Rounded border
        borderWidth: 2,           // 2 point border widht
        borderColor: '#3b5998',   // White colored border
        paddingHorizontal: 122,    // Horizontal padding
        paddingVertical: 10,      // Vertical padding
        backgroundColor:"#3b5998",
        alignSelf:'center',
      
         
      },
    header:{
        color : '#fff',
        fontSize:15,
        alignItems:'center',
        borderColor:'#F77062',
        borderWidth: 2,
        padding : 20,
        paddingLeft : 40,
        paddingRight:40,
        backgroundColor:'#F77062'

    },
    bienvenu : {
        marginTop : 140,
        
        fontSize:18,
        color:'white',
        fontWeight : "bold"
        

        
    },
    sunu :{
        marginTop :10,
        fontSize : 28,
        color : 'white',
        fontWeight : 'bold'
    },
    textmenu : {
        fontSize : 18,
        fontWeight:'normal'
        
       
    }
})
