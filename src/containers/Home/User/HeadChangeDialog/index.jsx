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
  // 上传图片
  onChange = ({ fileList: newFileList }) => {
    this.setState({ fileList: newFileList });
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

  render() {
    const { fileList } = this.state;
    const { afterClose, getContainer, onSuccess } = this.props;
    return (
      <Dialog
        title={"修改头像"}
        closable={true}
        afterClose={afterClose}
        getContainer={getContainer}
        width={400}
        // okButtonProps={{
        //   loading: true,
        // }}
        onOk={() => {
          afterClose();
          onSuccess();
        }}
      >
        <div className={`${classPrefix}-home-user-headchange-dialog`}>
          <ImgCrop rotate>
            <Upload
              accept=".jpg,.jpeg,.png"
              action="/fileUpload/file/upload"
              beforeUpload={this.beforeUpload}
              listType="picture-card"
              fileList={fileList}
              onChange={this.onChange}
              onPreview={this.onPreview}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true,
                showDownloadIcon: true,
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
