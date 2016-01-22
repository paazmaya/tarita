# tarita (たりた)

> Convert Require.js define to ES7 imports

Parsing to [AST](https://github.com/estree/estree) happens with
[`espree`](https://github.com/eslint/espree) and generating code back to JavaScript with
[`escodegen`](https://github.com/estools/escodegen).

The name of the project is for honouring the legacy of
[Mrs Sonobe Hideo (園部 秀雄)](https://ja.wikipedia.org/wiki/%E5%9C%92%E9%83%A8%E7%A7%80%E9%9B%84),
who was the 15th head master of
[Jikishinkageryu Naginatajutsu (直心影流薙刀術)](http://naginata.fi/en/koryu),
which is an ancient Japanese martial art, focusing the handling of a long pole like weapon
called naginata.
During her childhood she was called by the name Tarita, hence the name of this project.

## Getting started

```sh
npm install --global tarita
```


```sh
tarita input-file.js
```

## Version history

* `v0.1.0` (2016-01-22)
    - Initial conversion ability from a `define` to `import` and `export default`


## License

Copyright (c) [Juga Paazmaya](http://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).
