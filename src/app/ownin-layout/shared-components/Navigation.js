import React from 'react';
import {OwnInNavigation} from '@ownin';
import clsx from 'clsx';
import {useSelector} from 'react-redux';

function Navigation(props)
{
    const navigation = useSelector(({ownin}) => ownin.navigation);

    return (
        <OwnInNavigation className={clsx("navigation", props.className)} navigation={navigation} layout={props.layout} dense={props.dense}/>
    );
}

Navigation.defaultProps = {
    layout: "vertical"
};

export default Navigation;
