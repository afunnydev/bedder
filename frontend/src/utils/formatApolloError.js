const formatApolloError = (error) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors[0].message.replace('GraphQL error: ', '');
  }
  return error.message.replace('GraphQL error: Error: ', '');
};

export default formatApolloError;