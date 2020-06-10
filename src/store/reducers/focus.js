const focus = (state = 1, action) => {
  switch (action.type) {
    case "CHANGE-FOCUS":
      return action.focus;
    default:
      return state;
  }
};

// 工作台1 慧云名片2 智能人事3 虚拟号码管家4
export default focus;
