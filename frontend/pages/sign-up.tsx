import Head from 'next/head';
import {SignUpPage} from '@/src/pages/sign-up-page';

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Starter NextJS — Sign up</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
            </Head>
            <SignUpPage />
        </>
    );
}
