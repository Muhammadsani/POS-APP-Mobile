import React, { Component } from 'react';
import { API_BASEURL } from 'react-native-dotenv'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class CardShowcaseExample extends Component {
    render() {
        return (
            <Card style={{ flex: 0 }}>

                <CardItem>
                    <Body>
                        <Image source={{ uri: API_BASEURL + "/img/" + this.props.products.image }} style={{ alignSelf: 'center', height: 200, width: 280, flex: 1 }} />
                        <Text style={{ fontSize: 18, fontWeight:'bold' }}>
                            {this.props.products.name}
                        </Text>
                        <Text style={{ fontSize: 18 }}>
                            {this.props.products.price}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {this.props.products.description}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent textStyle={{ color: '#87838B' }}>
                            <Icon name="logo-github" />
                            <Text>1,926 stars</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}