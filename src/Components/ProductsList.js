import React, { Component } from 'react'
import { View, Text, Button, StatusBar, ScrollView } from 'react-native'
import axios from "../Utils/axios"
import { Icon } from 'native-base';
import ProductsCard from '../Components/ProductCard'
import Footer from '../Components/BottomNav'

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
      sorttype: 'desc',
      allPage: [],
      totalPrice: 0,
      category: [],
      productEdit: {},
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

  render() {

    let productCard = this.props.data.products.map(product => {
      return (
        <View key={product.id} >
          <ProductsCard products={product} />
          {/* <ProductsCard addToCart={(id) => this.addToCart(id)} deleteProduct={(id) => this.deleteProduct(id)} products={product} /> */}
        </View>
      )
    })
    return (
      <>
        <View style={{backgroundColor: 'crimson' }}>
          <Text style={{ fontSize: 35, fontWeight:'bold', alignSelf: 'center', color: '#fff' }}>Home</Text>
        </View>
        <ScrollView style={{ padding: 15 }}>

          {productCard}
        </ScrollView>

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