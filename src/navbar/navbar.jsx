import {
  Link,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';

import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import {
  clearLoginField,
  logout,
} from '../reducers/user';

const ToolBox = styled.div(mediaquery({
  width: '90%',
  margin: '0 auto',
}));

const TabList = styled.ul({
  display: 'flex',
  padding: '0 2.5em',
  textAlign: 'center',
});

const List = styled.ul({
  display: 'flex',
  float: 'right',
  padding: '0 2.5em',
  textAlign: 'center',
});

const Item = styled.li({
  width: '5em',
  height: '2.5em',
  margin: '0 .5em',
  padding: '.5em',
  fontSize: '.9em',
  lineHeight: '1.2em',
  '& a': {
    color: `${colors.black}`,
    '&:hover': {
      color: `${colors.gray_text03}`,
      fontWeight: '700',
    },
  },
});

export default function Navbar() {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => ({
    accessToken: state.user.accessToken,
  }));

  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearLoginField());
  };

  return (
    <>
      <ToolBox>
        <List>
          {accessToken
            ? (
              <Item>
                <button
                  type="button"
                  onClick={handleClickLogout}
                >
                  Log out
                </button>
              </Item>
            )
            : (
              <Item>
                <Link to="/login"> Log in</Link>
              </Item>
            )}
          <Item>
            <Link to="/setting">
              <FontAwesomeIcon icon={faCog} />
            </Link>
          </Item>
        </List>
      </ToolBox>
      <ToolBox>
        <TabList>
          <Item>
            <Link to="/">
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </Item>
        </TabList>
      </ToolBox>
    </>
  );
}
