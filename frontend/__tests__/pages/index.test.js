import { render, screen } from '@testing-library/react'
import Home from '../../pages';
import '@testing-library/jest-dom';

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByText('Learn how to build and grow one-person business');

        expect(heading).toBeInTheDocument()
    })
})