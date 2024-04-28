// responseHandler.js
import statusCodes from './statusCodes.js';

const responseHandler = {
    handleSuccess: (res, data, statusCode = statusCodes.SUCCESS.OK) => {
        return res.status(statusCode).json(data);
    },
    handleError: (res, message, statusCode = statusCodes.ERROR.BAD_REQUEST) => {
        return res.status(statusCode).json({ message });
    },
};

export default responseHandler;


