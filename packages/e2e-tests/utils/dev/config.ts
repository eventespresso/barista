const commandArguments = process.argv;

let IS_WP_MULTISITE_NETWORK = commandArguments.includes("-wp-multisite-network") ? true : false;

let WP_ADMIN_USER = { username: '', password: '' };
let WP_BASE_URL = '';

if(IS_WP_MULTISITE_NETWORK){
    WP_ADMIN_USER = { username: 'developers', password: '4(FuGWH7)!DqLVF(D9)F*4$5' };
    WP_BASE_URL = 'https://e2etests.makeeventsnotwar.com'
}else{
    WP_ADMIN_USER = { username: 'admin', password: 'password' };
    WP_BASE_URL = process.env.WP_BASE_URL || 'http://localhost:8889';
}

const { WP_USERNAME = WP_ADMIN_USER.username, WP_PASSWORD = WP_ADMIN_USER.password } = process.env;

export { WP_ADMIN_USER, WP_USERNAME, WP_PASSWORD, WP_BASE_URL, IS_WP_MULTISITE_NETWORK };
