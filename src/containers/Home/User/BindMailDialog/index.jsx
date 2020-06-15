import React from "react";
import { Dialog } from "./../../../../components";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
class DialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      loading: false,
    };
  }

  onFinish = () => {
    // 先调用报错
    this.formRef.current.submit();
    // 处理数据
    const summit = this.formRef.current.getFieldsValue();
    const { mailAcct, mailPwd } = summit;
    if (!mailAcct || !mailPwd || !pattern.test(mailAcct)) return;
    const data = {
      mailAcct: mailAcct.trim(),
      mailPwd: mailPwd.trim(),
    };
    this.setState({ loading: true });
    Request.post(`/aAcct/bEmail`, data)
      .then((res) => {
        if (res.data.code === "00000") {
          const { afterClose, onSuccess } = this.props;
          afterClose();
          onSuccess({ ...data });
          this.setState({ loading: false });
        }
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { loading } = this.state;
    const { afterClose, getContainer } = this.props;
    return (
      <Dialog
        title={"绑定邮箱"}
        closable={true}
        afterClose={afterClose}
        getContainer={getContainer}
        width={500}
        okButtonProps={{
          loading,
        }}
        onOk={this.onFinish}
      >
        <Form {...layout} name="bind-mail-dialog" ref={this.formRef}>
          <Form.Item
            label="邮箱账号"
            name="mailAcct"
            rules={[
              { required: true, message: "请输入正确的邮箱格式", pattern },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="mailPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        </Form>
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
