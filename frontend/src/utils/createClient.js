import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import { graphqlDevEndpoint, graphqlProdEndpoint } from './constants';
import BedderConfig from 'bedder/bedderConfig';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? graphqlDevEndpoint : graphqlProdEndpoint,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('bedder_appbedder_auth_token');
  const tokenObject = JSON.parse(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? tokenObject.data : '',
    },
  };
});

const cache = new InMemoryCache();

// TODO: Implement apollo-cache-persist to persist the cache to local storage..

const client = new ApolloClient({
  resolvers: {
    Query: {
      businessUnit: (_, { businessUnitId }, { cache }) => {
        const id = `BusinessUnit:${businessUnitId}`;
        const fragment = gql`
          fragment basicInfo on BusinessUnit {
            id
            name
            parentId
            numUnits
            bedsKing
            bedsQueen
            bedsSimple
            maxPersons
            equipment
            files {
              id
              uuid
              url
            }
            rate
            currency
            isDeleted
            isNew
            acceptAutomatically
          }
        `;
        const query = cache.readFragment({ fragment, id });
        console.log('LOCAL QUERY FOR ROOM', query);
        return query;
      }
    },
    Mutation: {
      addFileToBusiness: (_root, { modelId, uuid, url }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'Business', id: modelId });
        // TODO: This fragment should be reusable.
        const fragment = gql`
          fragment coverPhotos on Business {
            coverPhotos {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        const nbOfPhotos = query.coverPhotos ? query.coverPhotos.length : 0;
        // TODO: We should pass an id that is for sure not in local cache.
        const newId = new Date().getTime();
        const newCoverPhoto = { id: newId, uuid, url, __typename: 'File' };
        const data = {
          coverPhotos: nbOfPhotos ? [ ...query.coverPhotos, newCoverPhoto] : [ newCoverPhoto ]
        };
        cache.writeData({ id, data });
        return newCoverPhoto;
      },
      addFileToBusinessUnit: (_root, { modelId, uuid, url }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'BusinessUnit', id: modelId });
        // TODO: This fragment should be reusable.
        const fragment = gql`
          fragment files on BusinessUnit {
            files {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: We should pass an id that is for sure not in local cache.
        const nbOfPhotos = query.files ? query.files.length : 0;
        const newId = new Date().getTime();
        const newPhoto = { id: newId, uuid, url, __typename: 'File' };
        const data = {
          files: nbOfPhotos ? [ ...query.files, newPhoto] : [ newPhoto ]
        };
        cache.writeData({ id, data });
        return newPhoto;
      },
      removeFileFromBusiness: (_root, { modelId, index }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'Business', id: modelId });
        const fragment = gql`
          fragment coverPhotos on Business {
            coverPhotos {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: Is the index really reliable or should I remove by id?
        // Don't forget that splice returns the REMOVED element, that's why we don't assign to a variable.
        query.coverPhotos.splice(index, 1);
        cache.writeData({ id, data: { coverPhotos: query.coverPhotos } });
        return null;
      },
      removeFileFromBusinessUnit: (_root, { modelId, index }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'BusinessUnit', id: modelId });
        const fragment = gql`
          fragment files on BusinessUnit {
            files {
              id
              uuid
              url
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        // TODO: Is the index really reliable or should I remove by id?
        // Don't forget that splice returns the REMOVED element, that's why we don't assign to a variable.
        query.files.splice(index, 1);
        cache.writeData({ id, data: { files: query.files } });
        return null;
      },
      addNewRoom: (_root, { businessId }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'Business', id: businessId });
        const fragment = gql`
          fragment businessUnits on Business {
            units {
              id
              name
            }
          }
        `;
        const query = cache.readFragment({ fragment, id });
        const newId = new Date().getTime();
        const newBusinessUnit = { 
          id: newId, 
          parentId: newId, 
          name: 'New Room', 
          numUnits: 1, 
          bedsKing: 0,
          bedsQueen: 0,
          bedsSimple: 0,
          maxPersons: 2,
          equipment: JSON.stringify(BedderConfig.getEquipment()),
          files: [],
          rate: 0,
          currency: 'USD',
          isDeleted: false,
          isNew: true,
          acceptAutomatically: false,
          __typename: 'BusinessUnit' 
        };
        const data = {
          units: [ ...query.units, newBusinessUnit]
        };
        cache.writeData({ id, data });
        return newBusinessUnit;
      },
      removeRoom: (_root, { businessId, roomId }, { cache, getCacheKey }) => {
        const roomKey = getCacheKey({ __typename: 'BusinessUnit', id: roomId });
        const businessKey = getCacheKey({ __typename: 'Business', id: businessId });
        const fragment = gql`
          fragment businessUnitsWithParent on Business {
            units {
              id
              parentId
              name
            }
          }
        `;
        const query = cache.readFragment({ fragment, id: businessKey });

        for (let i = 0; i < query.units.length; i++) {
          if (query.units[i].id === roomId) {query.units.splice(i, 1); break;}
        }

        cache.writeData({ id: businessKey, data: { units: query.units } });
        cache.data.delete(roomKey);
        return null;
      },
      businessUnitToBook: (_root, { businessUnitId }, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'BusinessUnit', id: businessUnitId });
        const fragment = gql`
          fragment importantInfo on BusinessUnit {
            id
            name
          }
        `;
        const businessUnit = cache.readFragment({ fragment, id });
        const data = { businessUnitToBook: businessUnit };
        cache.writeData({ data });
        return { message: 'Successfully added!', __typename: 'Message' };
      },
    },
  },
  link: authLink.concat(httpLink),
  cache: cache,
});

const today = new Date();
const inThreeDays = new Date().addDays(3);

cache.writeData({
  data: {
    bookingStartDate: localStorage.getItem('bookingStartDate') || today.toISOString(),
    bookingEndDate: localStorage.getItem('bookingEndDate') || inThreeDays.toISOString(),
    bookingNumBeds: localStorage.getItem('bookingNumBeds') || 1,
    bookingNumPeople: localStorage.getItem('bookingNumPeople') || 2,
    numUnitsToBook: 0,
    menuOpen: false,
  },
});

export default client;
