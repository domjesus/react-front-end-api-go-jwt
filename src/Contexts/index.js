import React from "react";

const AuthContext = React.createContext({
  authenticated: false,
  setAuthenticated: () => {},
});

const UserContext = React.createContext({
  user: {},
  setUser: () => {},
});

const MessageContext = React.createContext({
  errors: [],
  setErrors: () => {},
  success: [],
  setSuccess: () => {},
});

export { AuthContext, UserContext, MessageContext };
