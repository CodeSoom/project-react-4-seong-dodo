import {
  Switch,
  Route,
} from 'react-router-dom';

import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import reset from './style/reset';
import colors from './style/colors';
import mediaquery from './style/mediaquery';

import Navbar from './navbar/navbar';
import HomePage from './HomePage';
import JoinPage from './join/JoinPage';
import LoginPage from './login/LoginPage';
import AccountBookPage from './accountbook/AccountBookPage';
import BudgetPage from './accountbook/budget/BudgetPage';
import CalendarPage from './accountbook/calendar/CalendarPage';

const Container = styled.header(mediaquery({
  margin: '0 auto',
  lineHeight: ['3em', '4em', '5em', '7em', '8em'],
  // backgroundColor: 'pink',
}));

const Title = styled.h1(mediaquery({
  margin: '0 auto',
  color: `${colors.black}`,
  fontSize: ['1.2em', '1.5em', '1.8em', '2.8em', '3em'],
  textAlign: 'center',
}));

export default function App() {
  return (
    <>
      <Container>
        <Title>Mine</Title>
        <Navbar />
      </Container>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/budget" component={BudgetPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/accountbook" component={AccountBookPage} />
      </Switch>
      <Global styles={reset} />
    </>
  );
}
