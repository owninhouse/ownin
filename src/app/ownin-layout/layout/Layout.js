import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { OwnInScrollbars, OwnInMessage, OwnInDialog, OwnInSuspense } from '@ownin';
import { renderRoutes } from 'react-router-config'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import AppContext from 'app/AppContext';
import LeftSideLayout from './components/LeftSideLayout';
import ToolbarLayout from './components/ToolbarLayout';
import NavbarWrapperLayout from './components/NavbarWrapperLayout';
import FooterLayout from './components/FooterLayout';
import RightSideLayout from './components/RightSideLayout';
// import SettingsPanel from 'app/ownin-layout/shared-components/SettingsPanel';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.container': {
            '& .container': {
                maxWidth: 1120,
                width: '100%',
                margin: '0 auto'
            },
            '& .navigation': {}
        }
    },
    content: {
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 4
    },
    toolbarWrapper: {
        display: 'flex',
        position: 'relative',
        zIndex: 5
    },
    toolbar: {
        display: 'flex',
        flex: '1 0 auto'
    },
    footerWrapper: {
        position: 'relative',
        zIndex: 5
    },
    footer: {
        display: 'flex',
        flex: '1 0 auto',
        '&.container': {
            '& .container': {
                maxWidth: 1120,
                width: '100%',
                margin: '0 auto'
            },
            '& .navigation': {}
        }
    }
}));

function layout(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const config = useSelector(({ ownin }) => ownin.settings.current.layout.config);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles(props);

    return (
        <AppContext.Consumer>
            {({ routes }) => (
                <div id="ownin-layout" className={clsx(classes.root, config.mode)}>

                    {config.leftSidePanel.display && (
                        <LeftSideLayout />
                    )}

                    <div className="flex flex-1 flex-col overflow-hidden relative">

                        {config.toolbar.display && config.toolbar.position === 'above' && (
                            <ToolbarLayout />
                        )}

                        {config.navbar.display && (
                            <NavbarWrapperLayout />
                        )}

                        {config.toolbar.display && config.toolbar.position === 'below' && (
                            <ToolbarLayout />
                        )}

                        <OwnInScrollbars className={classes.content}>

                            <OwnInDialog />

                            <div className="flex flex-auto flex-col relative">

                                <OwnInSuspense>
                                    {renderRoutes(routes)}
                                </OwnInSuspense>

                                {props.children}

                                {config.footer.display && config.footer.style === 'static' && (
                                    <FooterLayout />
                                )}

                            </div>

                        </OwnInScrollbars>

                        {config.footer.display && config.footer.style === 'fixed' && (
                            <FooterLayout />
                        )}

                        {/* <SettingsPanel/> */}

                    </div>

                    {config.rightSidePanel.display && (
                        <RightSideLayout />
                    )}

                    <OwnInMessage />
                </div>)}
        </AppContext.Consumer>
    );
}

export default layout;
