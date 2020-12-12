// write your custom hook here to control your checkout form
import React, {useState} from 'react';

export default function useForm(initialValue) {
    
    const [formValues, setFormValues] = useState(initialValue);

    const handleChanges = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
      };
   
    return [formValues, handleChanges];

}