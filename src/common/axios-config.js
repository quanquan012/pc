import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8090/usercenter'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type'
}

axios.interceptors.response.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
