export function parseJwt(token) {
  var arr = token.split('.');
  var res = atob(arr[1]);
  return JSON.parse(res);
}
