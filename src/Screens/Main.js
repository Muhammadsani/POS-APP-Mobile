import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import { TabHeading, Icon, Badge, Text, Tab, Tabs } from 'native-base';
import Tab1 from '../Components/ProductsList';
import Tab2 from '../Components/Manage';
import Tab3 from '../Components/History';
import Tab4 from '../Components/Add';
export default class TabsExample extends Component {
  render() {
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor='crimson'/>

        <Tabs tabBarPosition="bottom" tabBarUnderlineStyle={{ backgroundColor: 'red', height: 5 }}  tabContainerStyle={{ height: 55 }}>
          <Tab heading={ <TabHeading><Icon name="home" /></TabHeading>} >
            <Tab1 navigate={this.props.navigation.navigate}/>
          </Tab>
          <Tab heading={ <TabHeading><Icon type="FontAwesome5" name="wrench" /></TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="pie" /></TabHeading>}>
            <Tab3 />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="add" /></TabHeading>}>
            <Tab4 />
          </Tab>
        </Tabs>
        </>
    );
  }
}