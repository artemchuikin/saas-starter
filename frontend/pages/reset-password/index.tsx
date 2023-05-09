import Head from 'next/head';
import {ForgotPasswordPage} from '@/src/pages/forgot-password-page';

export default function ForgotPassword() {
    return (
        <>
            <Head>
                <title>Starter NextJS — Forgot password</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
            </Head>
            <ForgotPasswordPage />
        </>
    );
}
