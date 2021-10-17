import { useState } from 'react';

import {
  Link,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import Loading from '../loading/Loading';

import {
  clearLoginField,
  logout,
} from '../reducers/user';

import {
  clearMonthlyTransaction,
} from '../reducers/accountbook';

const Layout = styled.ul(mediaquery({
  width: '100%',
  margin: 0,
  padding: 0,
}));

const Item = styled.li(mediaquery({
  width: ['5em', '5em', '5em', '5em', '5em', '5em'],
  height: ['2em', '2em', '2em', '2.4em', '2.5em'],
  margin: '0 2em 0 auto',
  backgroundColor: `${colors.teal_border}`,
  borderRadius: '0.4em',
  padding: '0.5em',
  fontSize: ['0.7em', '0.8em', '0.9em', '1em', '1.2em', '1.5em'],
  fontWeight: '500',
  lineHeight: [1, 1, 1, 1.2, 1.5, 1.5],
  textAlign: 'center',
  '& a': {
    color: `${colors.black}`,
    '&:hover': {
      color: `${colors.gray_text02}`,
      fontWeight: '700',
    },
  },
}));

export default function Navbar() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => ({
    accessToken: state.user.accessToken,
  }));

  const handleClickLogout = async () => {
    setIsLoading(true);
    await dispatch(logout());
    await dispatch(clearLoginField());
    await dispatch(clearMonthlyTransaction());
    setIsLoading(false);
  };

  return (
    <Layout>
      {
        accessToken
          ? (
            <>
              {
                isLoading
                  ? <Loading />
                  : (
                    <Item>
                      <button
                        type="button"
                        onClick={handleClickLogout}
                      >
                        Log out
                      </button>
                    </Item>
                  )
              }
            </>
          )
          : (
            <Item>
              <Link to="/login"> Log in</Link>
            </Item>
          )
      }
    </Layout>
  );
}
