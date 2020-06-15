import React from "react";
import { Dialog } from "./../../../../components";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { classPrefix } from "./../../../../const";
import ImgCrop from "antd-img-crop";

import "./index.less";
class DialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
    };
  }

  // 上传开始前做一些限制
  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error("单个文件限制小于20M!");
    }
    return isLt2M;
  };
  // 组件阿里云上传图片
  onChange = (e) => {
    let { fileList } = e;
    if (e.file && e.file.status && e.file.status !== "removed")
      this.setState({ loading: true });
    if (fileList && fileList.length !== 0 && fileList[0].status === "done") {
      this.setState({ loading: false });
    }
    this.setState({ fileList });
  };
  // 展示图片
  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  // 修改头像接口上传
  handleUploading = () => {
    const { fileList } = this.state;
    if (!fileList.length) return message.warning("请先上传头像！");
    const urlId =
      fileList[0] &&
      fileList[0].response &&
      fileList[0].response.data &&
      fileList[0].response.data.fileId;
    const url =
      fileList[0] &&
      fileList[0].response &&
      fileList[0].response.data &&
      fileList[0].response.data.fileSmUrl;
    this.setState({ loading: true });
    Request.post(`/aAcct/updHead`, { fileId: urlId })
      .then((res) => {
        if (res.data && res.data.code === "00000") {
          const { afterClose, onSuccess } = this.props;
          afterClose();
          onSuccess(url);
          this.setState({ loading: false });
        }
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { fileList, loading } = this.state;
    const { afterClose, getContainer } = this.props;
    return (
      <Dialog
        title={"修改头像"}
        closable={true}
        afterClose={afterClose}
        getContainer={getContainer}
        width={400}
        okButtonProps={{
          loading,
        }}
        onOk={this.handleUploading}
      >
        <div className={`${classPrefix}-home-user-headchange-dialog`}>
          <ImgCrop rotate>
            <Upload
              accept=".jpg,.jpeg,.png"
              action="/fileUpload"
              data={{
                isShowSmall: "Y",
              }}
              beforeUpload={this.beforeUpload}
              listType="picture-card"
              fileList={fileList}
              onChange={this.onChange}
              onPreview={this.onPreview}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: false,
              }}
            >
              {fileList.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">上传头像</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </div>
      </Dialog>
    );
  }
}

DialogExample.propTypes = {
  afterClose: PropTypes.func,
  getContainer: PropTypes.func,
  data: PropTypes.object,
  onSuccess: PropTypes.func,
};

const open = (props) => {
  Dialog.OpenDialog({}, <DialogExample {...props} />);
};

export { open };
