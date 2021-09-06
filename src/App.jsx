import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import reset from './style/reset';
import colors from './style/colors';
import mediaquery from './style/mediaquery';

import Navbar from './navbar/Navbar';

import HomePage from './HomePage';
import JoinPage from './join/JoinPage';
import LoginPage from './login/LoginPage';
import AccountBookPage from './accountbook/AccountBookPage';
import BudgetPage from './accountbook/budget/BudgetPage';
import CalendarPage from './accountbook/calendar/CalendarPage';
import NotFoundPage from './NotFoundPage';

const Container = styled.header(mediaquery({
  margin: '0 auto',
  lineHeight: ['3em', '4em', '5em', '7em', '8em'],
}));

const Title = styled.h1(mediaquery({
  margin: '0 auto',
  color: `${colors.black}`,
  fontSize: ['1.2em', '1.5em', '1.8em', '2.8em', '3em'],
  textAlign: 'center',
  '& a': {
    color: `${colors.black}`,
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.black}`,
    },
  },
}));

export default function App() {
  return (
    <>
      <Container>
        <Title>
          <Link to="/calendar">
            Mine
          </Link>
        </Title>
        <Navbar />
      </Container>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/budget" component={BudgetPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/accountbook" component={AccountBookPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Global styles={reset} />
    </>
  );
}
