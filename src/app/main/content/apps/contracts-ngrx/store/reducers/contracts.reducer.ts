import * as ContractsActions from '../actions/contracts.actions';
import { Contract } from '../../contracts.model';

export interface ContractsState {
  entities: { [contractNumber: string]: Contract };
  loaded: boolean;
  loading: boolean;
  formActionComplete: boolean;
}

export const ContractsInitialState: ContractsState = {
  entities: {},
  loaded: false,
  loading: false,
  formActionComplete: false
};

export function ContractsReducer(
  state = ContractsInitialState,
  action: ContractsActions.ContractsActionsAll
): ContractsState {
  switch (action.type) {
    case ContractsActions.GET_CONTRACTS: {
      return {
        ...state,
        loading: true
      };
    }

    case ContractsActions.GET_CONTRACTS_SUCCESS: {
      const contracts = action.payload;
      const entities = contracts.reduce(
        (
          entities: { [contractNumber: string]: Contract },
          contract: Contract
        ) => {
          return {
            ...entities,
            [contract.contractNumber]: contract
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case ContractsActions.GET_CONTRACTS_FAILED: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case ContractsActions.EDIT_CONTRACT: {
      return {
        ...state,
        formActionComplete: false
      };
    }

    case ContractsActions.EDIT_CONTRACT_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.contractNumber]: action.payload
        },
        formActionComplete: true
      };
    }

    case ContractsActions.DELETE_CONTRACT_SUCCESS: {
      const {
        [action.payload.contractNumber]: old,
        ...newEntities
      } = state.entities;
      return {
        ...state,
        entities: {
          ...newEntities
        },
        formActionComplete: true
      };
    }

    default:
      return state;
  }
}

export const getContractsEntities = (state: ContractsState) => state.entities;
export const getContractsLoading = (state: ContractsState) => state.loading;
export const getContractsLoaded = (state: ContractsState) => state.loaded;
export const getFormActionComplete = (state: ContractsState) =>
  state.formActionComplete;
