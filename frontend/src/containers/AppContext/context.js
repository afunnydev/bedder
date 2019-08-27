import React from 'react';
import { withContext } from 'with-context';

const UserContext = React.createContext(null);

const UserProvider = props => (
  <UserContext.Provider value={props.value}>
    {props.children}
  </UserContext.Provider>
);

const WithUserContext = withContext(UserContext, 'user');

const RoleContext = React.createContext(null);

const RoleProvider = props => (
  <RoleContext.Provider value={props.value}>
    {props.children}
  </RoleContext.Provider>
);

const WithRoleContext = withContext(RoleContext, 'role');

export default WithUserContext;
export { UserProvider, UserContext, WithUserContext, RoleProvider, RoleContext, WithRoleContext };

