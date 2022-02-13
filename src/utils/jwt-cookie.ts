import Cookies from 'universal-cookie';

export function basePathCalculator(): string {
  const { protocol, hostname, port } = window.location;

  let basePath = `${protocol}//${hostname}`;

  if (port) {
    basePath += `:${port}`;
  }

  return basePath;
}

export function logout(path: string) {
  const logOutPage = path;
  deleteCookie();
  const location: Location = new Location();
  location.href = logOutPage;
  window.location = location;
}

export function setCookie(token) {
  const cookies = new Cookies();

  let expiresDate = new Date();

  expiresDate = new Date(expiresDate.getTime() + 1000 * 60 * 60 * 8);

  const cookieOptions = {
    path: '/',
    expires: expiresDate,
    domain: 'localhost',
    secure: true,
  };

  cookies.set('process_flow_manager_jwt', token, cookieOptions);
}

export function deleteCookie() {
  const cookies = new Cookies();

  const cookieOptions = {
    path: '/',
    domain: 'localhost',
  };

  cookies.remove('process_flow_manager_jwt', cookieOptions);
}

export const getCookieValue = (name = 'process_flow_manager_jwt=') => {
  // ritorna il valore JWT memorizzato nel cookie
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      // console.log("cookie value:", c.substring(name.length, c.length));
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
