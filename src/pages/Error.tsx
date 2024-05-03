import { Link, useRouteError } from "react-router-dom";

import notFoundImage from "@assets/not-found.png";

const Error = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-5 dark:text-white">
      <img src={notFoundImage} alt="not found" width={450} />
      <div className="text-xl font-medium ">
        Sorry, the page you're looking for not found.
      </div>
      <Link className="underline" to={"/"}>
        Back to home
      </Link>
    </div>
  );
};

export default Error;
