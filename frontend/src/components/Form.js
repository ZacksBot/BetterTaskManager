import moment from "moment";
import React, { useEffect, useState } from "react";
import { asyncCreateTask, asyncUpdateTask } from "../actions";

function TaskForm({ data, handleModal, loadTableData, settings }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimated, setEstimatedDuration] = useState("");
  const [actual, setActualDuration] = useState("");

  useEffect(() => {
    if (data?._id) {
      setDescription(data.Description);
      setCategory(data.Category);
      setStartingTime(moment(data.StartingTime).format("YYYY-MM-DD"));
      setDeadline(moment(data.Deadline).format("YYYY-MM-DD"));
      setEstimatedDuration(data.EstimatedDuration);
      setActualDuration(data.ActualDuration);
    }
  }, [data]);

  let isAllowed = settings.usedHours < settings.Hours;
  let availableHours = Math.max(0, settings.Hours - settings.usedHours);
  let isHoursValid =
    estimated <= (data.EstimatedDuration || 0) + availableHours;

  const isCreate = !Object.keys(data).length;
  let title = isCreate ? "Create" : "Update";

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isHoursValid) return false;

    const resp = await asyncUpdateTask({
      id: data._id,
      Description: description,
      Category: category,
      StartingTime: startingTime,
      Deadline: deadline,
      EstimatedDuration: estimated,
      ActualDuration: actual,
    });
    if (resp.success) {
      handleModal();
      loadTableData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isHoursValid) return false;
    if (!isAllowed) return false;

    const resp = await asyncCreateTask({
      Description: description,
      Category: category,
      StartingTime: startingTime,
      Deadline: deadline,
      EstimatedDuration: estimated,
      ActualDuration: actual,
    });
    if (resp.success) {
      handleModal();
      loadTableData();
    }
  };

  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form
        className="space-y-6"
        onSubmit={isCreate ? handleSubmit : handleUpdate}
      >
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          {title} Task
        </h5>
        {!!availableHours && (
          <p className="text-red-700 mt-5 text-sm">
            You only have {availableHours} Hours Left!
          </p>
        )}
        {!isAllowed && (
          <p className="text-red-700 mt-5 text-sm">
            You have reached your {settings.usedHours} hours, you can not create
            a new task
          </p>
        )}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Description
          </label>
          <input
            value={description}
            type="text"
            name="description"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Category
          </label>
          <select
            value={category}
            id="category"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Choose a category</option>
            <option value="Finished">Finished</option>
            <option value="Unfinished">UnFinished</option>
            <option value="Test">Test</option>
            <option value="Test1">Test1</option>
            <option value="Test2">Test2</option>
            <option value="Test3">Test3</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="startingTime"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            StartingTime
          </label>
          <input
            value={startingTime}
            type="date"
            name="startingTime"
            id="startingTime"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            onChange={(e) => setStartingTime(e.target.value)} //setStartingTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Deadline
          </label>
          <input
            value={deadline}
            type="date"
            name="deadline"
            id="deadline"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="estimated"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Estimated Duration
          </label>
          <input
            value={estimated}
            type="number"
            min={0}
            name="estimated"
            id="estimated"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e) => setEstimatedDuration(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="actual"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Actual Duration
          </label>
          <input
            value={actual}
            min={0}
            type="number"
            name="actual"
            id="actual"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e) => setActualDuration(e.target.value)}
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5"></div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {title}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
