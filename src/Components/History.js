import React, { Component } from 'react'
import axios from "../Utils/axios"
import { ScrollView } from 'react-native'
import { View, Text, Card, CardItem, Button, Body } from 'native-base'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
      orderItem: [],
      receiptNo: '',
      year: 0,
      month: 0,
      orderInWeek: 0,
      orderLastWeek: 0,
      totalOrder: 0,
      incomeToday: 0,
      incomeyesterday: 0,
      incomeInYear: 0,
      orderBy: 'day',
      chart: [],
      page: '1',
      allPage: [],

    }
  }

  async componentDidMount() {
    await this.setState({ year: new Date().getFullYear() })
    await this.setState({ month: new Date().getMonth() + 1 })
    this.getOrder()
    this.getOrderItemAll()
    this.getIncomeToday()
    this.getRevenue()
    this.getIncomeinYear()
    this.getOrderInWeek()
    this.getOrderLastWeek()

    console.log(this.state.month)
  }

  getOrder = async () => {
    await axios.get(`/orders/order?month=${this.state.month}&year=${this.state.year}&page=${this.state.page}`)
      .then(result => {
        this.setState({ order: result.data.result })
        console.log(result.data.totalData)

        let allpage = []
        const currentAllpage = Math.ceil(result.data.totalData / 20)
        for (let i = 0; i < currentAllpage; i++) {
          allpage.push(i + 1)
        }
        this.setState({ allPage: allpage })

      })
      .catch(err => {
        console.log(err)
      })

  }

  // pageChange = async (page) => {
  //     await this.setState({ page: page })
  //     this.getOrder()
  // }

  getOrderItemAll = async () => {
    await axios.get(`/orders/orderitem`)
      .then(result => {
        this.setState({ orderItem: result.data.result })
      })
      .catch(err => {
        console.log(err)
      })
    console.log(this.state.orderItem)
    let total = 0
    this.state.orderItem.forEach(item => {
      total = total + item.quantity
    })
    this.setState({ totalOrder: total })
  }

  getOrderInWeek = async () => {
    let total = 0
    await axios.get(`/orders/getorderinweek`)
      .then(result => {
        result.data.result.forEach(item => {
          total = total + item.quantity
        })
        this.setState({ orderInWeek: total })
        console.log(this.state.orderInWeek)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getOrderLastWeek = async () => {
    let total = 0
    await axios.get(`/orders/getorderlastweek`)
      .then(result => {
        result.data.result.forEach(item => {
          total = total + item.quantity
        })
        this.setState({ orderLastWeek: total })
        console.log(this.state.orderLastWeek)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getIncomeToday = async () => {
    await axios.get(`/orders/getincometoday`)
      .then(result => {
        let incomeToday = result.data.result[0].income ? result.data.result[0].income : 0
        this.setState({ incomeToday: incomeToday, incomeyesterday: result.data.result[0].incomeyesterday })
        console.log(result.data.result[0].incomeyesterday)
        console.log(incomeToday)
      })
      .catch(err => {
        console.log(err)
      })

  }

  getIncomeinYear = async () => {
    await axios.get(`/orders/getincomeyear`)
      .then(result => {
        this.setState({ incomeInYear: result.data.result[0].income })
      })
      .catch(err => {
        console.log(err)
      })
    console.log(this.state.incomeInYear)

  }


  // handleRevenue = async (event) => {
  //     await this.setState({ orderBy: event.target.value })
  //     this.getRevenue()
  //     console.log(event.persist())
  //}
  getRevenue = async () => {
    let orderBy = this.state.orderBy
    let label = []
    if (orderBy === 'day') {
      label = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    } else if (orderBy === 'week') {
      label = ['Week 1', 'Week 2', 'Week 3', 'Week 4',]
    } else {
      label = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
    await axios.get('/orders/revenue?orderBy=' + this.state.orderBy)
      .then(result => {
        this.setState({ chart: result.data.result, label: label })
      })
    console.log(this.state.label)
  }

  render() {

    let orderlist = this.state.order.map((item, index) => {
      return (
        <CardItem key={index} bordered style={{ flexDirection: "column", alignContent: 'flex-start' }}>
          <Text style={{ fontWeight: "bold", alignSelf: 'flex-start' }}>#{item.receipt_no}</Text>
          <Text style={{ alignSelf: 'flex-start' }} >{item.created_at}</Text>
          <Text style={{ alignSelf: 'flex-start' }} >{item.name_order}</Text>
          <Text style={{ alignSelf: 'flex-start' }}>Rp. {item.total_price}</Text>
        </CardItem>
        // <tr sm="4" key={item.id}>
        //   <td>#{item.receipt_no}</td>
        //   <td>{item.user_id}</td>
        //   <td><Moment format="DD MMMM YYYY">{item.created_at}</Moment></td>
        //   <td title={item.name_order}>{item.name_order.length < 45 ? item.name_order : item.name_order.substring(0, 45) + "..."}</td>
        //   <td align="right">{rupiah.convert(item.total_price)}</td>
        // </tr>
      )
    })
    return (
      <>
        <View style={{ backgroundColor: 'crimson' }}>
          <Text style={{ fontSize: 35, fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>HISTORY</Text>
        </View>

        <ScrollView style={{ padding: 0 }}>
          <View style={{ padding: 10, backgroundColor: '#fff' }}>
            {/* Today's Income */}
            <Card style={{ borderColor: 'black', padding: 0, borderRadius: 15, backgroundColor: 'black' }}>
              <CardItem bordered style={{ borderRadius: 15, flexDirection: "column", alignContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'flex-start' }} >Today's Income</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", alignSelf: 'flex-start' }}>Rp. {this.state.incomeToday}</Text>
                <Text style={{ alignSelf: 'flex-start' }} >{Math.round(((this.state.incomeToday - this.state.incomeyesterday) / this.state.incomeyesterday) * 100)}% Yesterday</Text>
              </CardItem>
            </Card>
            {/* Orders in a week  */}
            <Card style={{ borderColor: 'black', padding: 0, borderRadius: 15, backgroundColor: 'black' }}>
              <CardItem bordered style={{ borderRadius: 15, flexDirection: "column", alignContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'flex-start' }} >Orders</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", alignSelf: 'flex-start' }}>Rp. {this.state.orderInWeek}</Text>
                <Text style={{ alignSelf: 'flex-start' }} >{Math.round(((this.state.orderInWeek - this.state.orderLastWeek) / this.state.orderLastWeek) * 100)}% Last Week</Text>
              </CardItem>
            </Card>
            {/* This Year's Income */}
            <Card style={{ borderColor: 'black', padding: 0, borderRadius: 15, backgroundColor: 'black' }}>
              <CardItem bordered style={{ borderRadius: 15, flexDirection: "column", alignContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'flex-start' }} >This Year's Income</Text>
                <Text style={{ fontSize: 24, fontWeight: "bold", alignSelf: 'flex-start' }}>Rp. {this.state.incomeInYear}</Text>
                <Text style={{ alignSelf: 'flex-start' }} ></Text>
              </CardItem>
            </Card>

            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 30 }}>Recent Order</Text>
            <Card style={{ borderColor: 'black', padding: 4, borderRadius: 15 }}>
              {orderlist}
            </Card>
          </View>
        </ScrollView>
      </>
    )
  }
}

export default Profile