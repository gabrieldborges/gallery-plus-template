import cx from "classnames"

interface MainContentProps extends React.ComponentProps<"main"> {}

export default function MainContent({ children, className, ...props}: MainContentProps) {
  return (
    <main
    className={cx("md:mt-20 mt-4 pb-20", className)}
    {...props}
    >
        {children}
    </main>
  );
}
