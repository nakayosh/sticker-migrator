const element = document.getElementById('csrf-token');
const csrfToken = element && element.getAttribute('content');

export default csrfToken;
