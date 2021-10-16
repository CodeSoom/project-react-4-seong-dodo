import {
  NavLink,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Footer = styled.div(mediaquery({
  position: 'relative',
  bottom: 0,
  left: 0,
  width: '100%',

  // border: '1px solid #eee',
}));

const List = styled.ul(mediaquery({
  display: 'inline-flex',
  width: ['23em', '27em', '27em', '42em', '40em', '48em'],
  height: ['3em', '3em', '2.8em', '2.7em', '3.5em', '4em'],
  margin: '1em auto',
  padding: 0,
  borderRadius: '5em',
  backgroundColor: `${colors.gray_backgroud}`,
  fontSize: ['0.7em', '0.7em', '0.8em', '0.9em', '1.2em', '1.4em'],
  lineHeight: [3, 3, 2.8, 2.7, 3.5, 4],
  textAlign: 'center',
}));

const Item = styled.li(mediaquery({
  width: '25%',
  margin: '0 auto',
  borderRadius: '2em',
  fontWeight: '500',
  letterSpacing: '0.8em',
  '& a': {
    color: `${colors.gray_text02}`,
    '&.active': {
      display: 'inline-block',
      width: '100%',
      height: ['3em', '3em', '2.8em', '2.7em', '3.5em', '4em'],
      borderRadius: '2em',
      color: `${colors.white}`,
      backgroundColor: `${colors.teal}`,
      lineHeight: [3, 3, 2.8, 2.7, 3.5, 4],
    },
  },
}));

const Item1 = styled.li(mediaquery({
  width: '25%',
  margin: '0 auto',
  borderRadius: '2em',
  fontWeight: '500',
  letterSpacing: '0.1em',
  '& a': {
    color: `${colors.gray_text02}`,
    '&.active': {
      display: 'inline-block',
      width: '100%',
      height: ['3em', '3em', '2.8em', '2.7em', '3.5em', '4em'],
      borderRadius: '2em',
      color: `${colors.white}`,
      backgroundColor: `${colors.teal}`,
      lineHeight: [3, 3, 2.8, 2.7, 3.5, 4],
    },
  },
}));

export default function TabBarCard() {
  return (
    <Footer>
      <List>
        <Item1>
          <NavLink exact to="/accountbook" activeClassName="active">
            Start
          </NavLink>
        </Item1>
        <Item>
          <NavLink exact to="/accountbook/timeline">
            내역
          </NavLink>
        </Item>
        <Item>
          <NavLink exact to="/calendar">
            달력
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
