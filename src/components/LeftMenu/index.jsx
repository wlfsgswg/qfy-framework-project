import React from "react";
import { classPrefix } from "./../../const";
import MyIcon from "./../MyIcon";
import { menuTop, menuBottom } from "./type";
import { withRouter } from "react-router-dom";
import { displayNoneAllIframe, routeMatching } from "./../../utils";
import "./index.less";
class LeftMenu extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className={`${classPrefix}-component-leftmenu`}>
        <div className={`${classPrefix}-component-leftmenu-content`}>
          <div className="menu">
            <div className="top">
              <img
                src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=228687868,2097824726&fm=26&gp=0.jpg"
                alt=""
              />
            </div>
            <div className="bottom">
              <div>
                {menuTop.map((it) => (
                  <div
                    key={it.path}
                    className="bottom-tabs"
                    onClick={() => {
                      history.push(it.path);
                      if (routeMatching(it.path) !== "/work") {
                        // displayNoneAllIframe();
                      }
                    }}
                  >
                    <MyIcon type={it.icon} className="bottom-tabs-icon" />
                    <div className="bottom-tabs-title">{it.title}</div>
                  </div>
                ))}
              </div>
              <div>
                {menuBottom.map((it) => (
                  <div
                    className="bottom-tabs"
                    key={it.path}
                    onClick={() => {
                      history.push(it.path);
                      if (routeMatching(it.path) !== "/work") {
                        // displayNoneAllIframe();
                      }
                    }}
                  >
                    <MyIcon type={it.icon} className="bottom-tabs-icon" />
                    <div className="bottom-tabs-title">{it.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LeftMenu);
