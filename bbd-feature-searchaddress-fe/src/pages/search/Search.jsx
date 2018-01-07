import React, { Component } from "react";
import { shape, string, instanceOf } from "prop-types";
import { inject, observer } from "mobx-react";
import queryString from "query-string";

import Store from "stores/Store";

@inject(({ store }) => ({ store }))
@observer
class Search extends Component {
  static propTypes = {
    match: shape({
      params: {
        query: string
      }
    }).isRequired,
    store: instanceOf(Store).isRequired
  };

  componentDidMount() {
    const {
      store: { setQueryStore },
      match: { params: { query } }
    } = this.props;

    setQueryStore(queryString.parse(query));
  }

  render() {
    return <div />;
  }
}

export default Search;
