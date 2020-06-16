import React from "react";
import { classPrefix } from "./../../const";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { displayRefreshId } from "./../../utils";
import MyIcon from "./../MyIcon";
import "./index.less";

class FixMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  // 点击刷新执行请求
  handleRefresh = () => {
    // 此处需从redux读出此处对应的tab对象，然后把特定对象的iframe删除，然后重新插入页面
    const { focus, onRefresh } = this.props;
    if (focus === 1) {
      // 工作台请求刷新走回调
      onRefresh();
    } else {
      //非工作台直接删掉iframe重新生成
      displayRefreshId(focus);
    }
  };
  render() {
    const { menu, focus, changeFocus, deleteMenu } = this.props;
    return (
      <div className={`${classPrefix}-component-fixmenu`}>
        <div className={`${classPrefix}-component-fixmenu-content clearfix`}>
          <div
            className={`${classPrefix}-component-fixmenu-content-sx l-left`}
            onClick={this.handleRefresh}
          >
            <MyIcon type="iconshuaxin" className="icon" />
          </div>
          {menu.map((it, i) => (
            <div
              className={`${
                focus === it.focus ? "menu-item-focus" : ""
              } menu-item l-left `}
              key={it.focus}
              onClick={() => {
                changeFocus(it.focus);
                const iframeArr = document.querySelectorAll(".iframe-content");
                for (let i = 0; i < iframeArr.length; i++) {
                  iframeArr[i].setAttribute("style", "display:none;");
                  if (
                    it.focus !== 1 &&
                    iframeArr[i].getAttribute("title") === it.title
                  ) {
                    iframeArr[i].setAttribute("style", "display:inline-block;");
                  }
                }
              }}
            >
              {it.title}
              {i !== 0 && (
                <div className="pos">
                  <CloseOutlined
                    className="icon"
                    onClick={(e) => {
                      // 注意冒泡
                      e.stopPropagation();
                      const iframeArr = document.querySelectorAll(
                        ".iframe-content"
                      );
                      for (let i = 0; i < iframeArr.length; i++) {
                        if (iframeArr[i].getAttribute("title") === it.title) {
                          document
                            .getElementById("root")
                            .removeChild(iframeArr[i]);
                        }
                      }
                      deleteMenu(it);
                      changeFocus(1);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

FixMenu.propTypes = {
  menu: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
  onRefresh: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    focus: state.focus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFocus: (e) => {
      dispatch({ type: "CHANGE-FOCUS", focus: e });
    },
    deleteMenu: (e) => {
      dispatch({ type: "DELETE-MENU", data: e });
    },
  };
};

const FixMenuStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FixMenu));

export default FixMenuStore;
