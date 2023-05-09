/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                xs: '320px',
                sm: '768px',
                md: '1024px',
                lg: '1200px',
                xl: '1600px',
                ul: '1920px',
                phone: {max: '1023px'},
                tablet: {max: '1199px'}
            },
            colors: {
                white: '#fbfcf8',
                fill: '#111111',
                hotpink: 'hotpink',
                bpink: '#594d5b',
                primary: '#AEF359',
                error: '#F95954'
            },
            opacity: {
                8: '.08'
            },
            fontSize: {
                '2xl': [
                    '1.75rem',
                    {
                        lineHeight: '1'
                    }
                ],
                '5xl': [
                    '2.375rem',
                    {
                        lineHeight: '1'
                    }
                ],
                ul: '10rem',
                gl: '12rem'
            },
            transitionProperty: {
                top: 'top',
                visibility: 'visibility'
            },
            transitionDelay: {
                0: '0ms'
            },
            transitionDuration: {
                0: '0ms',
                250: '250ms'
            }
        }
    },
    plugins: []
};
