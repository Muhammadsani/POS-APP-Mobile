import React, { Component } from 'react'
// import { View, Text, Button} from 'react-native'
import { View, Text, Card, CardItem, Button } from 'native-base'
import { ScrollView } from 'react-native'
import ProductsCard from '../Components/CartCard'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.navigation.getParam('cart'),
    }
  }

  render() {
    let productCard = this.state.cart.map(product => {
      return (
        <View key={product.id} >
          <ProductsCard products={product} />
          {/* <ProductsCard addToCart={(id) => this.addToCart(id)} deleteProduct={(id) => this.deleteProduct(id)} products={product} /> */}
        </View>
      )
    })
    return (
      <>

        <ScrollView style={{ padding: 15 }}>

          {productCard}
        </ScrollView>
      </>
    )
  }
}

export default Cart