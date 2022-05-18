import React, { useEffect, useState } from "react";
import { Service } from "../Service";
import TenantRow from "./TenantRow";
import AddTenants from "./AddTenants";

export default function TenantsTable() {
  const [tenantsList, setTenantsList] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [showAddTenants, setShowAddTenants] = useState(false);

  const handleAddNewTenant = async (tenant) => {
    const response = await Service.addTenant(tenant);

    if (response && response.id && tenantsList) {
      setTenantsList((prev) => [...prev, response]);
      setShowAddTenants(false);
    }
  };

  const getTenantsAllList = async () => {
    if (currentFilter === "all") return;
    setCurrentFilter("all");
    const response = await Service.getTenants();
    setTenantsList(response);
  };

  const getTenantsLateList = async () => {
    if (currentFilter === "late") return;
    setCurrentFilter("late");
    const response = await Service.getTenants("late");
    console.log(response);
    setTenantsList(response);
  };

  const getTenantsCurrent30DaysList = async () => {
    if (currentFilter === "30-days") return;
    setCurrentFilter("30-days");
    const response = await Service.getTenants("30days");
    setTenantsList(response);
  };

  const handleDeleteTenant = async (id) => {
    const response = await Service.deleteTenant(id);
    if (response === "OK") {
      setTenantsList((prev) => prev.filter((tenant) => tenant.id !== id));
    }
  };

  useEffect(() => {
    getTenantsAllList();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Tenants</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={
                currentFilter === "all" ? "nav-link active" : "nav-link"
              }
              onClick={getTenantsAllList}
              data-testid="all-tenants-filter"
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                currentFilter === "late" ? "nav-link active" : "nav-link"
              }
              onClick={getTenantsLateList}
              data-testid="late-payment-tenants-filter"
            >
              Payment is late
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                currentFilter === "30-days" ? "nav-link active" : "nav-link"
              }
              onClick={getTenantsCurrent30DaysList}
              data-testid="last-30-days-tenants-filter"
            >
              Lease ends in less than a month
            </a>
          </li>
        </ul>
        <table className="table">
          <thead>
            <tr>
              <th data-testid="id">#</th>
              <th data-testid="name">Name</th>
              <th data-testid="payment-status">Payment Status</th>
              <th data-testid="lease-end-date">Lease End Date</th>
              <th data-testid="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenantsList && (
              <>
                {tenantsList.map((tenant) => (
                  <TenantRow
                    tenant={tenant}
                    key={tenant.id}
                    handleDeleteTenant={handleDeleteTenant}
                  />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="container">
        <button
          className="btn btn-secondary"
          onClick={() => setShowAddTenants(true)}
        >
          Add Tenant
        </button>
        {showAddTenants && (
          <AddTenants
            handleAddNewTenant={handleAddNewTenant}
            closeAddTenants={() => setShowAddTenants(false)}
          />
        )}
      </div>
    </>
  );
}
