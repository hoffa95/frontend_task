import React, { useState } from 'react';
import { useStoreState } from '../hooks';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const MainNavbar = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useStoreState(state => state.user.user);
  console.log('NAV USER', user.username);
  const toggle = () => {
    setIsOpen(!isOpen);
  }
  let navitems;
  if (localStorage.getItem('token')) {
    navitems = <>
    <NavItem>
      <NavLink href="/newarticle/">
        Write Article
    </NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/">
        Articles
    </NavLink>
    </NavItem>
      <NavItem>
        <NavLink href="/profile">
          {localStorage.getItem('username')}
        </NavLink>
      </NavItem></>
  } else {
    navitems = <><NavItem>
      <NavLink href="/login">
        Login
</NavLink>
    </NavItem>
      <NavItem>
        <NavLink href="/register">
          Register
</NavLink>
      </NavItem></>
  }
  return (<div>
    <Navbar color='dark' dark expand='sm'>
      <Container>
        <NavbarBrand href="/"> Frontend Task</NavbarBrand>
        <NavbarToggler onClick={toggle}></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {navitems}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  </div>
  );
};

export default MainNavbar;