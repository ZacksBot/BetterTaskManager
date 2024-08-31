import React from "react";

function Modal({ show, handleModal, children }) {
  return show ? (
    <div
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative my-10 h-max mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div
          onClick={handleModal}
          className="ml-auto text-xl cursor-pointer flex items-center justify-center h-6 w-6"
        >
          x
        </div>
        <div className="mt-3 text-center">{children}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
