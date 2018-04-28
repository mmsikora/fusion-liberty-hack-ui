// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',

    extends: [
      'airbnb',
      'plugin:css-modules/recommended',
    ],

    plugins: [
      'css-modules',
    ],

    globals: {
      __DEV__: true,
    },

    env: {
      browser: true,
    },

    rules: {
      // `js` and `jsx` are common extensions
      // `mjs` is for `universal-router` only, for now
      'import/extensions': [
        'error',
        'always',
        {
          js: 'never',
          jsx: 'never',
          mjs: 'never',
        },
      ],

      // Not supporting nested package.json yet
      // https://github.com/benmosher/eslint-plugin-import/issues/458
      'import/no-extraneous-dependencies': 'off',

      // Recommend not to leave any console.log in your code
      // Use console.error, console.warn and console.info instead
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],

      // Allow js files to use jsx syntax, too
      'react/jsx-filename-extension': 'off',

      // https://github.com/kriasoft/react-starter-kit/pull/961
      // You can reopen this if you still want this rule
      'react/prefer-stateless-function': 'off',

      "linebreak-style": 0,
      'jsx-a11y/href-no-hash': 'off',

      // MooreTrac specific settings mods
      'css-modules/no-unused-class': ['off'],
      'comma-dangle': ['off'],
      'padded-blocks': ['off'],
      'arrow-body-style': 'off',
      'no-case-declarations': 'off',
      'react/no-unused-prop-types': 'off',
      'react/forbid-prop-types': 'off'

    },
  };
