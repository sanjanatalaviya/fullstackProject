import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button.styled';

function Button({ children, btnType = "primary", btnDisabled = false, ...rest }) {
    console.log(btnType);

    const chechbtnType = () => {
        switch (btnType) {
            case 'primary':
                return PrimaryButton;
            case 'secondary':
                return SecondaryButton;
            default:
                return PrimaryButton;
        }
    }

    const CustomeButton = chechbtnType();

    return (
        <>
            <CustomeButton disabled={btnDisabled} {...rest}>
                {children}
            </CustomeButton>
            {/* {btnType === 'primary' && <PrimaryButton>{children}</PrimaryButton>}
            {btnType === 'secondary' && <SecondaryButton>{children}</SecondaryButton>} */}
        </>
    );
}

export default Button;