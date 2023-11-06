import { render, screen } from '@testing-library/react'
import About from '../../pages/about';
import '@testing-library/jest-dom';

describe('About', () => {
    it('contain text', () => {
        render(<About />)

        const heading = screen.getByText('Abouts');

        expect(heading).toBeInTheDocument()
    })
})