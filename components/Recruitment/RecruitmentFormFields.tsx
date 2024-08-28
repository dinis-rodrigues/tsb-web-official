import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { AiOutlineFieldNumber, AiOutlineMail } from "react-icons/ai";
import { BiMessage, BiWorld } from "react-icons/bi";
import { BsLink45Deg, BsPerson, BsPhone } from "react-icons/bs";
import { FaUniversity } from "react-icons/fa";
import { PatternFormat } from "react-number-format";

import cx from "classnames";
import ReCAPTCHA from "react-google-recaptcha";
import TextareaAutosize from "react-textarea-autosize";

import {
  handleCheckbox,
  handleInputMask,
  handleSelectInput,
  handleTextInput,
} from "../utils/generalFunctions";
import { onRecruitmentFormSubmit } from "../utils/recruitmentFormSubmission";

import Select from "react-select";
import {
  countryOptions,
  coursesOptions,
  curricularYearOptions,
  formatCoursesLabel,
  selectCustomStyle,
  selectStyles,
} from "../utils/constants";

import { fullpageApi } from "@fullpage/react-fullpage";
import { Departments, RecruitmentDepartmentsForm, RecruitmentFormInfo } from "../../interfaces";

type Props = {
  info: RecruitmentFormInfo;
  setInfo: Dispatch<SetStateAction<RecruitmentFormInfo>>;
  departments: Departments;
  activeTable?: string;
  setSubmissionSuccess: Dispatch<SetStateAction<boolean>>;
  fullPageApi: fullpageApi | undefined;
};

