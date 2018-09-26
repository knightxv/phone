// http://21b97p5647.imwork.net:32799
const IS_DEBUG = process.env.NODE_ENV === 'development';
export const REMOTE_URL = IS_DEBUG ? 'http://192.168.1.10:8012' : 'http://21b97p5647.imwork.net/api/phone';
export const BASE_URL = 'phone';
export default module.exports;
