import Head from 'next/head';
import {SignInPage} from '@/src/pages/sign-in-page';

export default function SignIn() {
    return (
        <>
            <Head>
                <title>Starter NextJS — Sign in</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
            </Head>
            <SignInPage />
        </>
    );
}
