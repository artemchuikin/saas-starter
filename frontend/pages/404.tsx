import Head from 'next/head';
import {NotFoundPage} from '@/src/pages/not-found-page';

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Starter NextJS — 404</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <NotFoundPage />
        </>
    );
}
