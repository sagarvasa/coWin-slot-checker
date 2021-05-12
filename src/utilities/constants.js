let define = (constant_name, constant_value) => {
    Object.defineProperty(exports, constant_name, {
        value: constant_value,
    });
};

define('ENV_LOCAL', 'local');
define('ENV_DEV', 'dev');
define('ENV_PROD', 'production');

define('INIT_TIME', 'watchdog_init');
define('CORR_ID', 'watchdog_cr_id');

define('COUNTRY_CODE_INDIA', 'IND');
define('IND_DIALING_CODE', '+91');
