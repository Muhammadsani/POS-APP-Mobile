import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './Screens/Home'
import Profile from './Screens/Profile'
import Login from './Screens/Login'
import Main from "./Screens/Main";

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
    Main : {
        screen: Main,
        navigationOptions: {
            header: null
        }
    } ,
}, 
{
    initialRouteName: 'Login'
})

export default createAppContainer(MainNavigator)