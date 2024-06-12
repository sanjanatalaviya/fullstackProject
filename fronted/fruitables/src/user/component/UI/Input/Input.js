import React from 'react';
import { BaseInput, InputError } from './input.styled';

function Input({ errorText, ...rest }) {   // you must enter any name where using the (...rest) 
    return (
        <>
            <BaseInput
                {...rest}
            />
            <InputError>
                {errorText}
            </InputError>
        </>
    );
}

export default Input;