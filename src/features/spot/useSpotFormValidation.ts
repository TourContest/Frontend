import { useCallback, useState } from 'react';
import { getSpotErrors, type SpotFieldErrors } from 'src/utils/validation/spotValidation';
import type { SpotCreate } from 'src/types/SpotTypes';

export function useSpotValidation(spot: SpotCreate, dispatch: React.Dispatch<any>) {
  const [errors, setErrors] = useState<SpotFieldErrors>({});

  const validate = useCallback(() => {
    const e = getSpotErrors({
      locationText: spot.name,
      description:  spot.description ?? '',
    });
    setErrors(e);
    return e;
  }, [spot.name, spot.description]);

  const onChangeLocation = useCallback((text: string) => {
    dispatch({ type: 'SET_LOCATION_TEXT', value: text });
    if (errors.locationText && text.trim()) {
      setErrors(p => ({ ...p, locationText: undefined }));
    }
  }, [dispatch, errors.locationText]);

  const onChangeDescription = useCallback((v: string) => {
    dispatch({ type: 'SET_FIELD', field: 'description', value: v });
    if (errors.description && v.trim()) {
      setErrors(p => ({ ...p, description: undefined }));
    }
  }, [dispatch, errors.description]);

  return { errors, setErrors, validate, onChangeLocation, onChangeDescription };
}
