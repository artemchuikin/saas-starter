import {ForgotPasswordForm} from '@/src/entities/auth/forms/ForgotPasswordForm';
import {AuthTitledGroup} from '@/src/entities/auth/ui/AuthTitledGroup';
import {Container} from '@/src/shared/ui/Container';
import {ImageBlock} from '@/src/shared/ui/ImageBlock';

export const ForgotPasswordPage = () => {
    return (
        <Container className="lg:max-w-full sm:!px-0 lg:!px-0 xl:!px-0">
            <div className="flex justify-between min-h-screen">
                <div className="w-full sm:w-[50%] md:w-[45%] flex justify-center items-center flex-col py-24">
                    <div className="max-w-[460px] sm:max-w-[340px] md:max-w-sm lg:max-w-[460px] xl:max-w-[480px] w-full">
                        <AuthTitledGroup
                            title="Forgot password?"
                            description="No worries, we’ll send you reset instructions."
                        />
                        <ForgotPasswordForm />
                    </div>
                </div>
                <div className="hidden sm:block sm:w-[50%] md:w-[55%] h-screen fixed right-0">
                    <div className="absolute !left-0 sm:inset-4 md:inset-5 rounded-xl overflow-hidden">
                        <ImageBlock
                            src="/img/2.jpg?1"
                            fill={true}
                            sizes="55vw"
                            priority={true}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
