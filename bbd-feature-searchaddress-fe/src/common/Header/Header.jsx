import React from "react";
import { Link } from "react-router-dom";

import { Popup } from "semantic-ui-react";

import "./Header.scss";

const Header = _props => (
  <header className="header">
    <div className="container">
      <Link to="/">
        <img alt="logo" src="http://placehold.it/128x64" />
      </Link>

      <nav className="navigation">
        <ul className="menu">
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Popup
              trigger={<span>마이페이지</span>}
              content={
                <ul className="sub-menu">
                  <li>회원정보 수정</li>
                  <li>내 관심학원 목록</li>
                  <li>내 문의사항/답변</li>
                  <li>로그아웃</li>
                </ul>
              }
              hoverable
              on="click"
            />
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
