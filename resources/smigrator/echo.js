import Echo from 'laravel-echo';
import csrfToken from './csrf_token';
import laravelEchoServer from '../../laravel-echo-server.json';

const echo = new Echo({
  authEndpoint: laravelEchoServer.authEndpoint,
  broadcaster: 'socket.io',
  host: `${window.location.hostname}:4000/api/streaming`,
  key: laravelEchoServer.clients.key,
  csrfToken,
});

export default echo;
