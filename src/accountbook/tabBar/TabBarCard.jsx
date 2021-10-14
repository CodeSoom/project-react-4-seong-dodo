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
}));

const List = styled.ul(mediaquery({
  display: 'inline-flex',
  width: ['100%', '100%', '100%', '90%', '60%'],
  height: ['3em', '3em', '2.8em', '2.7em', '2.2em'],
  margin: [
    '1em auto',
    '1em auto',
    '2.5em auto',
    '2em auto',
    '2.5em auto',
  ],
  padding: 0,
  borderRadius: '5em',
  backgroundColor: `${colors.gray_backgroud}`,
  fontSize: ['0.7em', '0.7em', '0.8em', '0.9em', '.9em'],
  lineHeight: ['3em', '3em', '2.8em', '2.7em', '2.3em'],
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
      height: ['3em', '3em', '2.8em', '2.7em', '2.1em'],
      borderRadius: '2em',
      color: `${colors.white}`,
      backgroundColor: `${colors.teal}`,
      lineHeight: ['3em', '3em', '2.8em', '2.7em', '2.1em'],
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
      height: ['3em', '3em', '2.8em', '2.7em', '2.1em'],
      borderRadius: '2em',
      color: `${colors.white}`,
      backgroundColor: `${colors.teal}`,
      lineHeight: ['3em', '3em', '2.8em', '2.7em', '2.1em'],
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
