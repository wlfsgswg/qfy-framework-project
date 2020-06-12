import React from "react";
import { Dialog } from "./../../../../components";
import PropTypes from "prop-types";
class DialogExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { afterClose, getContainer, onSuccess } = this.props;
    return (
      <Dialog
        title={"解绑邮箱"}
        closable={true}
        afterClose={afterClose}
        getContainer={getContainer}
        width={500}
        // okButtonProps={{
        //   loading: true,
        // }}
        onOk={() => {
          afterClose();
          onSuccess();
        }}
      >
        <h3>我是dialogDemo</h3>
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
