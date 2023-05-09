import Head from 'next/head';
import {AboutPage} from '@/src/pages/about-page';

export default function About() {
    return (
        <>
            <Head>
                <title>Starter NextJS — About</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <AboutPage />
        </>
    );
}
