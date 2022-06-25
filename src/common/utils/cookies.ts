export const setCookie = (name: string, value = '', days = 0) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
};

export const getCookie = (cookieName: string): string | undefined => {
  let cookie = {};
  if (typeof window !== 'undefined') {
    // to prevent  ->  ReferenceError: document is not defined
    document.cookie.split(';').forEach(function (el) {
      /*
					We have an url in cookie which has '=' inside so split by '=' will cause
					json.parse to fail. That's why ={ is added. So we need to keep
					all cookies inside objects: { prop: value }
				*/
      let [key, value] = el.split('={');
      cookie[key.trim()] = `{${value}`;
    });
  }

  return cookie[cookieName];
};

export const eraseCookie = (name: string) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
