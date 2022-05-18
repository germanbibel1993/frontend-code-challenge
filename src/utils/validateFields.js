import { isInTheFuture } from "./isInTheFuture";

export const validateFields = (formFields) => {
  if (
    !formFields.name ||
    formFields.name.length >= 25 ||
    formFields.name.length < 0 ||
    !formFields.leaseEndDate ||
    !isInTheFuture(new Date(formFields.leaseEndDate))
  )
    return false;
  return true;
};
