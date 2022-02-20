import axios from 'axios'

export function request(config) {
    const instance = axios.create({
      baseURL:'填自己的地址，或找老师要',
      timeout:5000
    })

    instance.interceptors.response.use(res => {
      return res.data
    })

    return instance(config)
}
