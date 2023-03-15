class RpcActions {
  constructor() {
    this._actions = new Map();
  }

  add(name, handler) {
    this._actions.set(name, handler);
  }

  async handle(req, res) {
    const { action, meta } = req.server;
    let handler = this._actions.get(action);

    if (!handler) {
      console.warn(`Action "${action}" not found`);
      // console.log('action not found')
      handler = (meta, res) => {
        res.json({status: 'error'})
      }
      // throw new Error('not found');
      // return
    }

    await handler(meta, res);
  }
}

module.exports = RpcActions;
