import { buildToast, ToastTypes } from './toasts';
/**
 * TYPES
 */

export const Types = {
  ADD_REQUEST: 'devs/ADD_REQUEST',
  ADD_SUCCESS: 'devs/ADD_SUCCESS',
  ADD_FAILURE: 'devs/ADD_FAILURE',
  REMOVE_REQUEST: 'devs/REMOVE_REQUEST',
  REMOVE_SUCCESS: 'devs/REMOVE_SUCCESS',
  REMOVE_FAILURE: 'devs/REMOVE_FAILURE',
  OPEN_ADD_MODAL: 'devs/OPEN_ADD_MODAL',
  CLOSE_ADD_MODAL: 'devs/CLOSE_ADD_MODAL',
};

/**
 * REDUCERS
 */
const INITIAL_STATE = {
  data: [],
  error: null,
  addModal: {
    isOpened: true,
  },
};

export default function devs(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        data: [
          ...state.data,
          {
            ...payload.data,
            login: payload.data.user,
            id: Math.random(),
            name: 'Loading...',
            avatar: 'https://via.placeholder.com/150?text=...',
          },
        ],
      };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map(dev => (dev.login === payload.data.login ? payload.data : dev)),
        error: null,
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        data: state.data.filter(dev => dev.name !== 'Loading...'),
        loading: false,
        error: payload.error,
      };

    case Types.REMOVE_REQUEST:
      return { ...state, loading: true };
    case Types.REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter(dev => dev.id !== action.payload.id),
        error: null,
      };
    case Types.REMOVE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case Types.OPEN_ADD_MODAL:
      return { ...state, addModal: { isOpened: true } };

    case Types.CLOSE_ADD_MODAL:
      return { ...state, addModal: { isOpened: false } };

    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  addDevRequest: data => ({
    type: Types.ADD_REQUEST,
    payload: { data },
  }),
  addDevSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
    toast: buildToast(`${data.name} Successfully added!`, ToastTypes.success),
  }),
  addDevFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
    toast: buildToast(error, ToastTypes.error),
  }),

  removeDevRequest: devId => ({
    type: Types.REMOVE_REQUEST,
    payload: { id: devId },
  }),
  removeDevSuccess: devId => ({
    type: Types.REMOVE_SUCCESS,
    payload: { id: devId },
  }),
  removeDevFailure: error => ({
    type: Types.REMOVE_FAILURE,
    payload: { error },
  }),

  openAddDevModal: () => ({
    type: Types.OPEN_ADD_MODAL,
  }),
  closeAddDevModal: () => ({
    type: Types.CLOSE_ADD_MODAL,
  }),
};
