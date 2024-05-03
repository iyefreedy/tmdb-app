import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import PrimaryButton from "./PrimaryButton";
import Spinner from "./Spinner";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  value: number;
  show: boolean;
  isLoading: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: FormEventHandler;
  onChange: ChangeEventHandler;
}

const RatingDialog: React.FC<Props> = ({
  show,
  value,
  isLoading,
  setShow,
  onSubmit,
  onChange,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setShow]);

  return (
    show && (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-600 bg-opacity-70 px-4">
        <div className="relative w-full max-w-md rounded-lg bg-white p-5 shadow">
          <PrimaryButton
            type="button"
            className="absolute right-0 top-0 bg-transparent p-2"
            onClick={() => setShow(false)}
          >
            <XMarkIcon className="h-4 w-4 text-gray-900" />
          </PrimaryButton>
          <h3 className="mb-4 text-xl font-medium">Rate movies</h3>

          <form onSubmit={onSubmit}>
            <div className="relative mb-2">
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                className="w-[calc(100%_-_3rem)]"
                value={value}
                onChange={onChange}
              />

              <span className="absolute -right-1 -top-1 inline-block w-10 rounded-md bg-slate-600 px-2 py-0.5 text-center text-white">
                {value}
              </span>
            </div>

            <PrimaryButton type="submit" className="text-sm">
              {isLoading ? <Spinner className="my-0 h-5 w-5 py-0" /> : "Submit"}
            </PrimaryButton>
          </form>
        </div>
      </div>
    )
  );
};

export default RatingDialog;
