import type { SpotAction, SpotCreate, SpotFormState } from "src/types/SpotTypes";

export function spotReducer(state: SpotFormState, action: SpotAction): SpotFormState {
  switch (action.type) {
    
    case "SET_FIELD":
      // SpotCreate 키만 허용 (locationText는 별도 액션)
      return { ...state, [action.field]: action.value } as SpotFormState;
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_COORDS":
      return { ...state, latitude: action.latitude, longitude: action.longitude };
    case "SET_LOCATION_TEXT":
      return { ...state, locationText: action.value };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_, i) => i !== action.index),
      };

    case "RESET":
      return initialSpotForm;

    default:
      return state;
  }
}

export const initialSpot: SpotCreate = {
  name: "",
  description: "",
  latitude: 0,
  longitude: 0,
  themeId: 0,
  images: [],
};

export const initialSpotForm: SpotFormState = {
  ...initialSpot,
  locationText: "",
};