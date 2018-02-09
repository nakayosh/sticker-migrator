import Echo from 'laravel-echo';
import csrfToken from '@/csrf_token';
import laravelEchoServer from '@/../../laravel-echo-server.json';

let echo;

echo = new Echo({
  authEndpoint: laravelEchoServer.authEndpoint || '',
  broadcaster:  'socket.io',
  host:         process.env.ECHO_HOST,
  key:          laravelEchoServer.clients.key || '',
  csrfToken,
});

export default echo;
