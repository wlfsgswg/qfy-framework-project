import React from "react";
import { classPrefix } from "./../../../const";
import "./index.less";
// import { MyIframe } from "./../../../components";
class Personnel extends React.Component {
  componentDidMount() {
    const iframeArr = document.querySelectorAll(".iframe-content");
    if (iframeArr.length) {
      let bol = false;
      for (let i = 0; i < iframeArr.length; i++) {
        bol = bol || iframeArr[i].getAttribute("title") === "智能人事";
      }
      if (!bol) {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", "http://192.168.1.9:9024/main#/");
        iframe.setAttribute("class", "iframe-content");
        iframe.setAttribute("title", "智能人事");
        iframe.setAttribute("style", "display:inline-block;");
        document.getElementById("root").append(iframe);
      } else {
        const iframeArr = document.querySelectorAll(".iframe-content");
        for (let i = 0; i < iframeArr.length; i++) {
          if (iframeArr[i].getAttribute("title") === "智能人事") {
            iframeArr[i].setAttribute("style", "display:inline-block;");
          }
        }
      }
    } else {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", "http://192.168.1.9:9024/main#/");
      iframe.setAttribute("class", "iframe-content");
      iframe.setAttribute("title", "智能人事");
      iframe.setAttribute("style", "display:inline-block;");
      document.getElementById("root").append(iframe);
    }
  }

  componentWillUnmount() {
    const iframeArr = document.querySelectorAll(".iframe-content");
    console.log(iframeArr);

    for (let i = 0; i < iframeArr.length; i++) {
      if (iframeArr[i].getAttribute("title") === "智能人事") {
        // console.log(11111);
        iframeArr[i].setAttribute("style", "display:none;");
      }
    }
  }

  render() {
    return (
      <div className={`${classPrefix}-home-personnel`}>
        <div className={`${classPrefix}-home-personnel-content`}>
          <div id="qfy-znrs"></div>
          {/* <MyIframe src="http://192.168.1.9:9024/main#/" title="智能人事" /> */}
        </div>
      </div>
    );
  }
}

export default Personnel;
