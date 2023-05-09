export type AuthTitledGroup = {
    title: string;
    description?: string;
};

export const AuthTitledGroup = ({title, description}: AuthTitledGroup) => {
    return (
        <>
            <h1 className="mb-3 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
                {title}
            </h1>
            {description && (
                <p className="mb-8 text-sm xl:text-base opacity-50">
                    {description}
                </p>
            )}
        </>
    );
};
