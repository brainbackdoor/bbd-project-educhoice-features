import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { instanceOf } from "prop-types";

import queryString from "query-string";

import { Form } from "semantic-ui-react";

// https://github.com/moment/moment/issues/2962#issuecomment-255637859
import "moment/locale/ko";

import Store from "stores/Store";



import SearchAddress from "common/SearchAddress";

import LandingTitle from "pages/landing/LandingTitle";
import SearchButton from "pages/landing/SearchButton";

import "./Landing.scss";



@inject(({ store }) => ({ store }))
@observer
class Landing extends Component {
  static propTypes = {
    store: instanceOf(Store).isRequired
  };

  // https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1
  constructor(props) {
    super(props);


    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  handleChangeAddress(address) {
    const { setAddress } = this.props.store.queryStore;

    setAddress(address);
  }


  render() {
    const {
      queryStore: {
        address
      }
    } = this.props.store;

    const qs = queryString.stringify({
      address
    });

    return (
      <div className="container container--main">
        <LandingTitle />

        <Form>
          <div className="search-box">
            <div className="search-box__selector-wrap">
              <SearchAddress
                address={address}
                handleChangeAddress={this.handleChangeAddress}
              />
            </div>
            <SearchButton
              searchButtonClassName="visible-desktop"
              queryString={qs}
            />
          </div>   
          <SearchButton
            searchButtonClassName="visible-mobile"
            queryString={qs}
          />
        </Form>
      </div>
    );
  }
}

export default Landing;
