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

// helper to remove sensitive fields before saving to store during intermediate navigation
const stripSensitive = (values = {}, preserveSensitive = false) => {
  if (!values || typeof values !== 'object') return values || {};
  if (preserveSensitive) return { ...values };
  const copy = { ...values };
  delete copy.password;
  delete copy.confirmPassword;
  delete copy.agreeToTerms; // we don't persist T&C during intermediate saves
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
    // optional: return current savedAccount
    getSaved: () => savedAccount,
  }), [debounced, savedAccount, onFormChange, dispatch]);

  const handleValidationChange = (isValidFromForm, valuesFromForm = null) => {
    // If values were passed (preferred), use them
    if (valuesFromForm) {
      const pass = valuesFromForm.password;
      const confirm = valuesFromForm.confirmPassword;
      const bothFilled = !!(pass && pass.length > 0 && confirm && confirm.length > 0);
      const match = pass === confirm;
      const finalValid = Boolean(isValidFromForm) && bothFilled && match;

      setLocalFormValid((prev) => {
        if (prev === finalValid) return prev;
        setFormValid(finalValid);
        return finalValid;
      });
      return;
    }

    // Fallback: give one micro tick for lastValuesRef to be updated by onChange (if it runs just before)
    setTimeout(() => {
      const vals = lastValuesRef.current || {};
      const pass = vals.password;
      const confirm = vals.confirmPassword;
      const bothFilled = !!(pass && pass.length > 0 && confirm && confirm.length > 0);
      const match = pass === confirm;
      const finalValid = Boolean(isValidFromForm) && bothFilled && match;

      setLocalFormValid((prev) => {
        if (prev === finalValid) return prev;
        setFormValid(finalValid);
        return finalValid;
      });
    }, 0);
  };

  const handleCheckedChange = (checkedVal) => {
    setLocalAgree((prev) => {
      if (prev === checkedVal) return prev;
      // notify parent
      setAgreeToTerms(checkedVal);
      // optionally persist this change to parent/store
      if (onFormChange) onFormChange({ ...lastValuesRef.current, agreeToTerms: checkedVal });
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

