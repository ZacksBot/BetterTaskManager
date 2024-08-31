import React from "react";
import { asyncUpdateSetting } from "../actions";

export const SettingForm = ({
  settingData,
  settingInput,
  setSettingData,
  setSettingInput,
  setSettingModal,
}) => {
  let canHoursBeDecrease = settingInput >= settingData.usedHours;

  const handleSettingUpdate = async (e) => {
    e.preventDefault();

    if (!canHoursBeDecrease) return false;

    const resp = await asyncUpdateSetting({
      Hours: settingInput,
    });

    if (resp.success) {
      setSettingData(resp.data);
      setSettingModal(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSettingUpdate}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Settings
        </h5>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-gray-300"
          >
            Weekly Hours
          </label>
          <input
            value={settingInput}
            type="number"
            placeholder="Enter max weekly hours"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e) => setSettingInput(e.target.value)}
          />
          {!canHoursBeDecrease && (
            <p className="text-left mt-5 text-red-700 text-sm">
              You Already have {settingData.usedHours} hours of tasks Created
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
};
