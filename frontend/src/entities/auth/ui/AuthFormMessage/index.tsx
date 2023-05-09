export type AuthFormMessageProps = {
    Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    message: string;
};

export const AuthFormMessage = ({Icon, message}: AuthFormMessageProps) => {
    return (
        <div className="flex bg-white/8 rounded-xl p-6">
            {Icon && (
                <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 mt-1 rounded-full bg-primary text-fill">
                    <Icon className="w-3" />
                </span>
            )}
            <p className="ml-5 text-sm leading-6 xl:text-base xl:leading-7 opacity-70">
                {message}
            </p>
        </div>
    );
};
