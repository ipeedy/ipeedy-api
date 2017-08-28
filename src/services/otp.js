import axios from 'axios';

import constants from '../config/constants';

export const requestOTP = async phone => {
  const code = Math.floor(Math.random() * 8999 + 1000);

  const result = await axios.get(constants.ESMS_API_URL, {
    params: {
      ApiKey: constants.ESMS_API_KEY,
      SecretKey: constants.ESMS_SECRET_KEY,
      SmsType: 6,
      Phone: phone,
      Content: `Your Ipeedy code is ${code}`,
    },
  });

  return {
    ...result.data,
    code,
  };
};
