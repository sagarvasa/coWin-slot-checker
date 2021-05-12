let define = (constant_name, constant_value) => {
    Object.defineProperty(exports, constant_name, {
        value: constant_value,
    });
};

define('BAD_REQUEST', 400);
define('UNAUTHORIZED', 401);
define('FORBIDDEN', 403);
define('NOT_FOUND', 404);
define('REQUEST_TIME_OUT', 408);
define('CONFLICT', 409);
define('INTERNAL_SERVER_ERROR', 500);
define('BAD_GATEWAY', 502);
define('SERVICE_UNAVAILABLE', 503);
define('GATEWAY_TIMEOUT', 504);

define('GENERAL_ERROR_MSG', 'Internal Server Error');
define('HANDLER_NOT_FOUND', 'Requested resource not found');
define('INVALID_URI_FORMAT', 'Invalid URI format');
define('VALIDATION_ERROR_MSG', 'Please pass valid payload');
define('REQUEST_ERROR', 'The request was made but no response was received')

