import React, { useCallback, useState } from "react";
import { Chart } from "react-google-charts";
let STATUSES = ["PENDING", "STARTED", "COMPLETED"];

const TasksGanttChart = ({ data: tasks, loadTableData, onEdit }) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearch = useCallback(({ target: { value } }) => {
    setSearchValue(value);
  }, []);

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const rows = tasks
  .filter(task => task.Description?.toLowerCase()?.indexOf(searchValue.toLowerCase()) !== -1)
  .map(task => ([
    task.Description,
    task.Description,
    task.Category,
    task.StartingTime,
    task.Deadline,
    `${task.Days} Days`,
    ((task.ActualDuration/task.EstimatedDuration)*100).toFixed(2),
    null
  ]))
  
  const chartData = [columns, ...rows];
  
  const options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };

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

        <Chart
          chartType="Gantt"
          width="100%"
          height="50%"
          data={chartData}
          options={options}
        />
        
      </div>
    </>
  );
};

export default TasksGanttChart;