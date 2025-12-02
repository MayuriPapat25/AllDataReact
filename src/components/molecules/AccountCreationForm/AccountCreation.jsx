import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from '../../../shared/ui/FormHeader'
import DynamicForm from '../../../shared/ui/DynamicForm'
import TermsConditions from '../../../shared/ui/TermsCondition'
import { accountCreationField } from './accountCreationField'
import { setAccountCreation } from "../../../store/store"; // adjust to your store export path
import { useState } from "react";

// Simple debounce helper (no extra lib)
const useDebouncedCallback = (fn, delay = 300) => {
  const timer = useRef(null);
  const lastArgs = useRef(null);

  // wrapped function that you will call
  const wrapped = useCallback(
    (...args) => {
      lastArgs.current = args;
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        fn(...args);
        timer.current = null;
      }, delay);
    },
    [fn, delay]
  );

  // expose helper to flush immediately
  const flushNow = () => {
    if (timer.current && lastArgs.current) {
      clearTimeout(timer.current);
      fn(...lastArgs.current);
      timer.current = null;
    }
  };

  // flush on unmount
  useEffect(
    () => () => {
      flushNow();
    },
    []
  );

  return { call: wrapped, flushNow, getLastArgs: () => lastArgs.current }
};

const stripSensitive = (values = {}) => {
  if (!values || typeof values !== 'object') return {};
  const copy = { ...values };

  delete copy.password;
  delete copy.confirmPassword;

  return copy;
}

