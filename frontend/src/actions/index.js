import { callApi } from "../services/api";

let params = {
  data: null,
  success: false,
};

export const asyncGetAllTasks = () => {
  try {
    return callApi({ path: "getAll" }).then((res) => {
      return { ...params, data: res, success: true };
    });
  } catch (error) {
    return { ...params, success: false };
  }
};

export const asyncCreateTask = (body) => {
  try {
    return callApi({ path: "post", method: "POST", body }).then((res) => {
      return { ...params, ...res, success: true };
    });
  } catch (error) {
    return { ...params, success: false };
  }
};

export const asyncUpdateTask = (body) => {
  try {
    let { id, ...restData } = body;
    return callApi({
      path: `update/${id}`,
      method: "PATCH",
      body: restData,
    }).then((res) => {
      return { ...params, ...res, success: true };
    });
  } catch (error) {
    return { ...params, success: false };
  }
};

export const asyncDeleteTask = (id) => {
  try {
    return callApi({
      path: `delete/${id}`,
      method: "DELETE",
    }).then((res) => {
      return { ...params, ...res, success: true };
    });
  } catch (error) {
    return { ...params, success: false };
  }
};

/**********************/
// Setting Actions
/**********************/

export const asyncUpdateSetting = (body) => {
  try {
    return callApi({
      path: `setting`,
      method: "PATCH",
      body,
    }).then((res) => {
      return { data: res, success: true };
    });
  } catch (error) {
    return { ...params, success: false };
  }
};
