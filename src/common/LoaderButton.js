import React from "react";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default ({
                    isLoading,
                    text,
                    loadingText,
                    className = "",
                    disabled = false,
                    ...props
                }) =>
    <Button
        className={`LoaderButton ${className}`}
        disabled={disabled || isLoading}
        {...props}
    >
        {isLoading && <FontAwesomeIcon icon="spinner" pulse/>} {!isLoading ? text : loadingText}
    </Button>;