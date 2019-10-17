import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './Screens/Home'
import Profile from './Screens/Profile'
import Login from './Screens/Login'

const MainNavigator = createStackNavigator({
    
    Home : {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Profile,
    Login : {
        screen: Login,
        navigationOptions: {
            header: null
        }
    } ,
}, 
{
    initialRouteName: 'Home'
})

export default createAppContainer(MainNavigator)