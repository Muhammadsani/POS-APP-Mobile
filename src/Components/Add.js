import React, { Component } from 'react'
import ImagePicker from 'react-native-image-picker';
import axios from "../Utils/axios"
import { ScrollView } from 'react-native'
import { View, Text, Form, Item, Button, Input, Picker } from 'native-base'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      category: 0,
      description: '',
      image: '',
      name: "",
      price: '',
      quantity: '',
    }
  }

  componentDidMount = async () => {
    await this.getAllCategory()
  }

  getAllCategory = async () => {
    await axios.get("/categories")
      .then(result => {
        this.setState({ categories: result.data.result })
      })
      .catch(err => {
        console.log(err)
      })
    console.log(this.state.categories)
  }

  addProduct = () => {
    console.log(this.state.quantity)
    let data = new FormData();
    data.append('name', this.state.name);
    data.append('price', this.state.price);
    data.append('category', this.state.category);
    data.append('description', this.state.description);
    data.append('quantity', this.state.quantity);
    data.append("image", {
      name: this.state.image.fileName,
      type: this.state.image.type,
      uri:
        Platform.OS === "android" ? this.state.image.uri : this.state.image.uri.replace("file://", "")
    });


    axios.post('/product', data)
      .then(response => {
        console.log(response)
        alert('Success Add Product')
        this.setState({
          description: '',
          image: '',
          name: "",
          price: '',
          quantity: ''
        })
      })
      .catch(error => {
        console.log(error.response.data.message)
        // alert(error.response.data.message)
        // window.location.href = "/login"

      });
  }
  onValueChange(value) {
    this.setState({
      selected: value,
      category: value
    });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ image: response })
      }
    })
  }

  render() {
    return (
      <>
        <View style={{ backgroundColor: 'crimson' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>ADD PRODUCT</Text>
        </View>

        <ScrollView style={{ padding: 0 }}>
          <View >
            <Form style={{ borderRadius: 10 }}>
              <Item style={{ borderBottomColor: "red" }}>
                <Input placeholder="Product Name" placeholderTextColor="crimson" value={this.state.name} style={{ color: "crimson" }} onChangeText={(value) => this.setState({ name: value })} />
              </Item>
              <Item style={{ borderBottomColor: "red" }}>
                <Input placeholder="Price" placeholderTextColor="crimson" style={{ color: "crimson" }} onChangeText={(value) => this.setState({ price: value })} value={this.state.price} />
              </Item>
              <Item style={{ borderBottomColor: "red" }}>
                <Button small transparent title="Choose Photo" onPress={this.handleChoosePhoto} ><Text style={{ color: 'crimson' }}>image</Text></Button>
                <Text>{this.state.image.fileName}</Text>
                {/* <Input placeholderTextColor="crimson" style={{ color: "crimson" }} placeholder="File Image" onChangeText={(value) => this.setState({ image: value })} value={this.state.image} /> */}
              </Item>
              <Item style={{ borderBottomColor: "red" }}>
                <Picker
                  note
                  mode="dropdown"
                  style={{ color: 'crimson' }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {this.state.categories.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.id} />
                  ))}
                </Picker>
              </Item>
              <Item style={{ borderBottomColor: "red" }}>
                <Input placeholderTextColor="crimson" style={{ color: "crimson" }} placeholder="Description" onChangeText={(value) => this.setState({ description: value })} value={this.state.description} />
              </Item>
              <Item style={{ borderBottomColor: "red" }}>
                <Input placeholderTextColor="crimson" style={{ color: "crimson" }} placeholder="Quantity" onChangeText={(value) => this.setState({ quantity: value })} value={this.state.quantity} />
              </Item>
            </Form>
            <Button light style={{ marginTop: 30, alignSelf: 'center' }} onPress={() => this.addProduct()}><Text style={{ fontWeight: "bold", color: "crimson" }}> ADD </Text></Button>
          </View>
        </ScrollView>
      </>
    )
  }
}

export default Profile