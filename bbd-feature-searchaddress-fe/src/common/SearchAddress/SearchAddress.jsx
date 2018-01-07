import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { string, func } from "prop-types";

import ecFetch from "helper/ecFetch";

import targetUrl from "./staticSearchAddress";

class SearchAddress extends Component {
  static propTypes = {
    handleChangeAddress: func.isRequired,
    placeholder: string
  };

  static defaultProps = {
    placeholder: "우리 집 위치(동)"
  };

  constructor(props) {
    super(props);

    this.state = {
      searchResult: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleChange(_event, { value }) {
    this.props.handleChangeAddress(value);
  }

  handleSearchChange(_event, { searchQuery }) {
    this.props.handleChangeAddress(searchQuery);

    ecFetch(`${targetUrl}${searchQuery}`, "GET").then(res => {
      if (res instanceof Array) {
        const searchResult = res.map(item => ({ ...item, text: item.value }));
        this.setState({ searchResult });
      }
    });
  }

  render() {
    return (
      <Dropdown
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        options={this.state.searchResult}
        placeholder={this.props.placeholder}
        search
        selection
      />
    );
  }
}

export default SearchAddress;
