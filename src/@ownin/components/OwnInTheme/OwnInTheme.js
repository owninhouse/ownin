import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {useSelector} from 'react-redux';

function OwnInTheme(props)
{
    const mainTheme = useSelector(({ownin}) => ownin.settings.mainTheme);

    // console.warn('OwnInTheme:: rendered',mainTheme);
    return (
        <ThemeProvider theme={mainTheme}>
            {props.children}
        </ThemeProvider>
    )
}

export default React.memo(OwnInTheme);
