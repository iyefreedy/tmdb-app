import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = ({ className }) => {
  console.log("spinner");
  const defaultClassName = twMerge(
    "mx-auto my-5 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-gray-600",
    className,
  );
  return <div className={defaultClassName}></div>;
};

export default Spinner;
