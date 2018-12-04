import { number, password, username, name } from './validators';

export const validateAddUSerForm = (user) => {
  if (name(user.fullName)) {
    this.setState({messageValidate: 'Tên nhân viên không được chứa kí tự đặc biệt.\nVui lòng nhập lại!', isValidate: true});
    return;
  }

  if (username(user.username)) {
    this.setState({messageValidate: 'Username không được chứa kí tự đặc biệt.\nVui lòng nhập lại!', isValidate: true});
    return;
  }
  
  if (!password(user.password)) {
    this.setState({messageValidate: 'Password không được chứa khoảng trắng.\nVui lòng nhập lại!', isValidate: true});
    return;
  }
  
  if (!number(user.CMND)) {
    this.setState({messageValidate: 'CMND chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
    return;
  }
  
  if (!number(user.phoneNumber)) {
    this.setState({messageValidate: 'Số điện thoại chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
    return;
  }
  
  if (!number(user.salary)) {
    this.setState({messageValidate: 'Lương chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
    return;
  }
  
  if (!number(user.bonus)) {
    this.setState({messageValidate: 'Bonus chỉ chấp nhận số.\nVui lòng nhập lại!', isValidate: true});
    return;
  }
}
