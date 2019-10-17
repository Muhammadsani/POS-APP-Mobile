import React, { Component } from 'react';
import {  StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
export default class FooterTabsBadgeExample extends Component {
  render() {
    return (
        
        <Footer>
          <FooterTab style={style.FooterTab}>
            <Button  vertical>
              <Icon name="home" style={style.title}/>
              <Text  style={style.title}>Home</Text>
            </Button>
            <Button active badge vertical style={style.active}>
              <Badge info ><Text>51</Text></Badge>
              <Icon active name="cart"style={style.active} />
              <Text>CRAT</Text>
            </Button>
            <Button vertical >
              <Icon name="paper" style={style.title} />
              <Text style={style.title}>HISTORY</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}
const style = StyleSheet.create({
    FooterTab: {
        backgroundColor: '#fff',
    },
    title: {
        color: 'crimson',
    },
    active: {
        backgroundColor: 'crimson',
        color: '#fff',
    },
});