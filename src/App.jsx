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
import LoginPage from './login/LoginPage';
import JoinPage from './join/JoinPage';
import BudgetPage from './accountbook/budget/BudgetPage';
import TimeLinePage from './accountbook/timeline/TimeLinePage';
import CalendarPage from './accountbook/calendar/CalendarPage';
import AccountBookPage from './accountbook/AccountBookPage';
import NotFoundPage from './NotFoundPage';

const Container = styled.header(mediaquery({
  margin: '0 auto',
  lineHeight: ['4em', '5em', '6em', '9em', '11em', '12em'],
  // backgroundColor: ['beige', 'pink', 'gray', 'skyblue', 'green', 'plum'],
}));

const Title = styled.h1(mediaquery({
  margin: '0 auto',
  color: `${colors.black}`,
  fontSize: ['1.8em', '1.9em', '2.3em', '2.8em', '3.5em', '3.8em'],
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
        <Route exact path="/" component={CalendarPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/budget" component={BudgetPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route exact path="/accountbook" component={AccountBookPage} />
        <Route path="/accountbook/timeline" component={TimeLinePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Global styles={reset} />
    </>
  );
}
