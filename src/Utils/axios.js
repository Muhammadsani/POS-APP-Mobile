import axios from "axios"
import {API_BASEURL} from 'react-native-dotenv'
//import storage from "local-storage"

console.log(API_BASEURL)
const instance = axios.create({
    baseURL: API_BASEURL,
    // headers: {
    //     authorization: 'Bearer ' + storage.get('token') || ""
    // }
})

export default instance