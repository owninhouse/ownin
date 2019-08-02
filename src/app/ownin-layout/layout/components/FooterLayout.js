import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import Footer from 'app/ownin-layout/shared-components/footer/Footer'

function FooterLayout(props) {
    const footerTheme = useSelector(({ ownin }) => ownin.settings.footerTheme);

    return (
        <ThemeProvider theme={footerTheme}>
            <Footer container />
        </ThemeProvider >
    );
}

export default FooterLayout;
