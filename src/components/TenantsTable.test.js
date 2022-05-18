import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TenantsTable from "./TenantsTable";
import { mockedTenantsAllList } from "../mockedTenantsList";
import { Service, last30DaysList } from "../Service";

jest.mock("../Service");

describe("Tenants Table Test", () => {
  test("renders all table columns", () => {
    const { queryByTestId } = render(<TenantsTable />);
    const idElement = queryByTestId("id");
    const nameElement = queryByTestId("name");
    const paymentElement = queryByTestId("payment-status");
    const dateElement = queryByTestId("lease-end-date");
    const actionElement = queryByTestId("actions");
    expect(idElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(paymentElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(actionElement).toBeInTheDocument();
  });

  test("check table first render", async () => {
    Service.getTenants.mockResolvedValue(mockedTenantsAllList);

    render(<TenantsTable />);
    expect(jest.isMockFunction(Service.getTenants)).toBe(true);
    const tenantRows = await screen.findAllByTestId("tenant-row");
    expect(tenantRows).toHaveLength(5);
  });

  test("check table late filter render", async () => {
    Service.getTenants.mockImplementation((filter) => {
      let res = mockedTenantsAllList;
      if (filter === "late")
        res = res.filter((tenant) => tenant.paymentStatus === "LATE");
      return res;
    });
    render(<TenantsTable />);
    const lateFilterButton = screen.getByTestId("late-payment-tenants-filter");
    expect(lateFilterButton).toBeInTheDocument();
    fireEvent.click(lateFilterButton);
    expect(Service.getTenants).toHaveBeenCalledWith("late");
    expect(await screen.findAllByTestId("tenant-row")).toHaveLength(3);
  });
});
