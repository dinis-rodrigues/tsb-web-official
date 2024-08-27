import { push, ref, remove } from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { RecruitmentDepartmentsForm, RecruitmentFormInfo } from "../../interfaces";
import { db } from "../Contexts/Firebase";

const errorMessages: { [key: string]: string } = {
  firstName: "Please enter your first name",
  lastName: "Please enter your last name",
  phoneNumber: "Please enter your phone number",
  email: "Please enter your email",
  confirmEmail: "Please confirm your email",
  degree: "Please enter your degree",
  curricularYear: "Please enter your curricular year",
  country: "Please enter your country",
  socialLink: "Please enter your social link",
  motivation: "Please enter your motivation",
  checkedDepartment: "Please select at least one department",
  recaptcha: "Please verify that you are not a robot",
  activeTable: "Recruitment is not open yet",
};

const validateInfo = (info: RecruitmentFormInfo) => {
  const errors = [];
  if (!info.firstName) errors.push("firstName");
  if (!info.lastName) errors.push("lastName");
  // if (info.phoneNumber || info.phoneNumber.length < 9)
  //   errors.push("phoneNumber");
  if (!info.email) {
    errors.push("email");
    errors.push("confirmEmail");
  }
  if (info.email && info.email !== info.confirmEmail) errors.push("confirmEmail");
  if (!info.degree) errors.push("degree");
  if (!info.curricularYear) errors.push("curricularYear");
  if (!info.country) errors.push("country");

  return errors;
};

const validateDepartments = (checkedDepartments: RecruitmentDepartmentsForm) => {
  const errors: string[] = [];
  let atLeastOneChecked = false;
  Object.entries(checkedDepartments).forEach(([value]) => {
    if (value) atLeastOneChecked = true;
  });

  if (!atLeastOneChecked) errors.push("checkedDepartment");

  return errors;
};

const validateRecaptcha = (recaptcha: string | null) => {
  return !recaptcha ? ["recaptcha"] : [];
};

const validateTable = (activeTable: string | undefined) => {
  return !activeTable ? ["activeTable"] : [];
};

const getSelectedDepartmentsArray = (checkedDepartments: RecruitmentDepartmentsForm) => {
  const selectedDepartments: string[] = [];

  Object.entries(checkedDepartments).forEach(([acronym, isChecked]) => {
    if (isChecked) selectedDepartments.push(acronym);
  });

  return selectedDepartments;
};

const buildErrorMsg = (errors: string[]) => {
  return (
    <div>
      <h4>{"🦄 Ooops!"}</h4>
      <ul style={{ fontSize: "1rem" }}>
        {errors.map((error) => (
          <li className="text-secundary" key={error}>
            {errorMessages[error]}
          </li>
        ))}
      </ul>
    </div>
  );
};

