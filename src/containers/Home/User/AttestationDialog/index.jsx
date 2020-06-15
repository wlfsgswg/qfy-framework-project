import React from "react";
import { Dialog } from "./../../../../components";
import PropTypes from "prop-types";
import { Form, Input, Alert } from "antd";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const pattern = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
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
    const { name, cardNo } = summit;
    if (!name || !cardNo || !pattern.test(cardNo)) return;
    const data = {
      name: name.trim(),
      cardNo: cardNo.trim(),
    };
    this.setState({ loading: true });
    Request.post(`/aAcct/realAuth`, data)
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
    const { afterClose, getContainer, data } = this.props;
    return (
      <Dialog
        title={"实名认证"}
        closable={true}
        afterClose={afterClose}
        getContainer={getContainer}
        width={500}
        okButtonProps={{
          loading,
        }}
        onOk={this.onFinish}
      >
        <div className="p-b-10">
          <Alert
            message="请输入身份证号、姓名，每日有3次认证机会。"
            type="error"
          />
        </div>
        <Form
          {...layout}
          name="atte-basic-dialog"
          initialValues={{
            name: data.name,
          }}
          ref={this.formRef}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入真实姓名" }]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>

          <Form.Item
            label="身份证号"
            name="cardNo"
            rules={[
              {
                required: true,
                message: "请输入正确的身份证号",
                pattern,
              },
            ]}
          >
            <Input placeholder="请输入身份证号" />
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
