import * as shell from 'shelljs';
import * as path from 'path';

const nodeModulesDir = path.resolve(__dirname, '../../node_modules/');

// Pages Theme Plugin
const pagesThemeDir = path.resolve(nodeModulesDir, 'typedoc-plugin-pages/dist/theme/v2');
// Default Theme
const defaultTheme = path.resolve(nodeModulesDir, 'typedoc-default-themes/bin/default');

// Fix Theme
shell.cp(path.resolve(defaultTheme, './partials/*'), path.resolve(pagesThemeDir, './partials/'));
shell.cp('-R', path.resolve(defaultTheme, './assets/*'), path.resolve(pagesThemeDir, './assets/'));

// Google Analytics
shell.cp(path.resolve(__dirname, './analytics.hbs'), path.resolve(pagesThemeDir, './partials/'));
shell.cp(path.resolve(__dirname, './default.hbs'), path.resolve(pagesThemeDir, './layouts/'));