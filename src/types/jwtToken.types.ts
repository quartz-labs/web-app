export type JwtToken = null | string | false;
// JWT token is null if the user is not created
// JWT token is a string if the user is created and logged in
// JWT token is false if the user is created but not logged in