import React, { useCallback, useState } from "react";
import { asyncDeleteTask, asyncUpdateTask } from "../actions";
import Confirm from "./Confirm";

const ACTIONS = { STATUS: 0, DELETE: 1 };
let STATUSES = ["PENDING", "STARTED", "COMPLETED"];

const Tasks = ({ data, loadTableData, onEdit }) => {
  const [rowId, setRowId] = useState(null);
  const [action, setAction] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [prevSelectedStatus, setPrevSelectedStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const onSearch = useCallback(({ target: { value } }) => {
    setSearchValue(value);
  }, []);

  const handleDeletePrompt = async (action) => {
    if (action) {
      await asyncDeleteTask(rowId);
    }
    setRowId(null);
    setAction(null);
    loadTableData();
  };

  const handleStatusPrompt = async (action) => {
    if (action) {
      await asyncUpdateTask({ id: rowId, Status: selectedStatus });
    } else {
    }
    setRowId(null);
    setAction(null);
    loadTableData();
  };

  const handleStatus = async ({ id, status }) => {
    setRowId(id);
    setSelectedStatus(status);
    setAction(ACTIONS.STATUS);
  };

  const handleDelete = async (id) => {
    setRowId(id);
    setAction(ACTIONS.DELETE);
  };

  const tableData = data.filter(
    (task) =>
      task.Description?.toLowerCase()?.indexOf(searchValue.toLowerCase()) !== -1
  );

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              value={searchValue}
              onChange={onSearch}
              type="text"
              id="table-search"
              className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for discription"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                StartingTime
              </th>
              <th scope="col" className="py-3 px-6">
                Deadline
              </th>
              <th scope="col" className="py-3 px-6">
                Time Left
              </th>
              <th scope="col" className="py-3 px-6">
                Estimated Duration
              </th>
              <th scope="col" className="py-3 px-6">
                Actual Duration
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!!tableData.length ? (
              tableData.map((data) => {
                let daysStyle = "";

                if (data.Days >= 1 && data.Days <= 10) {
                  daysStyle = "text-red-700 bg-red-100";
                } else if (data.Days >= 11 && data.Days <= 20) {
                  daysStyle = "text-yellow-700 bg-yellow-100";
                } else if (data.Days >= 20) {
                  daysStyle = "text-green-700 bg-green-100";
                }

                let statusStyle =
                  data.Status === 0
                    ? "text-yellow-700 bg-yellow-100"
                    : data.Status === 1
                    ? "text-green-700 bg-green-100"
                    : "text-blue-700 bg-blue-100";

                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={data._id}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.Description}
                    </th>
                    <td className="py-4 px-6">{data.Category}</td>
                    <td className="py-4 px-6">
                      {data.StartingTime.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      {data.Deadline.toLocaleDateString()}
                    </td>
                    <td className={`py-4 px-6 ${daysStyle}`}>
                      {data.Days.toFixed()} Days
                    </td>
                    <td className="py-4 px-6">
                      {data.EstimatedDuration} Hours
                    </td>
                    <td className="py-4 px-6">{data.ActualDuration} Hours</td>
                    <td className="py-4 px-6">
                      <select
                        value={
                          rowId === data?._id && action === ACTIONS.STATUS
                            ? prevSelectedStatus
                            : data.Status
                        }
                        onFocusCapture={(e) => {
                          setPrevSelectedStatus(e.target.value);
                        }}
                        onChange={(e) => {
                          handleStatus({
                            id: data?._id,
                            status: e.target.value,
                          });
                        }}
                        className={`${statusStyle} text-sm rounded-lg border border-gray-300 focus:ring-transparent focus:border-gray-300 `}
                      >
                        {STATUSES.map((status, ind) => {
                          return (
                            <option
                              key={status + ind}
                              className="text-black bg-gray-50 pt-10 "
                              value={ind}
                            >
                              {status}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        onClick={() => onEdit(data)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          ></path>
                        </svg>
                      </span>
                      <span
                        onClick={() => handleDelete(data?._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  No Task Found!
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Confirm
        id={rowId}
        title="Update Status?"
        handlePrompt={handleStatusPrompt}
        open={action === ACTIONS.STATUS}
      >
        Are you sure you want to update this task status?
      </Confirm>
      <Confirm
        id={rowId}
        title="Delete Task?"
        handlePrompt={handleDeletePrompt}
        open={action === ACTIONS.DELETE}
      >
        Are you sure you want to delete this task?
      </Confirm>
    </>
  );
};

export default Tasks;
