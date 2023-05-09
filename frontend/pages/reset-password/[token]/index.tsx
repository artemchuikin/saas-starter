import Head from 'next/head';
import {ResetPasswordPage} from '@/src/pages/reset-password-page';

export default function ResetPassword() {
    return (
        <>
            <Head>
                <title>Starter NextJS — Reset password</title>
                <meta name="description" content="Starter NextJS" key="desc" />
                <meta property="og:title" content="Starter NextJS" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Starter NextJS" />
            </Head>
            <ResetPasswordPage />
        </>
    );
}
