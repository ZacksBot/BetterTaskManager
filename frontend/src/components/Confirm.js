import React from "react";

const Confirm = (props) => {
  const { open, title, children, handlePrompt } = props;

  if (!open) {
    return <></>;
  }

  return (
    <div className="z-50 flex items-center justify-center fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex-col flex-alig">
      <div
        id="alert-additional-content-2"
        className="p-4 mb-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-200"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2 text-red-900 dark:text-red-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium text-red-900 dark:text-red-800">
            {title}
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-red-900 dark:text-red-800">
          {children}
        </div>
        <div className="flex">
          <button
            onClick={() => handlePrompt(true)}
            type="button"
            className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900"
          >
            Yes
          </button>
          <button
            onClick={() => handlePrompt(false)}
            type="button"
            className="text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
