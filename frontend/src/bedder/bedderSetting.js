import Bedder from './bedder';
import { backendDevEndpoint, backendProdEndpoint } from 'utils/constants';

class BedderSetting {
  constructor() {
    this.apiUrl = process.env.NODE_ENV === 'development' ? backendDevEndpoint : backendProdEndpoint;

    this.default = {
      receiveByEmail: 1,
      receiveBySMS: 0,
      receiveReviews: 1,
      receiveBookings: 1,
      receiveNews: 1,
      bookingMargin: 15,
      explorersEarning: 15,
    };
  }

  get(setting) {
    if (Bedder.getUser() && Bedder.getUser().id && Bedder.getUser().id > 0) {
      const userSettings = Bedder.getUser().settings;
      if (setting in userSettings) {
        return userSettings[setting];
      } else if (setting in this.default) {
        return this.default[setting];
      }
      throw new Error('shit');
    }
  }
}

export default new BedderSetting();
