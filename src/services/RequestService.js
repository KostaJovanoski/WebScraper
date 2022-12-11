import axios from "axios";

class RequestService {

    constructor() {
        this.axios = axios.create({
            baseURL: 'https://localhost:7292/api/v1',
            timeout: 5000
        });
    }

    get(endpoint) {
        return this.axios.get(endpoint);
    }

    post(endpoint, data) {
        return this.axios.post(endpoint, {...data});
    }
}

export const Request = new RequestService();