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
                        <Image source={{ uri: "http://localhost:3020/img/" + this.props.products.image }} style={{ alignSelf: 'center', height: 200, width: 280, flex: 1 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {this.props.products.name}
                        </Text>
                        <Text style={{ fontSize: 18 }}>
                            Rp. {this.props.products.price}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {this.props.products.description}
                        </Text>
                        <Text style={{ fontSize: 16, color: 'grey' }}>
                            Stock {this.props.products.quantity}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem style={{ borderRadius: 15,alignSelf:'center'}} >
                        <Button info  onPress={() => this.props.addToCart(this.props.products)}>
                            <Icon type="FontAwesome5" name="cart-plus" />
                            <Text>Add to Cart</Text>
                        </Button>
                </CardItem>
            </Card>
        );
    }
}