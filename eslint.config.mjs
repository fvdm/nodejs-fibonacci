import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node,
            arguments: "writable",
        },

        ecmaVersion: 2021,
        sourceType: "module",
    },

    rules: {
        "array-bracket-spacing": ["error", "never"],

        "brace-style": ["error", "stroustrup", {
            allowSingleLine: true,
        }],

        camelcase: ["error", {
            properties: "never",
        }],

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "comma-style": ["error", "last"],
        "comma-dangle": ["error", "always-multiline"],
        complexity: ["warn", 8],
        "computed-property-spacing": ["error", "never"],
        "consistent-return": "warn",
        curly: ["error", "all"],
        "default-case": "error",

        "dot-notation": ["warn", {
            allowKeywords: true,
        }],

        "dot-location": ["error", "property"],
        "eol-last": "error",
        eqeqeq: "error",
        "func-style": "off",
        "guard-for-in": "off",
        "handle-callback-err": ["error", "^(e|er|err|error)[0-9]{1,2}?$"],

        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "keyword-spacing": "error",

        "key-spacing": ["error", {
            beforeColon: false,
            afterColon: true,
        }],

        "lines-around-comment": ["error", {
            beforeBlockComment: true,
            afterBlockComment: true,
            beforeLineComment: true,
            afterLineComment: false,
            allowBlockStart: true,
            allowBlockEnd: false,
        }],

        "linebreak-style": ["error", "unix"],
        "max-nested-callbacks": ["warn", 3],
        "new-cap": "off",
        "newline-after-var": ["error", "always"],
        "no-alert": "error",
        "no-caller": "error",
        "no-catch-shadow": "error",
        "no-delete-var": "error",
        "no-div-regex": "error",
        "no-duplicate-case": "error",
        "no-else-return": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "error",
        "no-func-assign": "error",
        "no-implied-eval": "error",
        "no-inline-comments": "error",
        "no-invalid-regexp": "error",
        "no-label-var": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-mixed-requires": "off",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-spaces": "error",
        "no-multi-str": "error",

        "no-multiple-empty-lines": ["error", {
            max: 2,
        }],

        "no-native-reassign": "error",
        "no-nested-ternary": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-octal": "error",
        "no-path-concat": "error",
        "no-param-reassign": "off",
        "no-process-env": "off",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-reserved-keys": "off",
        "no-return-assign": ["error", "always"],
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-spaced-func": "error",
        "no-sparse-arrays": "warn",
        "no-sync": "warn",
        "no-ternary": "off",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef": "error",
        "no-undef-init": "error",
        "no-undefined": "error",
        "no-underscore-dangle": "error",
        "no-unexpected-multiline": "error",
        "no-unneeded-ternary": "error",
        "no-unreachable": "error",
        "no-unused-vars": "warn",
        "no-use-before-define": "error",
        "no-useless-concat": "error",
        "no-warning-comments": "warn",
        "no-with": "error",
        "no-wrap-func": "off",

        "object-curly-spacing": ["error", "always", {
            objectsInObjects: false,
            arraysInObjects: false,
        }],

        "one-var": ["error", "never"],
        "operator-assignment": ["error", "always"],
        "operator-linebreak": ["error", "before"],
        "padded-blocks": "off",
        "quote-props": ["error", "consistent"],
        quotes: ["error", "single", "avoid-escape"],
        radix: "error",
        semi: "error",

        "semi-spacing": ["error", {
            before: false,
            after: true,
        }],

        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": ["error", "always"],
        "space-in-parens": ["error", "always"],
        "space-infix-ops": "error",

        "space-unary-ops": ["error", {
            words: true,
            nonwords: false,

            overrides: {
                "!": true,
            },
        }],

        "spaced-comment": ["error", "always"],
        "use-isnan": "error",
        "valid-typeof": "error",
        "vars-on-top": "error",
        "wrap-regex": "off",
        yoda: ["error", "never"],
    },
}]);
