const needle = require("needle");

const Query = {
  async businessReviews(parent, args, context) {
    let options = {};

    if (context.token && context.token !== "null") {options.headers = { "Authorization": "Bearer " + context.token };}
    
    const reviews = await needle(
      "get",
      `${process.env.BACKEND_URL}/business/${args.businessId}/reviews`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while retrieving reviews. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "No reviews retrieved."); }
      return body.reviews;
    }).catch(function(err) {
      throw new Error(err);
    });

    return reviews;
  },
  async business(parent, args, context) {
    let options = {};
    if (context.token && context.token !== "null") {
      options.headers = { "Authorization": "Bearer " + context.token };
    }
     
    const business = await needle(
      "get",
      `${process.env.BACKEND_URL}/business/${args.businessId}`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while retrieving this business. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
      return body.result;
    }).catch(function(err) {
      throw new Error(err);
    });
    return business;
  },
  async booking(parent, args, context) {
    let options = {};
    if (context.token && context.token !== "null") {options.headers = { "Authorization": "Bearer " + context.token };}
     
    const booking = await needle(
      "get",
      `${process.env.BACKEND_URL}/booking/${args.bookingId}`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      console.log(body);
      if (statusCode !== 200) { throw new Error(body.message); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });
    return booking;
  },
  async users(parent, args, context) {
    let options = {};
    if (context.token && context.token !== "null") {options.headers = { "Authorization": "Bearer " + context.token };}
     
    const users = await needle(
      "get",
      `${process.env.BACKEND_URL}/admin/users/list`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error(body.message); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return users;
  },
  async user(parent, args, context) {
    let options = {};
    if (context.token && context.token !== "null") {options.headers = { "Authorization": "Bearer " + context.token };}
     
    const user = await needle(
      "get",
      `${process.env.BACKEND_URL}/admin/user/${args.id}`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error(body.message); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return {
      ...user.user,
      bookings: user.bookings,
      explorerEarning: user.explorerEarning,
      businesses: user.businesses,
      supportTickets: user.support,
    };
  },
  async businesses(parent, args, context) {
    let options = {};
    if (context.token && context.token !== "null") {
      options.headers = { "Authorization": "Bearer " + context.token };
    }
     
    const businesses = await needle(
      "get",
      `${process.env.BACKEND_URL}/admin/businesses/list`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error(body.message); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return businesses;
  },
  async bookings(parent, args, context) {
    const options = {
      headers: { "Authorization": "Bearer " + context.token}
    };
     
    const bookings = await needle(
      "get",
      `${process.env.BACKEND_URL}/admin/bookings/list`, 
      null, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error(body.message); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return bookings;
  },
  async businessQuotes(parent, args, context) {
    const businessId = args.businessId;
    delete args.businessId;

    const data = { ...args };

    let options = {};
    if (context.token && context.token !== "null") {options.headers = { "Authorization": "Bearer " + context.token };}
     
    const businessUnits = await needle(
      "get",
      `${process.env.BACKEND_URL}/business/${businessId}/quotes`, 
      data, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while retrieving this business. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
      return body.result;
    }).catch(function(err) {
      throw new Error(err);
    });
    return businessUnits;
  },
};

module.exports = Query;