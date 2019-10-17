import React, { Component } from 'react'
// import { View, Text, Button} from 'react-native'
import { View, Text, Card, CardItem, Button } from 'native-base'

class Profile extends Component {

  render() {
    return (
      <>
        <View style={{ backgroundColor: 'crimson' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>CART</Text>
        </View>
        <View style={{ padding: 20, backgroundColor: 'black' }}>
          <Card style={{ borderWidth: 40, borderColor: 'black', margin: 20, padding: 20, borderRadius: 15 }}>
            <CardItem>
              <Text>k</Text>
            </CardItem>
            <CardItem>
              <Text>jhjhk</Text>
            </CardItem>
          </Card>
        </View>
        <View>
          <Button danger onPress={() => this.props.navigation.navigate('Home')} >
            <Text>Go to Home</Text>
          </Button>
        </View>
      </>
    )
  }
}

export default Profile