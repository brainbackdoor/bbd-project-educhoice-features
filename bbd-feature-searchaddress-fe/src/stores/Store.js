import { getEnv, types } from "mobx-state-tree";

import QueryStore from "./QueryStore";

const Store = types
  .model("Store", {
    queryStore: types.optional(QueryStore, {})
  })
  .views(self => ({
    get ecFetch() {
      return getEnv(self).ecFetch;
    }
  }))
  .actions(self => ({
    /* eslint-disable no-param-reassign */
    setQueryStore(obj) {


      self.queryStore = {
        ...obj
      };
    }
  }));

export default Store;
