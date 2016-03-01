const username = 'WKD4N7YMA1uiM8V';
const password = 'DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68';
const customHeader = 'X-AppGlu-Environment';
const customHeaderValue = 'staging';
const searchRouteUrl = 'https://api.appglu.com/v1/queries/findRoutesByStopName/run';
const stopsByRouteIdUrl = 'https://api.appglu.com/v1/queries/findStopsByRouteId/run';
const departuresByRouteIdUrl = 'https://api.appglu.com/v1/queries/findDeparturesByRouteId/run';

export const searchRoutesByTerm = (term) => {
  if(term === null || term === '') {
    return [];
  }
  return httpPost(searchRouteUrl, JSON.stringify({"params": {"stopName": "%" + term + "%"}}));
}

export const searchStopsByRouteId = (routeId) => {
  if(routeId === null || routeId === '') {
    return [];
  }
  return httpPost(stopsByRouteIdUrl, JSON.stringify({"params": {"routeId": routeId}}));
}

export const searchDeparturesByRouteId = (routeId) => {
  if(routeId === null || routeId === '') {
    return [];
  }
  return httpPost(departuresByRouteIdUrl, JSON.stringify({"params": {"routeId": routeId}}));
}

export const httpPost = (url, payload) => {
  return new Promise(
    function (resolve, reject) {

      var req = new XMLHttpRequest();

      req.withCredentials = true;

      req.open('POST', url);

      req.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
      req.setRequestHeader('Content-Type', 'application/json');
      req.setRequestHeader(customHeader, customHeaderValue);

      req.onload = () => {
        if (req.status === 200) {
          // Success
          resolve(req.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(req.statusText));
        }
      };

      req.onerror = () => {
        reject(new Error(
          'XMLHttpRequest Error: ' + req.statusText));
      };
      req.send(payload);
    });
}

export const httpResponseToJSONArray = (response) => {
  let parsedJSON = JSON.parse(response);
  return Object.keys(parsedJSON).map((key) => {return parsedJSON[key]});
}