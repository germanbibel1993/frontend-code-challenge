import React, { useState } from "react";
import { validateFields } from "../utils";

function AddTenants(props) {
  const { handleAddNewTenant } = props;
  const [formFields, setFormFields] = useState({
    name: null,
    paymentStatus: "CURRENT",
    leaseEndDate: null,
  });
  const [error, setError] = useState(null);

  const handleOnSaveClick = (event) => {
    event.preventDefault();
    setError(false);
    const areFieldsValid = validateFields(formFields);
    console.log(areFieldsValid);
    if (!areFieldsValid)
      setError("Something went wrong, please check the fields and try again");
    handleAddNewTenant(formFields);
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            onChange={(event) =>
              setFormFields({
                ...formFields,
                name: event.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label>Payment Status</label>
          <select
            className="form-control"
            onChange={(event) =>
              setFormFields({
                ...formFields,
                paymentStatus: event.target.value,
              })
            }
          >
            <option value="CURRENT">CURRENT</option>
            <option value="LATE">LATE</option>
          </select>
        </div>
        <div className="form-group">
          <label>Lease End Date</label>
          <input
            className="form-control"
            onChange={(event) =>
              setFormFields({
                ...formFields,
                leaseEndDate: event.target.value,
              })
            }
            placeholder="yyyy-mm-dd"
          />
        </div>
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <button className="btn btn-primary" onClick={handleOnSaveClick}>
          Save
        </button>
        <button className="btn" onClick={() => props.closeAddTenants()}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddTenants;
