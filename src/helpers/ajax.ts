let HEADER:any = {
  'content-type': 'application/json',
  'accept': 'application/json',
};
let API_ROOT_URL:string;

function getHeader(){
  return HEADER;
}
function setHeader(new_header:object){
  for(let [i,v] of Object.entries(new_header) ){
    HEADER[i]=v;
  }
}
function clearHeader(){
  HEADER=null;
}
function resetHeader(){
  HEADER = {
    'content-type': 'application/json',
    'accept': 'application/json',
  };
}

function setTokenToHeader(token:string){
  HEADER['Authorization'] = `Bearer ${token}`;
}
function setApiRootUrl(url:string){
  url=url.slice(-1) !== '/' ? url+'/' : url;
  API_ROOT_URL=url;
}

function getData(url: string) {
  if (!url) return { error: 'url required' };
  url=getUrl(url);

  return fetch(url, {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: HEADER,
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    referrer: 'no-referrer', // *client, no-referrer
  })
};

function postData(url: string, data: object) {

  if (!url) return { error: 'url required' };
  if (!data) return { error: 'data required' };

  url=getUrl(url);

  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: HEADER,
    method: 'post', // *GET, POST, PUT, DELETE, etc.
    referrer: 'no-referrer', // *client, no-referrer
  })
}


function getUrl(url:string){
  url = url.slice(0, 1) === '/' ? `${API_ROOT_URL}${url.substring(1)}` : `${API_ROOT_URL}${url}`;
  return url;
}



const ajax = {
  getHeader,
  setHeader,
  clearHeader,
  resetHeader,
  setTokenToHeader,
  setApiRootUrl,
  getData,
  postData,
}

export default ajax