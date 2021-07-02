import {
  Switch,
  Route,
} from 'react-router-dom';

import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import reset from './style/reset';
import colors from './style/colors';

import HomePage from './HomePage';
import BudgetPage from './BudgetPage';
import CalendarPage from './CalendarPage';

const Title = styled.h1({
  margin: '1.5em auto',
  color: `${colors.black}`,
  fontSize: '3em',
  textAlign: 'center',
});

export default function App() {
  return (
    <>
      <header>
        <Title>Mine</Title>
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/budget" component={BudgetPage} />
        <Route path="/calendar" component={CalendarPage} />
      </Switch>
      <Global styles={reset} />
    </>
  );
}
