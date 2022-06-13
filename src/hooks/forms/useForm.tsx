import React, { useState } from "react";
import { omit } from "lodash";
import { TeamType } from "../../types";

const useForm = (
  callback: any,
  teams: TeamType[],
  isUpdate?: boolean,
  selectedData?: TeamType
) => {
  //Form values
  const [values, setValues] = useState<any>({});
  //Errors
  const [errors, setErrors] = useState<any>({});

  React.useEffect(() => {
    if (isUpdate) setValues(selectedData);
  }, [selectedData, isUpdate]);

  //A method to handle form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    setErrors(omit(errors, name));

    setValues({
      ...values,
      [name]: val,
    });
  };

  const validate = (inputs: any) => {
    //validate for refer id
    //Email errors
    const errors: any = {};
    if (isUpdate) {
      if (inputs.name) {
        teams.filter(
          (team: TeamType) =>
            team.name === inputs.name && team.id !== selectedData?.id
        ).length > 0 && (errors.name = "Team name is already exist!");
      }
    } else {
      if (!inputs.name) {
        errors.name = "Team name is required!";
      } else {
        teams.filter((team: TeamType) => team.name === inputs.name).length >
          0 && (errors.name = "Team name is already exist!");
      }

      if (!inputs.playerCount) {
        errors.playerCount = "Player count is required!";
      }

      if (!inputs.region) {
        errors.region = "Region is required!";
      }

      if (!inputs.country) {
        errors.country = "Country is required!";
      }
    }

    return errors;
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    const validationErrors = validate(values);
    const noErrors = Object.keys(validationErrors).length === 0;
    if (noErrors) {
      setErrors({});
      callback();
    } else {
      setErrors(validationErrors);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
