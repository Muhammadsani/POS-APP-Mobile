import React, { Component } from 'react'
import { StyleSheet, ImageBackground, View, AsyncStorage, ToastAndroid } from "react-native";
import axios from "../Utils/axios"
import BGimage from "../asset/bg.jpg";
import { Container, Header, Content, Form, Item, Input, Button, Text, Title } from 'native-base'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      test: 'h',
      message: '',
    }
  }

  login = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/user/login', data)
        .then(async(res) => {
          this.setState({ test: res.data.token })
          this.setState({ message: 'Success Login'})
          await AsyncStorage.setItem('token', res.data.token)
          await AsyncStorage.setItem('email', res.data.email)
          console.log(res.data.token)
          this.props.navigation.navigate('Main')
          // storage.set('token', res.data.token)
          // storage.set('email', this.state.email)

          // resolve()
          // window.location.href = "/"
        }).catch((err) => {
          console.log(err.response.data.message)

          ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT)
          //alert(err.response.data.message)
        })
    })
  }


  render() {
    return (

      <ImageBackground source={BGimage} style={style.container}>
        <View style={style.inner}>
          <Text style={style.title}>Yok Makan!</Text>
          <Form style={{ borderRadius: 10 }}>
            <Item style={{ borderBottomColor: "red" }}>
              <Input placeholder="Username" placeholderTextColor="crimson" value={this.state.email} style={{ color: "crimson" }} onChangeText={(value) => this.setState({ email: value })} />
            </Item>
            <Item style={{ borderBottomColor: "red" }}>
              <Input secureTextEntry placeholder="Password" placeholderTextColor="crimson" style={{ color: "crimson" }} onChangeText={(value) => this.setState({ password: value })} value={this.state.password} />
            </Item>
          </Form>
          <Button light style={{ marginTop: 30, alignSelf: 'center' }} onPress={() => this.login({ email: this.state.email, password: this.state.password })}><Text style={{ fontWeight: "bold", color: "crimson" }}> LOGIN </Text></Button>
        </View>
      </ImageBackground>

    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: '90%',
    padding: 20,
    height: 'auto',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.8)',

  },
  title: {
    fontWeight: "bold",
    color: "crimson",
    alignSelf: "center",
    fontSize: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  }
});

export default Profile