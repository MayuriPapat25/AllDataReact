import React from "react";
import DynamicForm from "../../../shared/ui/DynamicForm";
import { businessAddressFields } from "./businessAddressFields";
import { translations } from "../../../shared/translations";

const BusinessAddress = ({ onValidationChange }) => {

  return (
    <div className="max-w-2xl bg-card pb-8 border-b-2 border-gray-300">
      <div className="mb-6 flex justify-between text-center">
        <h2 className="mb-1 text-md font-semibold">{translations?.business_address}</h2>
        <p className="text-sm text-muted-foreground">| = `${translations?.fields_are_required}`</p>
      </div>

      <DynamicForm fields={businessAddressFields} onValidationChange={onValidationChange} />
    </div>
  );
};

export default BusinessAddress;