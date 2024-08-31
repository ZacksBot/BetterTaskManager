import {DeviceUUID}  from "device-uuid";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { asyncGetAllTasks, asyncUpdateSetting } from "./actions";
import "./App.css";
import TaskForm from "./components/Form";
import Modal from "./components/Modal.js";
import NavBar from "./components/NavBar.js";
import { SettingForm } from "./components/SettingForm";
import Space from "./components/Space.js";
import TasksGanttChart from "./components/TasksGanttChart";
import TaskTable from "./components/TaskTable.js";

function App() {
  const [formModal, setFormModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [tableData, setTableData] = useState([]);

  const [settingData, setSettingData] = useState({});
  const [settingInput, setSettingInput] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("task-manager-uuid")) {
      const uuid = new DeviceUUID().get();
      console.log(uuid)
      localStorage.setItem("task-manager-uuid", uuid);
    }
  }, []);

  // Please test it, and let me  know if you find any issues, Thanks

  const loadTableData = useCallback(async () => {
    let {
      data: { data, setting },
      success,
    } = await asyncGetAllTasks();

    if (success) {
      setTableData(
        data.map((data) => {
          data.StartingTime = new Date(data.StartingTime);
          data.Deadline = new Date(data.Deadline);
          data.Days =
            (new Date(data.Deadline) - new Date()) / (1000 * 60 * 60 * 24);
          return data;
        })
      );
      setSettingData(setting);
      setSettingInput(setting.Hours);
    }
  }, []);

  useEffect(() => {
    loadTableData();
  }, [loadTableData]);

  const handleModal = () => {
    if (selectedRow?._id) setSelectedRow({});
    setFormModal((s) => !s);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormModal(true);
  };

  return (
    <>
      <NavBar
        handleModal={handleModal}
        handleSettingModal={() => setSettingModal((s) => !s)}
      ></NavBar>
      <Space></Space>

      <Routes>
        <Route path='/' exact element={<Navigate to="/tasks" /> }></Route>
        <Route path='/tasks' element={
          <TaskTable
            data={tableData}
            loadTableData={loadTableData}
            onEdit={handleEdit}
          ></TaskTable>
        }  />
        <Route path="/timeline" element={
          <TasksGanttChart
            data={tableData}
            loadTableData={loadTableData}
            onEdit={handleEdit}
          ></TasksGanttChart>
        } />
      </Routes>

      <Space></Space>

      <Modal handleModal={handleModal} show={formModal}>
        <TaskForm
          settings={settingData}
          data={selectedRow}
          loadTableData={loadTableData}
          handleModal={handleModal}
        />
      </Modal>

      <Modal
        handleModal={() => {
          setSettingInput(settingData.Hours);
          setSettingModal((s) => !s);
        }}
        show={settingModal}
      >
        <SettingForm
          settingData={settingData}
          setSettingData={setSettingData}
          settingInput={settingInput}
          setSettingInput={setSettingInput}
          setSettingModal={setSettingModal}
        />
      </Modal>
    </>
  );
}

export default App;
