import React, { Component } from 'react';
import axios from "../Utils/axios"
import { API_BASEURL } from 'react-native-dotenv'
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base';
export default class CardShowcaseExample extends Component {
    deleteProduct = (id) => {
        axios.delete("/product/" + id)
            .then(result => {
                console.log(id)
                this.getAll()
            })
            .catch(error => {
                console.log(error.response.data.message)
                alert(error.response.data.message)
            });
    }
    render() {
        return (
            <Card style={{ flex: 0, borderRadius: 15, }}>

                <CardItem style={{ borderRadius: 15, }} >
                    <Body>
                        <Image source={{ uri: API_BASEURL + "/img/" + this.props.products.image }} style={{ alignSelf: 'center', height: 200, width: 280, flex: 1 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
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
                <CardItem style={{ borderRadius: 15, }} >
                    <Left>
                        <Button primary textStyle={{ color: '#87838B' }}>
                            <Icon type="FontAwesome5" name="cart-plus" />
                        </Button>
                        <Button transparent style={{ paddingHorizontal: 0 }} >
                            <Icon type="FontAwesome5" name="edit" />
                            <Text>Edit</Text>
                        </Button>
                        <Button transparent style={{ paddingHorizontal: 20 }} onPress={() => this.deleteProduct(this.props.products.id)}>
                            <Icon style={{ fontSize: 24, color: 'crimson', paddingHorizontal: 10 }} type="MaterialCommunityIcons" name="delete-forever" />
                            <Text style={{ paddingHorizontal: 0 }}>delete</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}