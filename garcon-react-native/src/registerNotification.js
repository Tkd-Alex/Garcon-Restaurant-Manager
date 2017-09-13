import { Permissions, Notifications } from 'expo';
import Server from './constants/Server';

let server = Server.address;
let port = Server.port;
const PUSH_ENDPOINT = 'http://' + server + ':' + port + '/api/auth/set-token';

export default (async function registerForPushNotificationsAsync(user, token) {

  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') return;
  let tokenPush = await Notifications.getExpoPushTokenAsync();
  if(tokenPush == user.push_token) return;

  return fetch(PUSH_ENDPOINT, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token //JWT Token
    },
    body: JSON.stringify({
      token: tokenPush
    }),
  });
});
