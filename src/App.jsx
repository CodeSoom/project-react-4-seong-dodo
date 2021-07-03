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

const HeaderContainer = styled.header({
  top: 0,
  left: 0,
  right: 0,
  height: '8em',
  margin: '0 auto',
  lineHeight: '8em',
});

const Title = styled.h1({
  margin: '0 auto',
  color: `${colors.black}`,
  fontSize: '3em',
  textAlign: 'center',
});

export default function App() {
  return (
    <>
      <HeaderContainer>
        <Title>Mine</Title>
      </HeaderContainer>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/budget" component={BudgetPage} />
        <Route path="/calendar" component={CalendarPage} />
      </Switch>
      <Global styles={reset} />
    </>
  );
}
