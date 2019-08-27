import { backendDevEndpoint, backendProdEndpoint } from 'utils/constants';

class BedderConfig {
  constructor() {
    this.apiUrl = process.env.NODE_ENV === 'development' ? backendDevEndpoint : backendProdEndpoint;
  }

  getApiUrl() {
    return this.apiUrl;
  }

  prepareUrl(url) {
    return `${this.getApiUrl() + url}?XDEBUG_SESSION_START=phpstorm`;
  }

  getFilterPropertyTypes() {
    return [
      { id: '0', value: 'Hostel', isActive: true },
      { id: '1', value: 'Hotel', isActive: true },
      { id: '2', value: 'Camping', isActive: true },
      { id: '3', value: 'Homestays (B & B)', isActive: true },
      { id: '4', value: 'Apartment', isActive: true },
      { id: '5', value: 'Lodge', isActive: true },
      { id: '6', value: 'Motel', isActive: true },
      { id: '7', value: 'Chalet', isActive: true },
      { id: '8', value: 'Cruise', isActive: true },
    ];
  }

  getPropertyMoods() {
    return [
      { id: '0', value: 'Feel like home' },
      { id: '1', value: 'Family' },
      { id: '2', value: 'Party' },
      { id: '3', value: 'Cute' },
      { id: '4', value: 'Discovery' },
      { id: '5', value: 'Meet new people' },
      { id: '6', value: 'Relaxation' },
    ];
  }

  getEquipment() {
    return {
      safety_deposit_boxes: false,
      free_breakfast: false,
      coffea_tea_maker: false,
      pets_allowed: false,
      towels: false,
      satellite: false,
      sofa: false,
      mirror: false,
      fan: false,
      ac: false,
      hair_dryer: false,
      telephone: false,
      refrigerator: false,
    };
  }

  getAmenities() {
    return {
      wifi: false,
      fitness_center: false,
      restaurant: false,
      concierge: false,
      landry_service: false,
      elevator: false,
      car_park: false,
      massage: false,
      swimming_pool: false,
      spa: false,
      bar: false,
      garden: false,
      airport_transfer: false,
      room_service: false,
      safety_deposit_boxes: false,
      free_breakfast: false,
      coffea_tea_maker: false,
      pets_allowed: false,
      towels: false,
      satellite: false,
      mirror: false,
      fan: false,
      ac: false,
      hair_dryer: false,
      telephone: false,
      refrigerator: false,
    };
  }

  getAmenitiesText() {
    return [
      { key: 'fitness_center', text: 'Fitness Center' },
      { key: 'restaurant', text: 'Restaurant' },
      { key: 'concierge', text: 'Concierge' },
      { key: 'landry_service', text: 'Laundry Service' },
      { key: 'elevator', text: 'Elevator' },
      { key: 'car_park', text: 'Car Park' },
      { key: 'massage', text: 'Massage' },
      { key: 'swimming_pool', text: 'Swimming Pool' },
      { key: 'spa', text: 'Spa' },
      { key: 'bar', text: 'Bar' },
      { key: 'garden', text: 'Garden' },
      { key: 'airport_transfer', text: 'Airport Transfer' },
      { key: 'room_service', text: 'Room Service' },
      { key: 'safety_deposit_boxes', text: 'Safety Deposit Box' },
      { key: 'free_breakfast', text: 'Free Breakfast' },
      { key: 'coffea_tea_maker', text: 'Coffee & Tea Maker' },
      { key: 'pets_allowed', text: 'Pets Friendly' },
      { key: 'towels', text: 'Free Towels' },
      { key: 'satellite', text: 'Satellite' },
      { key: 'mirror', text: 'Mirror' },
      { key: 'fan', text: 'Fan' },
      { key: 'ac', text: 'A/C' },
      { key: 'hair_dryer', text: 'Hair Dryer' },
      { key: 'telephone', text: 'Free Telephone' },
      { key: 'refrigerator', text: 'Refrigerator' },
      { key: 'wifi', text: 'Wi-fi' },
    ];
  }

  getSocialUrls() {
    return {
      facebook: 'https://facebook.com/Best-Local-Stay-179477846179466/',
      instagram: 'https://www.instagram.com/bedder_travel/',
    };
  }

  getReviewMessages() {
    return [
      'Terrible',
      'Worst',
      'Bad',
      'OK',
      'Passable',
      'Almost',
      'Good',
      'Great',
      'Awesome',
      'Extra',
      'Perfect',
    ];
  }
}

export default new BedderConfig();
