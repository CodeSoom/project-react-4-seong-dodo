import { render, fireEvent } from '@testing-library/react';

import TypeButton from './TypeButton';

describe('TypeButton', () => {
  const handleClick = jest.fn();

  function renderTypeButton({ id = '', name = '' }) {
    return render((
      <TypeButton
        id={id}
        name={name}
        onClick={handleClick}
      />
    ));
  }
  it('renders type button', () => {
    const { queryByText } = renderTypeButton({ name: '수입' });

    expect(queryByText('수입')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByText } = renderTypeButton({ name: '수입' });

    fireEvent.click(getByText('수입'));

    expect(handleClick).toBeCalled();
  });
});
