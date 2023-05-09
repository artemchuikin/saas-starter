export type SvgIconProps = {
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    className?: string;
};

export const SvgIcon = ({Icon, className}: SvgIconProps) => {
    return <Icon className={className} />;
};
