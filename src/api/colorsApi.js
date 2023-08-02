import axiosClient from "./axiosClient";

const PATH = "/colors";

const colorsApi = {
  getColors: () => {
    return axiosClient.get(PATH);
  },
};

export default colorsApi;
