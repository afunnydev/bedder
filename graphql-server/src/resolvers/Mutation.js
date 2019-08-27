const needle = require("needle");

const Mutation = {
  async addReview(parent, args, context) {
    const { bookingId } = args;
    delete args.bookingId;

    const data = {
      ...args
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };
     
    await needle(
      "post",
      `${process.env.BACKEND_URL}/booking/${bookingId}/reviews`, 
      data, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode === 403) { throw new Error("You're not authorized to leave a review for another user."); }
      if (statusCode !== 200) { throw new Error("An error occured while saving your review. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed to do this. This isn't your reservation"); }
    }).catch(function(err) {
      throw new Error(err);
    });

    return { message: "SUCCÈS" };
  },
  async facebookSignup(parent, args) {
    const data = {
      facebookPayload: args.payload
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/user/registerFacebook`, 
      data, 
      { json: true },
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while creating your account. Please try again later."); }
      if (body.error) { throw new Error(body.error); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    const user = { 
      ...response.result,
      token: response.token,
    };

    return user;
  },
  async signUp(parent,args) {
    const data = {
      ...args
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/user/register`, 
      data, 
      { json: true },
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while creating your account. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    const user = { 
      ...response.result,
    };

    return user;
  },
  async validateAccount(parent, args) {
    const data = {
      ...args
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/user/activate`, 
      data, 
      { json: true },
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while activating your account. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    const user = { 
      ...response.result,
      token: response.token,
    };

    return user;
  },
  async toggleBlockUser(parent, args, context) {
    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/admin/user/${args.userId}/block`, 
      null, 
      options,
    ).then(function({statusCode, body}) {
      if (statusCode !== 200 || body.error) { throw new Error((body.error && body.error.message) || "An error occured while blocking/unblocking this user. Please try again later."); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return response;
  },
  async updateBusinessStatus(parent, args, context) {
    const data = {
      status: args.status,
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/admin/business/${args.businessId}/status`, 
      data, 
      options,
    ).then(function({statusCode, body}) {
      if (statusCode !== 200 || body.error) { throw new Error((body.error && body.error.message) || "An error occured while modifying the status of this business. Please try again later."); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return response;
  },
  async addBusiness(parent, args, context) {
    const data = {
      name: args.name,
      email: args.ownerEmail,
    };

    if (args.ownerPhone && args.ownerPhone !== "") {
      data.phone = args.ownerPhone;
    }

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/business`, 
      data, 
      options,
    ).then(function({statusCode, body}) {
      if (statusCode !== 200 || body.errors) { throw new Error(body.errors || "An error occured while creating this business. Please try again later."); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return response.result;
  },
  async addPhone(parent, args, context) {
    const data = {
      number: args.number,
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/phone`, 
      data, 
      options,
    ).then(function({statusCode, body}) {
      if (statusCode !== 200 || body.error) { 
        const error = body.error && body.error.error || "An error occured while validating your phone number. Please try again later.";
        throw new Error(error); 
      }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return response.result;
  },
  async verifyPhone(parent, args, context) {
    const data = {
      number: args.number,
      code: args.code,
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const response = await needle(
      "post",
      `${process.env.BACKEND_URL}/phone/verify`, 
      data, 
      options,
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error(body.message); }
      return body;
    }).catch(function(err) {
      throw new Error(err);
    });

    return response.result;
  },
  async updateBusiness(parent, args, context) {
    const id = args.business.id;
    delete args.business.id;

    const data = {
      ...args.business
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };
     
    await needle(
      "put",
      `${process.env.BACKEND_URL}/business/${id}`, 
      data, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while retrieving this business. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
    }).catch(function(err) {
      throw new Error(err);
    });

    return { message: "Business Updated" };
  },
  async checkout(parent, args, context) {
    const data = {
      ...args
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const bookings = await needle(
      "post",
      `${process.env.BACKEND_URL}/booking`, 
      data, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while creating your booking. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
      return body.result;
    }).catch(function(err) {
      throw new Error(err);
    });

    // Currently, all the new bookings made (1 per room) are returned.
    return bookings[0];
  },
  async createTicket(parent, args, context) {
    const data = {
      ...args
    };

    const options = {
      json: true,
      headers: { "Authorization": "Bearer " + context.token}
    };

    const supportTicket = await needle(
      "post",
      `${process.env.BACKEND_URL}/support`, 
      data, 
      options
    ).then(function({statusCode, body}) {
      if (statusCode !== 200) { throw new Error("An error occured while creating your booking. Please try again later."); }
      if (body.error) { throw new Error(body.error && body.error.error || "You're not allowed."); }
      return body.result;
    }).catch(function(err) {
      throw new Error(err);
    });

    // Currently, all the new bookings made (1 per room) are returned.
    return supportTicket;
  }
};

module.exports = Mutation;