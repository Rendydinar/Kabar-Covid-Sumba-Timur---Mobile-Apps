import {useState} from 'react';

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (type: string, newValues: any) => {
      if (type === 'RESET_FORM') {
        return setValues(initialValue);
      }
      return setValues({
        ...values,
        [type]: newValues,
      });
    },
  ];
};
