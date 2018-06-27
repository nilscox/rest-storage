# RestStorage

This tool allows you to start a very lightweight HTTP server, and act as an
online [web storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage),
that can be access through REST endpoints.

## Usage

```
Options:
  --help          Show help
  --version       Show version number
  --filename, -f  Store the data in this file (defaults to "storage.json")
  --memory, -m    Start the server in memory
  --port, -p      Set the server's listening port
  --verbose, -v   Be more verbose
```

The `--filename` and `--memory` options are mutually exclusive. If you run the
server with both options, a memory storage will be used.

When the server is started, it will allow access to the storage through HTTP
calls. When creating an item, only JSON payloads are handled for now.

- `GET    http://<hostname>:<port>/item`: retrieve an item's value
- `POST   http://<hostname>:<port>/item`: create or update an item
- `DELETE http://<hostname>:<port>/item`: remove an item from the storage

## License

[Beerware](./LICENSE)
