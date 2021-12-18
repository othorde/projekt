const API_URL = 'http://localhost:1337/api';
const PROXY_URL = "http://localhost:1337/api/oauth/authenticate";


const defaultConfigAuthenticate = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
};
const defaultConfigPut = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}

export {
    API_URL,
    PROXY_URL,
    defaultConfigPut,
    defaultConfigAuthenticate,
};

