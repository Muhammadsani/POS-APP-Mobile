import React, { Component } from 'react';
import axios from "../Utils/axios"
import { API_BASEURL } from 'react-native-dotenv'
import { Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, View } from 'native-base';
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
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 2 }}>
                            <Image source={{ uri:"http://localhost:3020/img/" + this.props.products.image }} style={{ alignSelf: 'center', height: 60, width: 75, flex: 1 }} />
                        </View>
                        <View style={{ flex: 4, flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {this.props.products.name}
                            </Text>
                            <Text style={{ fontSize: 18 }}>
                                Rp. {this.props.products.price}
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Button success style={{ marginHorizontal: 0 }} >
                                    <Icon style={{ fontSize: 18, }} type="FontAwesome5" name="plus" />
                                </Button>
                                <Button transparent style={{ marginHorizontal: 0 }} >
                                    <Text>{this.props.products.count} </Text>
                                </Button>
                                <Button danger onPress={() => this.deleteProduct(this.props.products.id)}>
                                    <Icon style={{ fontSize: 20, }} type="FontAwesome5" name="minus" />
                                </Button>
                            </View>
                        </View>
                    </View>
                </CardItem>
                <CardItem style={{ borderRadius: 15, alignSelf: 'center' }} >

                </CardItem>
            </Card>
        );
    }
}