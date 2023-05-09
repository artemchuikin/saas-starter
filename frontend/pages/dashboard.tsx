import Head from 'next/head';
import {DashboardPage} from '@/src/pages/dashboard-page';

export default function Dasboard() {
    return (
        <>
            <Head>
                <title>Starter NextJS — Dashboard</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <DashboardPage />
        </>
    );
}
