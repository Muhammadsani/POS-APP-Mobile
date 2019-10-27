import React, { Component } from 'react'
import { View, Text, ScrollView, Picker, AsyncStorage } from 'react-native'
import { Fab, Icon, Item, Input } from "native-base";
import axios from "../Utils/axios"
import ProductsCard from '../Components/ProductCard'
// import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux'
import { getProducts } from "../Public/Redux/Actions/GetProduct";


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      cart: [],
      search: '',
      sort: 'id',
      limit: '6',
      page: '1',
      sorttype: 'asc',
      allPage: [],
      totalPrice: 0,
      category: [],
      productEdit: {},
      active: false,
    }
  }

  async componentDidMount() {
    await this.getAll()
    this.getAllCategory()
  }

  getAllCategory = async () => {
    await axios.get("/categories")
      .then(async result => {
        await this.setState({ category: result.data.result })
        console.log(this.state.category)
      })
      .catch(err => {
        console.log(err)
      })
  }
  getAll = async () => {
    const { search, sort, sorttype, limit, page } = this.state
    const tes = await getProducts(search, sort, sorttype, limit, page)
    this.props.dispatch(tes)
    let allpage = []
    const currentAllpage = Math.ceil(this.props.data.totalData / this.state.limit)
    for (let i = 0; i < currentAllpage; i++) {
      allpage.push(i + 1)
    }
    this.setState({ allPage: allpage })
    console.log(this.props.data.products)
  }


  addToCart = async (product) => {
    const istoken = await AsyncStorage.getItem("token")
    const user = await AsyncStorage.getItem("email")
    if (!istoken || istoken === undefined) {
      alert("Sorry, You need to login first")
    } else {
      const exist = this.state.cart.find(({ id }) => id === product.id)
      if (exist) {
        const index = this.state.cart.findIndex(productCart => productCart.id === product.id)
        console.log(index)
        var cart = [...this.state.cart]
        if (cart[index].count < cart[index].quantity) {
          cart[index].count++
          cart[index].totalPrice = cart[index].count * cart[index].price
          const totalPrice = this.state.totalPrice + product.price
          this.setState({ cart, totalPrice })
        } else {
          alert("Sorry, stoctout!")
        }
      } else {
        if (product.quantity > 0) {
          const productWithCountPrice = { ...product, count: 1, totalPrice: product.price, user: user }
          const totalPrice = this.state.totalPrice + product.price
          this.setState({ cart: [...this.state.cart, productWithCountPrice], totalPrice })
        } else {
          alert("Sorry, stoctout!")
        }
      }
      console.log(this.state.cart)
    }
  }

  search = async (value) => {
    await this.setState({ search: value })
    this.getAll()
  }

  onValueChange = async (value) => {
    await this.setState({
      selected: value,
      sorttype: value
    });
    this.getAll()
  }

  onValueChangeSort = async (value) => {
    await this.setState({
      selected: value,
      sort: value
    });
    this.getAll()
  }

  render() {

    let productCard = this.props.data.products.map(product => {
      return (
        <View key={product.id} >
          <ProductsCard addToCart={(id) => this.addToCart(id)} products={product} />
          {/* <ProductsCard addToCart={(id) => this.addToCart(id)} deleteProduct={(id) => this.deleteProduct(id)} products={product} /> */}
        </View>
      )
    })
    return (
      <>
        <View style={{ backgroundColor: 'crimson' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>HOME</Text>
        </View>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={(value) => this.search(value)} value={this.state.search} />
          <Picker
            note
            mode="dropdown"
            style={{ color: 'crimson', width:100 }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label='ASC' value='ASC' />
            <Picker.Item label="DESC" value="DESC" />
          </Picker>
          <Picker
            note
            mode="dropdown"
            style={{ color: 'crimson', width:100 }}
            selectedValue={this.state.selected}
            onValueChangeSort={this.onValueChangeSort.bind(this)}
          >
            <Picker.Item label='NAME' value='name' />
            <Picker.Item label="PRICE" value="price" />
            <Picker.Item label="DATE UPDATE" value="date_update" />
          </Picker>
        </Item>
        <ScrollView style={{ padding: 15 }}>

          {productCard}
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.navigate('Cart', {
            cart: this.state.cart
          })} >
          <Icon name="cart" />
        </Fab>

      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.ProductsList,
  }
}

export default connect(mapStateToProps)(Home)