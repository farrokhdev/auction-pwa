import {BASE_URL} from '../utils';
import axios from '../utils/request';

class AuthService {
    login(id, password) {
        let payload = {
            "id": id,
            "password": password
        }
        return axios.post(`${BASE_URL}/account/login/`, payload)
            .then(res => {
                return res
            })
            .catch(err => {
                return err
            })
    }

}

export default new AuthService();
