
import Axios from 'axios'
import {API_BASEURL} from 'react-native-dotenv'
import { AsyncStorage } from 'react-native'

const instance = Axios.create({
    baseURL: 'http://localhost:3020',
})


async function getToken(){

    const token = await AsyncStorage.getItem("token")

    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    
}


getToken()

export default instance