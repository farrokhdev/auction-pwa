import cookie from 'react-cookies';
import qs from 'qs';
import {BASE_URL, COOKIE_EXPIRES} from './index';

export function Arraify(data){
    if(!data) return []
    
    if(Array.isArray(data)){
        return data
    }else{
        return [data]
    }
}
export function Header(options = {}) {
    let token = Token(), headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    let heads = options;

    token && headers.set('Authorization',"Bearer "+ token);
    options.headers && Object.entries(options.headers).forEach(([k, v]) => headers.set(k, v));
    options.headers = headers;

    if (heads["Accept"]){
        options.headers.set("Accept", heads["Accept"])
    }
    return options;
}

export function Url(url = "", data = undefined) {

    if (url.charAt(0) !== '/') {url = '/' + url}
    return BASE_URL + url + (data ? `?${qs.stringify(data, {arrayFormat: 'comma'})}` : ``);
}

export function setToken(token) {
    const expires = new Date();
    expires.setDate(expires.getDate() + COOKIE_EXPIRES);
    cookie.save('token', token.access , {path: '/', expires});
    cookie.save('refresh', token.refresh , {path: '/', expires});
}

export function Token() {
    let token = cookie.load('token');
    if (token === 'undefined') {
        return undefined;
    }

    return token;
}
export function getRefreshToken() {
    let refresh = cookie.load('refresh');
    if (refresh === 'undefined') {
        return undefined;
    }

    return refresh;
}

export function removeToken() {
    cookie.remove('token', {path: '/'});
    cookie.remove('refresh', {path: '/'});
}

export function getTokenObject() {
    let token = Token();
    if (token !== undefined) {
        return {Authorization: token}
    }
}

export function formatNumber(value) {
    let f = value.match(/\d+/);
    if (f) return f[0];
    return '';
}
export function UrlQuery(url = "", data = {}){
    return url + `?${qs.stringify(data, {arrayFormat: 'comma'})}`
}