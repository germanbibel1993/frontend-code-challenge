import React from "react";

function TenantRow(props) {
  const { id, name, paymentStatus, leaseEndDate } = props.tenant;
  return (
    <tr key={id} data-testid="tenant-row">
      <th>{id}</th>
      <td>{name}</td>
      <td>{paymentStatus}</td>
      <td>{leaseEndDate}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => props.handleDeleteTenant(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default React.memo(TenantRow);
