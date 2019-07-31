import React from 'react';
import {Dialog} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';

function OwnInDialog(props)
{
    const dispatch = useDispatch();
    const state = useSelector(({ownin}) => ownin.dialog.state);
    const options = useSelector(({ownin}) => ownin.dialog.options);

    return (
        <Dialog
            open={state}
            onClose={ev => dispatch(Actions.closeDialog())}
            aria-labelledby="ownin-dialog-title"
            {...options}
        />
    );
}

export default OwnInDialog;
