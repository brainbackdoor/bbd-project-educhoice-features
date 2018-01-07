import { types, getEnv } from "mobx-state-tree";

const QueryStore = types
  .model("QueryStore", {
    address: types.optional(types.string, "")
  })
  .views(self => ({
    get ecFetch() {
      return getEnv(self).ecFetch;
    }
  }))
  .actions(self => ({
    /* eslint-disable no-param-reassign */

    sendQuery(url, method, object) {
      self.ecFetch(url, method, object);
    },

    setAddress(value) {
      self.address = value;
    }
  }));

export default QueryStore;
