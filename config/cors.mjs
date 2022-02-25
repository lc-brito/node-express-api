export default {
  origin: [
    '*',
  ],
  methods: [
    'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH',
  ],
  headers: [
    'Token',
  ],
  credentials: true,
};
