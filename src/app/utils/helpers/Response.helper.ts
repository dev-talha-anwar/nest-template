import { ConfigConstant } from '../constants/config.constant';
export const ResponseHelper = {
  handle: (condition,message) => {
    if(condition){
      return {
        status: true,
        message: message
      }
    }else{
      return {
        status: false,
        message: ConfigConstant.defaultErrorMessage
      }
    }
  },
  success: (message = ConfigConstant.defaultSuccessMessage,data = undefined) => {
    return {
      status: true,
      message: message,
      ...(data && { 'data': data })
    }
  },
  error: (err = ConfigConstant.defaultErrorMessage ) => {
    return {
      status: false,
      message: err
    }
  },
};
  