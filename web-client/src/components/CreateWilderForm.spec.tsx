import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import CreateWilderForm from './CreateWilderForm';

describe('CreateWilderForm', () => {
  it('does not render form', () => {
    render(<CreateWilderForm />);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('renders button to show form', () => {
    render(<CreateWilderForm />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(
      within(button).getByText('Montrer le formulaire')
    ).toBeInTheDocument();
  });

  describe('when clicking button to show form', () => {
    it('renders form', () => {
      render(<CreateWilderForm />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('renders button to hide form', () => {
      render(<CreateWilderForm />);
      fireEvent.click(screen.getByRole('button'));

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(
        within(button).getByText('Cacher le formulaire')
      ).toBeInTheDocument();
    });

    describe('when clicking button to hide form', () => {
      it('hides form', () => {
        render(<CreateWilderForm />);
        fireEvent.click(screen.getByRole('button'));

        fireEvent.click(screen.getByRole('button'));
        expect(screen.queryByRole('form')).not.toBeInTheDocument();
      });
    });
  });
});
