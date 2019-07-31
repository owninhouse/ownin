import React from 'react';
import PropTypes from 'prop-types';
import {OwnInLoading} from '@ownin';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */function OwnInSuspense(props)
{
    return (
        <React.Suspense fallback={<OwnInLoading {...props.loadingProps} />}>
            {props.children}
        </React.Suspense>
    );
}

OwnInSuspense.propTypes = {
    loadingProps: PropTypes.object,
};

OwnInSuspense.defaultProps = {
    loadingProps: {
        delay: 300
    }
};

export default OwnInSuspense;
