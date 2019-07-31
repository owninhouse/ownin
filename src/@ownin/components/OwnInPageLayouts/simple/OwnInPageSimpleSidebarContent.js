import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {OwnInScrollbars} from '@ownin';
import clsx from 'clsx';
import {useSelector} from 'react-redux';

function OwnInPageSimpleSidebarContent(props)
{
    const mainThemeDark = useSelector(({ownin}) => ownin.settings.mainThemeDark);

    const classes = props.classes;

    return (
        <OwnInScrollbars enable={props.innerScroll}>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div className={clsx(classes.sidebarHeader, props.variant, props.sidebarInner && classes.sidebarHeaderInnerSidebar)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <div className={classes.sidebarContent}>
                    {props.content}
                </div>
            )}
        </OwnInScrollbars>
    );
}

export default OwnInPageSimpleSidebarContent;
