import React from 'react';
import {Divider, List} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import OwnInNavVerticalGroup from './vertical/OwnInNavVerticalGroup';
import OwnInNavVerticalCollapse from './vertical/OwnInNavVerticalCollapse';
import OwnInNavVerticalItem from './vertical/OwnInNavVerticalItem';
import OwnInNavVerticalLink from './vertical/OwnInNavVerticalLink';
import OwnInNavHorizontalGroup from './horizontal/OwnInNavHorizontalGroup';
import OwnInNavHorizontalCollapse from './horizontal/OwnInNavHorizontalCollapse';
import OwnInNavHorizontalItem from './horizontal/OwnInNavHorizontalItem';
import OwnInNavHorizontalLink from './horizontal/OwnInNavHorizontalLink';

function OwnInNavigation(props)
{
    const {navigation, layout, active, dense, className} = props;

    const verticalNav = (
        <List className={clsx("navigation whitespace-no-wrap", className)}>
            {
                navigation.map((item) => (

                    <React.Fragment key={item.id}>

                        {item.type === 'group' && (
                            <OwnInNavVerticalGroup item={item} nestedLevel={0} active={active} dense={dense}/>
                        )}

                        {item.type === 'collapse' && (
                            <OwnInNavVerticalCollapse item={item} nestedLevel={0} active={active} dense={dense}/>
                        )}

                        {item.type === 'item' && (
                            <OwnInNavVerticalItem item={item} nestedLevel={0} active={active} dense={dense}/>
                        )}

                        {item.type === 'link' && (
                            <OwnInNavVerticalLink item={item} nestedLevel={0} active={active} dense={dense}/>
                        )}

                        {item.type === 'divider' && (
                            <Divider className="my-16"/>
                        )}
                    </React.Fragment>
                ))
            }
        </List>
    );

    const horizontalNav = (
        <List className={clsx("navigation whitespace-no-wrap flex p-0", className)}>
            {
                navigation.map((item) => (

                    <React.Fragment key={item.id}>

                        {item.type === 'group' && (
                            <OwnInNavHorizontalGroup item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'collapse' && (
                            <OwnInNavHorizontalCollapse item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'item' && (
                            <OwnInNavHorizontalItem item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'link' && (
                            <OwnInNavHorizontalLink item={item} nestedLevel={0} dense={dense}/>
                        )}

                        {item.type === 'divider' && (
                            <Divider className="my-16"/>
                        )}
                    </React.Fragment>
                ))
            }
        </List>
    );

    if ( navigation.length > 0 )
    {
        switch ( layout )
        {
            case 'horizontal':
            {
                return horizontalNav;
            }
            case 'vertical':
            default:
            {
                return verticalNav;
            }
        }
    }
    else
    {
        return null;
    }
}

OwnInNavigation.propTypes = {
    navigation: PropTypes.array.isRequired
};

OwnInNavigation.defaultProps = {
    layout: "vertical"
};

export default React.memo(OwnInNavigation);
