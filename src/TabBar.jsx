import {
  NavLink,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from './style/colors';

const Footer = styled.footer({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '7em',
});

const List = styled.ul({
  display: 'inline-flex',
  width: '60%',
  height: '2.5em',
  margin: '.5em auto',
  padding: 0,
  borderRadius: '3em',
  backgroundColor: `${colors.gray_backgroud}`,
  lineHeight: '2.5em',
});

const Item = styled.li({
  width: '15em',
  margin: '0 auto',
  borderRadius: '2em',
  fontWeight: '500',
  letterSpacing: '.8em',
  '& a': {
    color: `${colors.gray_text02}`,
    '&.active': {
      display: 'inline-block',
      width: '15em',
      height: '2.1em',
      borderRadius: '2em',
      color: `${colors.white}`,
      backgroundColor: `${colors.teal}`,
      lineHeight: '2.1em',
    },
  },
});

export default function TabBar() {
  return (
    <Footer>
      <List>
        <Item>
          <NavLink exact to="/calendar">
            달력
          </NavLink>
        </Item>
        <Item>
          <NavLink exact to="/" activeClassName="active">
            홈
          </NavLink>
        </Item>
        <Item>
          <NavLink exact to="/budget">
            예산
          </NavLink>
        </Item>
      </List>
    </Footer>
  );
}
