import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { FormResponse } from "../../interfaces";

const buildErrorMsg = (errors: string) => {
  return (
    <div>
      <h4>{"🦄 Ooops!"}</h4>
      <ul style={{ fontSize: "1rem" }}>
        <li className="text-secundary">{errors}</li>
      </ul>
    </div>
  );
};

const showErrorMessage = (errors: string) => {
  const errorMsg = buildErrorMsg(errors);
  console.log("Error", errorMsg);
  toast(errorMsg, {
    position: "top-right",
    hideProgressBar: false,
    autoClose: 10000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "nav-margin",
  });
};

const submitContact = async (
  name: string,
  email: string,
  message: string,
  recaptcha: string | null,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  setSubmissionSuccess: Dispatch<SetStateAction<boolean>>,
) => {
  setIsSubmitting(true);
  const myHeaders = new Headers();

  // From postman, probably this isn't needed
  myHeaders.append("Cookie", "BACKENDID=backend_1OPQ1_omega03|Yg7Jk|Yg7Jh");

  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("message", message);
  formdata.append("recaptcha", recaptcha ? recaptcha : "");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  try {
    const res = await fetch(
      "https://tecnicosolarboat.tecnico.ulisboa.pt/api/contactForm.php",
      requestOptions,
    );
    const resData: FormResponse = await res.json();
    console.log("Resdata", resData);
    if (resData.success) {
      // Send data to firebase database
      setSubmissionSuccess(true);
      setIsSubmitting(false);
      // showSuccessMessage();
    } else {
      showErrorMessage(resData.msg);
      setIsSubmitting(false);
    }
  } catch (error) {
    showErrorMessage("Something went wrong, please try again later");
    setIsSubmitting(false);
  }
};

export { submitContact };
