import styled from "styled-components";

const BaseButton = styled.button`
    transition: 0.5s;
    border-color: #ffb524 !important;
    cursor: pointer;
    font-weight: 600;
    border-radius: 50rem !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
    margin-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    -moz-user-select: none;
    user-select: none;
    font-size: 1rem;
`;

export const PrimaryButton = styled(BaseButton)`
    border-color:1px solid #ffb524 !important;
    color:rgb(129, 196, 8) !important;
    background-color: ${props => props.disabled ? "gray" : " rgba(0,0,0,0)"};
    padding-right: 1rem !important;
    text-transform: uppercase !important;
    &:hover {
        background: ${props => props.disabled ? "gray" : "var(--bs-secondary) "} !important;
        color: var(--bs-white) !important;
    }
`;

export const SecondaryButton = styled(BaseButton)`
    background-color: ${props => props.disabled ? "gray" : "rgb(129, 196, 8)"}  !important;
    color: #ffffff !important;
    border-color:1px solid rgb(255, 181, 36) !important;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
        background:${props => props.disabled ? "gray" : " rgb(255, 181, 36)"} !important;
        color: #ffffff !important;
    }
`;
