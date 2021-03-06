import { createMuiTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions/ownin/index';
import OwnInLayoutConfigs from 'app/ownin-layout/layout/LayoutConfig';
import OwnInSettingsConfig from 'app/ownin-configs/settingsConfig';
import OwnInThemesConfig from 'app/ownin-configs/themesConfig';
import _ from '@lodash';
import {
    defaultSettings,
    getParsedQuerySettings,
    defaultThemes,
    defaultThemeOptions,
    mustHaveThemeOptions,
    extendThemeWithMixins,
    mainThemeVariations
} from '@ownin/OwnInDefaultSettings';

const initialSettings = getInitialSettings();
const initialThemes = getInitialThemes();

const initialState = {
    initial: initialSettings,
    defaults: _.merge({}, initialSettings),
    current: _.merge({}, initialSettings),
    themes: initialThemes,
    ...getThemeOptions(initialThemes, initialSettings)
};

const settings = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_SETTINGS:
            {
                const newSettings = _.merge({}, state.current, action.value && action.value.layout && action.value.layout.style ? { layout: { config: OwnInLayoutConfigs.defaults } } : {}, action.value)
                const themes = newSettings.theme.main !== state.current.theme.main ? { ...state.themes, ...updateMainThemeVariations(newSettings.theme.main) } : state.themes;
                return {
                    ...state,
                    current: newSettings,
                    themes,
                    ...getThemeOptions(themes, newSettings)
                };
            }
        case Actions.SET_INITIAL_SETTINGS:
            {
                return _.merge({}, initialState);
            }
        case Actions.SET_DEFAULT_SETTINGS:
            {
                const newSettings = _.merge({}, state.defaults, action.value && action.value.layout && action.value.layout.style ? { layout: { config: OwnInLayoutConfigs.defaults } } : {}, action.value);
                const themes = newSettings.theme.main !== state.defaults.theme.main ? { ...state.themes, ...updateMainThemeVariations(newSettings.theme.main) } : state.themes;
                return {
                    ...state,
                    defaults: _.merge({}, newSettings),
                    current: _.merge({}, newSettings),
                    themes,
                    ...getThemeOptions(themes, newSettings)
                };
            }
        case Actions.RESET_DEFAULT_SETTINGS:
            {
                const themes = { ...state.themes, ...updateMainThemeVariations(state.defaults.theme.main) };
                return {
                    ...state,
                    defaults: _.merge({}, state.defaults),
                    current: _.merge({}, state.defaults),
                    themes,
                    ...getThemeOptions(themes, state.defaults)
                };
            }
        default:
            {
                return state;
            }
    }
};

export default settings;

/**
 * SETTINGS
 */
function getInitialSettings() {
    const defaultLayoutStyle = (OwnInSettingsConfig.layout && OwnInSettingsConfig.layout.style) ? OwnInSettingsConfig.layout.style : "layout";
    const layout = {
        style: defaultLayoutStyle,
        config: OwnInLayoutConfigs.defaults
    };
    return _.merge({}, defaultSettings, { layout }, OwnInSettingsConfig, getParsedQuerySettings());
}

/**
 * THEMES
 */
function getInitialThemes() {
    const themesObj = Object.keys(OwnInThemesConfig).length !== 0 ? OwnInThemesConfig : defaultThemes;

    const themes = Object.assign({}, ...Object.entries(themesObj).map(([key, value]) => {
        const muiTheme = _.merge({}, defaultThemeOptions, value, mustHaveThemeOptions);
        return {
            [key]: createMuiTheme(_.merge({}, muiTheme, { mixins: extendThemeWithMixins(muiTheme) }))
        }
    }
    ));

    return {
        ...themes,
        ...mainThemeVariations(themesObj[initialSettings.theme.main])
    }
}

function updateMainThemeVariations(mainTheme) {
    const themesObj = Object.keys(OwnInThemesConfig).length !== 0 ? OwnInThemesConfig : defaultThemes;
    return mainThemeVariations(themesObj[mainTheme])
}

function getThemeOptions(themes, settings) {
    return {
        mainTheme: themes[settings.theme.main],
        navbarTheme: themes[settings.theme.navbar],
        toolbarTheme: themes[settings.theme.toolbar],
        footerTheme: themes[settings.theme.footer],
        ...updateMainThemeVariations(settings.theme.main)
    }
}
