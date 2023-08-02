import swal from "sweetalert";

export const notifySuccess = (message) => {
  swal(message, {
    icon: "success",
  });
};

export const notifyFailure = (message) => {
  swal(message, {
    icon: "error",
  });
};
