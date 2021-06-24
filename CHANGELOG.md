# Version history for tarita (たりた)

This changelog covers the version history and possible upcoming changes.
It follows the guidance from https://keepachangelog.com/en/1.0.0/.

## Unreleased `v0.5.0` (2019-09-)
- Started testing with Windows at AppVeyor
- Minimum supported Node.js version lifted from `4.2.0` to `14.15.0`
- Now versions 16 (Travis/Linux and AppVeyor/Windows), and 14 (GitHub Actions) of Node.js are covered
- Use [`npm-shrinkwrap.json`](https://docs.npmjs.com/files/shrinkwrap.json) for locking the working set of 3rd party dependencies

## `v0.4.0` (2016-01-28)
- Do not break the existing structure outside `define` statement

## `v0.3.0` (2016-01-28)
- Also convert cases when there are no dependencies or there is only dependencies
- Preserve comments

## `v0.2.0` (2016-01-28)
- Unit testing and automation for it
- Using [`nyc`](https://www.npmjs.com/package/nyc) for code coverage
- Anything that was originally `return` should be the `export default`

## `v0.1.0` (2016-01-25)
- Initial conversion ability from a `define` to `import` and `export default`
