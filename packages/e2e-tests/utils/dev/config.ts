const commandArguments = process.argv;

let IS_WP_MULTISITE_NETWORK = commandArguments.includes("-wp-multisite-network") ? true : false;
let DO_NOT_USE_BARISTA_STRUCTURE = commandArguments.includes("-do-not-use-barista-structure") ? true : false;

let WP_ADMIN_USER = { username: '', password: '' };
let WP_BASE_URL = '';

if(IS_WP_MULTISITE_NETWORK){
    WP_ADMIN_USER = { username: 'developers', password: 'password' };
    WP_BASE_URL = 'http://e2etests.makeeventsnotwar.com';
}else{
    WP_ADMIN_USER = { username: 'admin', password: 'password' };
    WP_BASE_URL = process.env.WP_BASE_URL || 'http://localhost:8889';
}

const { WP_USERNAME = WP_ADMIN_USER.username, WP_PASSWORD = WP_ADMIN_USER.password } = process.env;

export { WP_ADMIN_USER, WP_USERNAME, WP_PASSWORD, WP_BASE_URL, IS_WP_MULTISITE_NETWORK, DO_NOT_USE_BARISTA_STRUCTURE };
