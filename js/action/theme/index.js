import Types from '../type';
// import {onLoadPopularData} from './popular';

export function onThemeChange(theme){
    return {type: Types.THEME_CHANGE, theme: theme}
}