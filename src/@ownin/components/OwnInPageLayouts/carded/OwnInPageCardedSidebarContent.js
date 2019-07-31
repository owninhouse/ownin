import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {OwnInScrollbars} from '@ownin';
import clsx from 'clsx';
import {useSelector} from 'react-redux';

function OwnInPageCardedSidebarContent(props)
{
    const mainThemeDark = useSelector(({ownin}) => ownin.settings.mainThemeDark);

    const classes = props.classes;

    return (
        <React.Fragment>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div className={clsx(classes.sidebarHeader, props.variant)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <OwnInScrollbars className={classes.sidebarContent} enable={props.innerScroll}>
                    {props.content}
                </OwnInScrollbars>
            )}
        </React.Fragment>
    )
}

export default OwnInPageCardedSidebarContent;
