import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MonthSwiperContainer from './MonthSwiperContainer';

jest.mock('react-redux');

describe('MonthSwiperContainer', () => {
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
        month: 7,
      },
    }));
  });

  it('월 이동 화면 폼이 그려진다.', () => {
    const { container } = render(<MonthSwiperContainer />);

    expect(container).toHaveTextContent('2021');
    expect(container).toHaveTextContent('7월');
    expect(container).toHaveTextContent('<');
    expect(container).toHaveTextContent('>');
  });

  describe('월 이동 버튼', () => {
    it('listens click event and move the previous month', () => {
      const { getByText } = render(<MonthSwiperContainer />);

      fireEvent.click(getByText('<'));

      expect(dispatch).toBeCalled();
    });

    it('listens click event and move the next month', () => {
      const { getByText } = render(<MonthSwiperContainer />);

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
        },
      }));

      const { queryByText } = render(<MonthSwiperContainer />);

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
        },
      }));

      const { queryByText } = render(<MonthSwiperContainer />);

      fireEvent.click(queryByText('>'));

      expect(dispatch).not.toBeCalled();
    });
  });
});
