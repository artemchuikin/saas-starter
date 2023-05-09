import Head from 'next/head';
import {HomePage} from '@/src/pages/home-page';

export default function Home() {
    return (
        <>
            <Head>
                <title>Starter NextJS — Main</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <HomePage />
        </>
    );
}