const showValidationError = (errors: string[]) => {
  toast(buildErrorMsg(errors), {
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

const showSuccessMessage = () => {
  toast("😀 Thank you for your submission!", {
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

const showErrorMessage = (msg: string) => {
  toast(msg, {
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

const senUserToDb = (
  info: RecruitmentFormInfo,
  checkedDepartments: RecruitmentDepartmentsForm,
  activeTable: string,
) => {
  const timestamp = Date.now();
  const selectedDepartments = getSelectedDepartmentsArray(checkedDepartments);
  const data = {
    name: info.firstName ? `${info.firstName.trim()} ${info.lastName.trim()}` : "Joe Doe",
    departments: selectedDepartments ? selectedDepartments : ["MM"],
    country: info.country ? info.country : "Portugal",
    email: info.email.trim(),
    phone: info.phoneNumber ? info.phoneNumber : "",
    link: info.socialLink ? info.socialLink.trim() : "",
    degree: info.degree ? info.degree : "",
    year: info.curricularYear ? info.curricularYear : 1,
    message: info.motivation ? info.motivation : "",
    timestamp: timestamp ? timestamp : 1,
  };
  // console.log("FB data", data);
  // console.log(activeTable, data);
  // const datas = {
  //   name: "dinis",
  //   departments: { "0": "dc", "1": "es" },
  //   country: "dinis",
  //   email: "dinis",
  //   phone: "dinis",
  //   link: "dinis",
  //   degree: "dinis",
  //   year: "dinis",
  //   message: "dinis",
  //   timestamp: 123123,
  // };
  // "(!data.exists() && auth.uid != null) ||
  //             							newData.hasChildren(['name', 'departments', 'country', 'email', 'phone', 'link', 'degree', 'year', 'message', 'timestamp']) &&
  //             							newData.child('name').isString() &&
  //                           newData.child('departments').val().length > 0 &&
  //                           newData.child('country').isString() &&
  //                           newData.child('email').isString() &&
  //                           newData.child('phone').isString() &&
  //                           newData.child('link').isString() &&
  //                           newData.child('degree').isString() &&
  //                           newData.child('year').isString() &&
  //                           newData.child('message').isString() &&
  //                           newData.child('number').isNumber()"
  return push(ref(db, `/public/recruitment/tables/${activeTable}`), data);
};

const sendSubmissionToServer = async (
  info: RecruitmentFormInfo,
  checkedDepartments: RecruitmentDepartmentsForm,
  recaptcha: string,
  activeTable: string,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  setSubmissionSuccess: Dispatch<SetStateAction<boolean>>,
) => {
  setIsSubmitting(true);
  const data = new FormData();
  const selectedDepartments = JSON.stringify(getSelectedDepartmentsArray(checkedDepartments));
  const myHeaders = new Headers();
  // From postman, probably this isn't needed
  myHeaders.append("Cookie", "BACKENDID=backend_1OPQ1_omega03|Yg7Jk|Yg7Jh");

  data.append("name", `${info.firstName} ${info.lastName}`);
  data.append("email", info.email);
  data.append("phoneNumber", info.phoneNumber ? info.phoneNumber.toString() : "");
  data.append("degree", info.degree);
  data.append("curricularYear", info.curricularYear.toString());
  data.append("country", info.country);
  data.append("socialLink", info.socialLink);
  data.append("message", info.motivation);
  data.append("recaptcha", recaptcha);
  data.append("activeTable", activeTable);
  data.append("departments", selectedDepartments);

  // console.log("Ative table", activeTable);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
  };

  // Send data to firebase database
  senUserToDb(info, checkedDepartments, activeTable)
    .then(async (ref) => {
      try {
        // Send email after firebase entry
        const res = await fetch(
          "https://tecnicosolarboat.tecnico.ulisboa.pt/api/submitApplication.php",
          requestOptions,
        );
        const resData = await res.json();
        console.log(resData);
        if (resData.success) {
          showSuccessMessage();
          setSubmissionSuccess(true);
        }
      } catch (error) {
        // remove entry from firebase, if email was not successfully sent
        showErrorMessage("An internal error has occurred, please reach out to us.");
        remove(ref);
        setIsSubmitting(false);
      }
    })
    .catch((error) => {
      console.log(error);
      showErrorMessage("An error has occurred with your application, please reach out to us.");
      setIsSubmitting(false);
    });
};

const onRecruitmentFormSubmit = (
  info: RecruitmentFormInfo,
  checkedDepartments: RecruitmentDepartmentsForm,
  recaptcha: string | null,
  activeTable: string | undefined,
  setFormErrors: Dispatch<SetStateAction<string[]>>,
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  setSubmissionSuccess: Dispatch<SetStateAction<boolean>>,
) => {
  const infoErrors = validateInfo(info);
  const departmentsErrors = validateDepartments(checkedDepartments);
  const recaptchaError = validateRecaptcha(recaptcha);
  const tableError = validateTable(activeTable);

  const errors = [...infoErrors, ...departmentsErrors, ...recaptchaError, ...tableError];
  setFormErrors(errors);
  if (errors.length > 0) showValidationError(errors);
  else {
    sendSubmissionToServer(
      info,
      checkedDepartments,
      recaptcha!,
      activeTable!,
      setIsSubmitting,
      setSubmissionSuccess,
    );
  }
};

export { onRecruitmentFormSubmit };
