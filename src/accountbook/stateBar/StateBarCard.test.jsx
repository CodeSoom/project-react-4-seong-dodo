import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import StateBarCard from './StateBarCard';

import ACCESS_TOKEN from '../../../fixtures/access-token';

jest.mock('react-redux');

describe('StateBarCard', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: '',
      },
      accountbook: {
        year: 2021,
        month: 10,
        monthlyTransaction: [],
      },
    }));
  });

  it('현재 2021년 10월이면 2021년 10월에 대한 상태 화면이 그려진다', () => {
    const { container } = render(<StateBarCard />);

    expect(container).toHaveTextContent('2021');
    expect(container).toHaveTextContent('10월');
    expect(container).toHaveTextContent('<');
    expect(container).toHaveTextContent('>');
    expect(container).toHaveTextContent('수입');
    expect(container).toHaveTextContent('지출');
  });

  describe('월 이동 버튼', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: '',
      },
      accountbook: {
        year: 2021,
        month: 10,
        monthlyTransaction: [],
      },
    }));

    it('"<" 버튼을 클릭하면 이전 달이 그려진다.', () => {
      const { getByText } = render(<StateBarCard />);

      fireEvent.click(getByText('<'));

      expect(dispatch).toBeCalled();
    });

    it('">" 버튼을 클릭하면 다음 달이 그려진다.', () => {
      const { getByText } = render(<StateBarCard />);

      fireEvent.click(getByText('>'));

      expect(dispatch).toBeCalled();
    });
  });

  describe('월 이동 버튼 제약 조건', () => {
    it('when month > 0', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          accessToken: '',
        },
        accountbook: {
          year: 2021,
          month: 0,
          monthlyTransaction: [],
        },
      }));

      const { queryByText } = render(<StateBarCard />);

      fireEvent.click(queryByText('<'));

      expect(dispatch).not.toBeCalled();
    });

    it('when month < 13', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          accessToken: '',
        },
        accountbook: {
          year: 2021,
          month: 13,
          monthlyTransaction: [],
        },
      }));

      const { queryByText } = render(<StateBarCard />);

      fireEvent.click(queryByText('>'));

      expect(dispatch).not.toBeCalled();
    });
  });

  describe('로그인한 사용자의 해당 월에 대한 거래내역이 없는 경우', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: ACCESS_TOKEN,
      },
      accountbook: {
        year: 2021,
        month: 10,
        monthlyTransaction: [],
      },
    }));

    it('해당 월의 지출 및 수입의 총 내역이 0 원으로 그려진다.', () => {
      const { container } = render(<StateBarCard />);

      expect(container).toHaveTextContent('0 원');
    });
  });
});
