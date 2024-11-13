import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import Cookies from 'universal-cookie';
import { Icon } from '@openedx/paragon';
import { WbSunny, Nightlight } from '@openedx/paragon/icons';
const themeCookie = 'indigo-toggle-dark';
const themeCookieExpiry = 90; // days

const ThemeToggleButton = () => {
  const cookies = new Cookies();
  const isThemeToggleEnabled = getConfig().INDIGO_ENABLE_DARK_TOGGLE;
  const getCookieExpiry = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + themeCookieExpiry);
  };
  const getCookieOptions = serverURL => ({
    domain: serverURL.hostname,
    path: '/',
    expires: getCookieExpiry()
  });
  const onToggleTheme = () => {
    const serverURL = new URL(getConfig().LMS_BASE_URL);
    let theme = '';
    if (cookies.get(themeCookie) === 'dark') {
      document.body.classList.remove('indigo-dark-theme');
      theme = 'light';
    } else {
      document.body.classList.add('indigo-dark-theme');
      theme = 'dark';
    }
    cookies.set(themeCookie, theme, getCookieOptions(serverURL));
    const learningMFEUnitIframe = document.getElementById('unit-iframe');
    if (learningMFEUnitIframe) {
      learningMFEUnitIframe.contentWindow.postMessage({
        'indigo-toggle-dark': theme
      }, serverURL.origin);
    }
  };
  if (!isThemeToggleEnabled) {
    return /*#__PURE__*/React.createElement("div", null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "theme-toggle-button"
  }, /*#__PURE__*/React.createElement("div", {
    className: "light-theme-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    src: WbSunny
  })), /*#__PURE__*/React.createElement("div", {
    className: "toggle-switch"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "theme-toggle-checkbox",
    className: "switch"
  }, /*#__PURE__*/React.createElement("input", {
    id: "theme-toggle-checkbox",
    defaultChecked: cookies.get(themeCookie) === 'dark',
    onChange: onToggleTheme,
    type: "checkbox"
  }), /*#__PURE__*/React.createElement("span", {
    className: "slider round"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dark-theme-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    src: Nightlight
  })));
};
export default ThemeToggleButton;
//# sourceMappingURL=ThemeToggleButton.js.map