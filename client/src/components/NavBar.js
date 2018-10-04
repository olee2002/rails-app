import React from 'react'
import styled from 'styled-components'

const AVATAR_HEIGHT = 40;
const AVATAR_WIDTH = 40;

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  background: rgba(232, 231, 231,0.45);
  margin: 0px;
  padding: 0px;
  height: 46px;
  width: 100%;
`;

let NavText = styled.p`
  color: #4a90e2;
  padding-right: 10px;
  padding-left: 10px;
  color: white;
`;

const Badge = styled.div`
  display: flex;
  min-width: 152px;
  align-items: center;
  overflow: hidden;
  border-radius: 3px;
  border: 2px solid #4a90e2;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  background-color: #4a90e2;
`;

let SignInBadge = () => (
  <Badge>
    <a href='/users/auth/salesloft' style={{ textDecoration: 'none' }}><NavText>Login</NavText></a>
  </Badge>
);

let UserBadge = ({ user }) => (
  <Badge>
    <a href='/users/auth/logout' style={{ textDecoration: 'none' }}><NavText>{user.name}</NavText></a>
  </Badge>
);

let NavBar = ({ user }) => (
  <StyledNavBar>
    <button></button>
    {user ? <UserBadge user={user} /> : <SignInBadge />}
  </StyledNavBar>
);

export default NavBar