const AccountCreation = forwardRef(({
  headerContent,
  setFormValid = () => { },
  setAgreeToTerms = () => { },
  checked = false,
  debounceMs = 300,
  initialData = {},
  onFormChange = null, },
  ref) => {

  const dispatch = useDispatch();

  // inside AccountCreation component (forwardRef)


  const storeAccount = useSelector((state) => state.form?.accountCreation) ?? {};
  const savedAccount = (initialData && Object.keys(initialData).length) ? initialData : storeAccount;

  // Build a formInitialData that intentionally omits sensitive fields so they're not persisted
  const safeInitial = { ...savedAccount };
  delete safeInitial.password;
  delete safeInitial.confirmPassword;
  delete safeInitial.agreeToTerms;
  const formInitialData = (safeInitial && typeof safeInitial === 'object') ? safeInitial : {}


  // determine whether we should show a checked T&C on mount.
  // only restore agreeToTerms if savedAccount explicitly marked that sensitive fields were persisted
  const sensitivePersisted = !!savedAccount?._sensitivePersisted;
  const derivedChecked = (typeof checked === 'boolean') ? checked : (sensitivePersisted ? !!savedAccount.agreeToTerms : false);

  const [localAgree, setLocalAgree] = useState(derivedChecked);
  const [localFormValid, setLocalFormValid] = useState(false);

  const debounced = useDebouncedCallback((values) => {
    if (!values) return;
    const toSave = stripSensitive(values, false);
    dispatch(setAccountCreation(toSave));
    if (onFormChange) onFormChange(toSave);
  }, debounceMs);

  const lastValuesRef = useRef({});

  const handleFormChange = (values) => {
    if (!values) return;
    lastValuesRef.current = values;
    debounced.call(values);
  };

  // expose imperative API to parent so it can flush last values synchronously
  useImperativeHandle(ref, () => ({
    saveNow: (final = false) => {
      // if parent passed explicit final=true, persist everything including password & agreeToTerms
      const last = debounced.getLastArgs?.();
      const raw = (last && last[0]) ? last[0] : lastValuesRef.current;
      if (final) {
        const toSave = stripSensitive(raw, true);
        // mark that sensitive fields were intentionally persisted so on next mount we can restore them
        const withFlag = { ...toSave, _sensitivePersisted: true };
        dispatch(setAccountCreation(withFlag));
        if (onFormChange) onFormChange(withFlag);
      } else {
        // normal flush: persist only safe fields (no password/confirm/agreeToTerms)
        const toSave = stripSensitive(raw, false);
        dispatch(setAccountCreation(toSave));
        if (onFormChange) onFormChange(toSave);
      }
      // also call debounced.flushNow to be safe
      debounced.flushNow();
    },
    getSaved: () => savedAccount,
    isStepValidNow: () => {
      const vals = lastValuesRef.current || {};
      const pass = (vals.password || "").trim();
      const confirm = (vals.confirmPassword || "").trim();

      const bothFilled = pass.length > 0 && confirm.length > 0;
      const match = pass === confirm;

      return bothFilled && match && Boolean(localAgree);
    }
  }), [debounced, savedAccount, onFormChange, dispatch]);

  const handleValidationChange = (isValidFromForm, valuesFromForm = null) => {
    // pick the freshest synchronous snapshot of values:
    // prefer valuesFromForm (Directly from DynamicForm), otherwise immediate lastValuesRef.current
    const vals = (valuesFromForm && typeof valuesFromForm === 'object')
      ? valuesFromForm
      : (lastValuesRef.current || {});

    // ensure we examine current strings (defensive)
    const pass = vals.password || "";
    const confirm = vals.confirmPassword || "";

    const bothFilled = pass.length > 0 && confirm.length > 0;
    const match = pass === confirm;

    const finalValid = Boolean(isValidFromForm) && bothFilled && match && Boolean(localAgree);

    setLocalFormValid((prev) => {
      if (prev === finalValid) return prev;
      setFormValid(finalValid);
      return finalValid;
    });
  };

  const handleCheckedChange = (checkedVal) => {
    setLocalAgree((prev) => {
      if (prev === checkedVal) return prev;
      // notify parent
      setAgreeToTerms(checkedVal);
      // optionally persist this change to parent/store
      if (onFormChange) onFormChange({ ...lastValuesRef.current, agreeToTerms: checkedVal });
      handleValidationChange(false, lastValuesRef.current || formInitialData);
      return checkedVal;
    });
  };

  // Update checked state from saved account data when component mounts or savedAccount changes
  useEffect(() => {
    setLocalAgree(derivedChecked);
    // also update parent only if different
    setAgreeToTerms(prev => (prev === derivedChecked ? prev : derivedChecked));
    // don't write to store here to avoid feedback loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [derivedChecked]);


  useEffect(() => {
    // Prefer lastValuesRef (user already typed), otherwise use formInitialData
    const initialVals = (lastValuesRef.current && Object.keys(lastValuesRef.current).length)
      ? lastValuesRef.current
      : formInitialData;

    // Run validation check once on mount to initialize parent state.
    // Using isValidFromForm = false here is fine because parent will be updated by
    // DynamicForm's onValidationChange when it reports true. This call guarantees
    // the parent remains disabled until all required pieces are present (including T&C).
    handleValidationChange(false, initialVals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Ensure parent remains disabled when persisted data does not include password/confirm
  useEffect(() => {
    // If there's no savedAccount at all, keep parent disabled — AccountCreation will update when user types.
    if (!savedAccount || Object.keys(savedAccount).length === 0) {
      setFormValid(false);
      return;
    }

    const hasPassword = Boolean(savedAccount.password && savedAccount.confirmPassword);

    if (!hasPassword) {
      // Persisted snapshot is missing password/confirm — keep Continue disabled until user fills them
      setFormValid(false);
      return;
    }

    // If password/confirm were persisted (rare, only if saveNow(true) was used),
    // run a validation pass so parent can be set to true if everything else is valid.
    // We pass isValidFromForm = true to let handleValidationChange evaluate pass/match and T&C.
    handleValidationChange(true, savedAccount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAccount]);

  return (
    <div>
      <FormHeader headerContent={headerContent} />
      <div>
        <DynamicForm
          fields={accountCreationField}
          onValidationChange={(isValid, values) => handleValidationChange(isValid, values)}
          initialData={formInitialData}
          onChange={handleFormChange}
        />
        <TermsConditions
          id="agreeToTerms"
          companyName="ALLDATA"
          checked={derivedChecked}
          onCheckedChange={handleCheckedChange}
        />
      </div>
    </div>
  )
});

AccountCreation.displayName = 'AccountCreation';

export default AccountCreation

