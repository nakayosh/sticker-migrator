import Echo from 'laravel-echo';
import csrfToken from '@/csrf_token';
import laravelEchoServer from '@/../../laravel-echo-server.json';

let echo;

if (process.env.NODE_ENV === 'production') {
  echo = new Echo({
    authEndpoint: laravelEchoServer.authEndpoint || '',
    broadcaster:  'socket.io',
    host:         'ws.smigrator.tk',
    key:          laravelEchoServer.clients.key || '',
    csrfToken,
  });
} else {
  echo = () => null;
}

export default echo;
