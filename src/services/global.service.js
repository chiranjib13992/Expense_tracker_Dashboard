import apiService from './apiService';
const BASE_URL = '/research/api/v1';


const deviceRegistration = async (data) => {
 try {
        const res = await apiService.api.post(`${BASE_URL}/device-registration`, data);
        return res.data;
    } catch (err) {
        console.error("Error", err.response?.data || err.message);
        throw err
    }
}

const registerDevice = async (device_token) => {
  try {
    const payload = await getUserPayload();
    const deviceId = getDeviceId();
    const data = {
      device_id: deviceId,
      customerId: payload?.id || '',
      device_token: device_token || ''
    };

    const res = await deviceRegistration(data);
     setDeviceId(res.data?.device_id);
  } catch (err) {
    console.error("Device registration failed:", err);
  }
};


 const setDeviceId = (token) => {
  createCookie('ins_d_id', token, 365)
}

 const getDeviceId = () => {
  return readCookie('ins_d_id')
}


const createCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`;
};



const getUserPayload = () => {
  const token = getToken();
  console.log(token, 'token')
  if (token) {
    const userPayload = JSON.parse(atob(token.split('.')[1]))
    userPayload.name = decodeURIComponent(userPayload.name)
    return userPayload
  }
  return null
}

 const getToken = () => {
  return readCookie('token')
}


  const readCookie = (name) => {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length)
  }
  return null
}

function isLoggedIn() {
    var userPayload = getUserPayload();
    console.log(userPayload, 'userPayload')
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  async function setToken(token) {
    createCookie('token', token, 30);
  }

   function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  function deleteToken() {
    eraseCookie('token');
  }

   function logout() {
    deleteToken()
    if (!isLoggedIn()) {
         window.location.href = "/login";
    }
  }

export {
  registerDevice,
  getDeviceId,
  setDeviceId,
  getUserPayload,
  getToken,
  isLoggedIn,
  setToken,
  logout
}