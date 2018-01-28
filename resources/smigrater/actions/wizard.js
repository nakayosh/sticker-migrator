import api from '../api';

export const CHANGE_WIZARD = 'CHANGE_WIZARD';

export const SUBMIT_WIZARD_REQUEST = 'SUBMIT_WIZARD_REQUEST';
export const SUBMIT_WIZARD_SUCCESS = 'SUBMIT_WIZARD_SUCCESS';
export const SUBMIT_WIZARD_FAIL    = 'SUBMIT_WIZARD_FAIL';

export function changeWizard (value) {
  return {
    type: CHANGE_WIZARD,
    value,
  };
}

export function submitWizard () {
  return (getState, dispatch) => {
    dispatch(submitWizardRequest());

    api(getState).get('');
  };
}

export function submitWizardRequest () {
  return {
    type: SUBMIT_WIZARD_REQUEST,
  };
}

export function submitWizardSuccess () {
  return {
    type: SUBMIT_WIZARD_SUCCESS,
  };
}

export function submitWizardFail () {
  return {
    type: SUBMIT_WIZARD_FAIL,
  };
}
