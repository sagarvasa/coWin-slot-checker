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

define('vaccine_available_notification', 'Vaccine available notification !!');
define('message_prefix', 'Hi, Your Vaccine info from coWin is')

define('cron_port', 3030);
define('cron_minute_interval', 5);
define('cron_pincodes', ["560017", "560038", "560075"]);
define('cron_notifier_mobile', '9090909090');
define('cron_notifier_email', 'sagar123@domain.com');
define('vaccine_date', '2021/05/24');
define('cron_age_group', 45);