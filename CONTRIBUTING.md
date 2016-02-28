Development
-----------

### Clone sourcecode:

```bash
git clone https://github.com/fvdm/nodejs-fibonacci
cd nodejs-fibonacci
```

### Branches

The `master` branch is always exactly the same as the package release on [npm](https://www.npmjs.com/package/fibonacci).

While the `develop` branch is where development happens towards the next release.

When you intent to submit a PR always base your work on the `develop` branch and then work from a new branch.


```bash
git checkout develop
git checkout -b mycode
npm install
```


### Pull Requests

When you intent to submit a PR, please follow these instructions:


#### Code

* Stick to the code style.
* Run `npm test` to make sure it all works.
* JSdoc the functions.


```js
/**
 * Hello world - JSdoc example
 *
 * @callback callback
 * @param message {string} - Some awesome message
 * @param [amount] {number=2} - Optional argument with default
 * @param callback {function} - Callback function
 * @returns void
 */

function hello (message, amount, callback) {
  callback ('Hello ' + amount + ' worlds, ' + message);
}
```


#### Commits

* Try to describe the change in less than 50 characters.
* Commit more often with small edits instead of one commit with mixed bugfixes or new features.
* Tag any related Github issue IDs in the commit message, i.e. `Added coolFeature() #123`
* Commits not in main code _index.js_ should be prefixed with:
  * `Package:` for _package.json_ edits
  * `Readme:` for _README.md_ or _CONTRIBUTING.md_ edits
  * `Test:` for testing related edits like _test.js_ or _.eslintrc_ or _.travis.yml_
* Submit a new PR for each patch and new feature.
* Do not include the `node_modules` directory or any log files.
* English only.
