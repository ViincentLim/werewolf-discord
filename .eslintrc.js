module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // "google",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
    },
    ignorePatterns: [
        "/lib/**/*", // Ignore built files.
        "**/scripts/**", // Ignore built files.
    ],
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "quotes": "off",
        "indent": "off",
        "max-len": "off",
        "require-jsdoc": "off",
        "valid-jsdoc": "warn",
        "new-cap": "warn",
        "arrow-parens": "off",
        "linebreak-style": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": 0,
    },
};
