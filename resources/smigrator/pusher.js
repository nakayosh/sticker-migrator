import Pusher from 'pusher-js';

export default function connectStream() {

}

const {
  PUSHER_APP_ID,
  PUSHER_APP_KEY,
  PUSHER_APP_CLUSTER,
} = process.env;

console.log(PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_CLUSTER);
