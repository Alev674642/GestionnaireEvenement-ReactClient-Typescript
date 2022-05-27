import { useField, useFormikContext } from "formik";

import  ReactDatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default function FormikDatePicker({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  return (
    <ReactDatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
}