const RecruitmentFormFields = ({
  info,
  setInfo,
  departments,
  activeTable,
  setSubmissionSuccess,
  fullPageApi,
}: Props) => {
  const [checkedDepartments, setCheckedDepartments] = useState<RecruitmentDepartmentsForm>({});

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [recaptcha, setRecaptcha] = useState<string | null>(null);

  const [_document, set_document] = useState<Document>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    set_document(document);
  }, []);
  return (
    <div className="card-body">
      <div className="row">
        <h2 className="index-header">Send Your Application</h2>
        <hr />
        <div className="col-md-4">
          <div className="form-group">
            <label className="f-medium">First Name</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("firstName"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <BsPerson />
                </span>
              </div>
              <input
                value={info.firstName}
                onChange={(e) => handleTextInput(e, "firstName", setInfo)}
                autoComplete="new-password"
                aria-label="First Name..."
                placeholder="First Name..."
                type="text"
                className="form-control-r text-center"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="f-medium">Last Name</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("lastName"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <BsPerson />
                </span>
              </div>
              <input
                value={info.lastName}
                onChange={(e) => handleTextInput(e, "lastName", setInfo)}
                autoComplete="new-password"
                aria-label="Last Name..."
                placeholder="Last Name..."
                type="text"
                className="form-control-r text-center"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="f-medium">Phone Number</label>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("phoneNumber"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <BsPhone />
                </span>
              </div>
              <PatternFormat
                value={info.phoneNumber && info.phoneNumber}
                onValueChange={(e) => handleInputMask(e, "phoneNumber", setInfo)}
                className="form-control-r text-center"
                format={"### ### ###"}
                mask="_"
                allowEmptyFormatting
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row ml-2">
        {Object.keys(departments).length > 0 &&
          Object.entries(departments).map(([key, department]) => (
            <div className="col-6 d-flex" key={key}>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id={key}
                  checked={checkedDepartments[key]}
                  onChange={(e) => handleCheckbox(e, key, setCheckedDepartments)}
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor={key}>
                  <span>{department.description}</span>
                </label>
              </div>
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="f-medium">Email address</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("email"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <AiOutlineMail />
                </span>
              </div>
              <input
                value={info.email}
                onChange={(e) => handleTextInput(e, "email", setInfo)}
                autoComplete="new-password"
                placeholder="Email Here..."
                type="text"
                className="form-control-r text-center"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="f-medium">Confirm Email address</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("confirmEmail"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <AiOutlineMail />
                </span>
              </div>
              <input
                value={info.confirmEmail}
                onChange={(e) => handleTextInput(e, "confirmEmail", setInfo)}
                autoComplete="new-password"
                placeholder="Email Here..."
                type="text"
                className="form-control-r text-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label className="f-medium">Degree</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("degree"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaUniversity />
                </span>
              </div>
              <Select
                id="degree"
                instanceId="degree"
                onChange={(e) => handleSelectInput(e, "degree", setInfo)}
                value={{
                  value: info && info.degree,
                  label: info && info.degree,
                }}
                className={"text-black allow-scroll"}
                placeholder={"Select"}
                options={coursesOptions}
                isSearchable={true}
                formatGroupLabel={formatCoursesLabel}
                theme={(theme) => selectStyles(theme, false)}
                styles={selectCustomStyle}
                menuPortalTarget={_document ? _document.body : null}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="f-medium">Curricular Year</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("curricularYear"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <AiOutlineFieldNumber />
                </span>
              </div>
              <Select
                id="curricularYear"
                instanceId="curricularYear"
                onChange={(e) => handleSelectInput(e, "curricularYear", setInfo)}
                value={{
                  value: info && info.curricularYear,
                  label: info && info.curricularYear,
                }}
                className={"text-black allow-scroll"}
                placeholder={"Select"}
                options={curricularYearOptions}
                isSearchable={true}
                theme={(theme) => selectStyles(theme, false)}
                styles={selectCustomStyle}
                menuPortalTarget={_document ? _document.body : null}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="f-medium">Country</label>
            <span className="text-info"> *</span>
            <div
              className={cx("input-group-alternative input-group z-inf", {
                "has-error": formErrors.includes("country"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <BiWorld />
                </span>
              </div>
              <Select
                id="country"
                instanceId="country"
                onChange={(e) => handleSelectInput(e, "country", setInfo)}
                value={{
                  value: info && info.country,
                  label: info && info.country,
                }}
                className={"text-black allow-scroll"}
                placeholder={"Select"}
                options={countryOptions}
                isSearchable={true}
                onFocus={() => console.log("focus")}
                theme={(theme) => selectStyles(theme, false)}
                styles={selectCustomStyle}
                menuPortalTarget={_document ? _document.querySelector("body") : null}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label className="f-medium">Social Link</label>
            <div
              className={cx("input-group-alternative input-group", {
                "has-error": formErrors.includes("socialLink"),
              })}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <BsLink45Deg />
                </span>
              </div>
              <input
                value={info.socialLink}
                onChange={(e) => handleTextInput(e, "socialLink", setInfo)}
                autoComplete="new-password"
                placeholder="Facebook, Instagram or Linkedin"
                type="text"
                className="form-control-r text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="f-medium">Motivation</label>
        <div
          className={cx("input-group-alternative input-group", {
            "has-error": formErrors.includes("motivation"),
          })}
        >
          <div className="input-group-prepend">
            <span className="input-group-text">
              <BiMessage />
            </span>
          </div>
          <TextareaAutosize
            value={info.motivation}
            minRows={2}
            maxRows={10}
            onChange={(e) => {
              handleTextInput(e, "motivation", setInfo);
              fullPageApi?.reBuild();
            }}
            cacheMeasurements
            className="form-control-r-alternative form-control-r"
            placeholder="Why do you want to join our team? Which topics do you like most?"
          />
        </div>
      </div>
      <div className="justify-content-center row">
        <div className="col-md-6">
          <ReCAPTCHA
            sitekey="6LfFgfMUAAAAAPJbnorz-skApqpdUkaMjTBJXRUb"
            onChange={(value) => setRecaptcha(value)}
            theme={"dark"}
          />
        </div>
        <div
          className="col-md-6"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            className="btnd btnd-info"
            onClick={() =>
              !isSubmitting &&
              onRecruitmentFormSubmit(
                info,
                checkedDepartments,
                recaptcha,
                activeTable,
                setFormErrors,
                setIsSubmitting,
                setSubmissionSuccess,
              )
            }
          >
            {isSubmitting ? (
              <div role="status" className="spinner-border-sm spinner-border">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentFormFields;
