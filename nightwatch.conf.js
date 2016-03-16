var os = require('os');

module.exports = (function (settings) {
    switch (os.platform()) {
        case 'win32':
            settings.selenium.cli_args['webdriver.chrome.driver'] = 'bin/webdrivers/win/chromedriver.exe';
            break;
        case 'darwin':
            settings.selenium.cli_args['webdriver.chrome.driver'] = 'bin/webdrivers/mac/chromedriver';
            break;
        default:
            settings.selenium.cli_args['webdriver.chrome.driver'] = 'bin/webdrivers/linux/chromedriver';
    }
    return settings;
})(require('./nightwatch.json'));
