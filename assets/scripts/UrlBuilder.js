export default class UrlBuilder{
    static getUrl(url, params){
        return url + '?' + this._getEncodedParams(params);
    }
    
    static _getEncodedParams(params){
        let encodedParams = [];
        for(const prop in params){
            encodedParams.push(encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]));
        }
        return encodedParams.join('&');
    }
}