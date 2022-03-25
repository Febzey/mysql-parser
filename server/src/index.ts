import 'dotenv/config'
import Api from './structure/api/Api.js';

const api = new Api(parseInt(process.env.port));
export default api;