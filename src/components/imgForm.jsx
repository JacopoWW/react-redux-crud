import React, { Component } from "react";
import Joi from "joi-browser";
import classnames from "classnames";
import { saveImg, getImg, updateImg } from "../action";
import { connect } from "react-redux";

class ImgForm extends Component {
  state = {
    data: {
      _id: "",
      title: "",
      url: ""
    },
    loading: false,
    errors: {}
  };
  schema = {
    title: Joi.string()
      .min(2)
      .required()
      .label("标题"),
    url: Joi.string()
      .min(1)
      .required()
      .label("图片地址")
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id !== "new") {
      const { data } = await getImg(id);
      data.id = data._id;
      delete data._id;
      this.setState({ data });
    }
  }

  errorMessage = (title, error) => {
    return (
      <div className="ui message error">
        <div className="header">{title}</div>
        <p>{error}</p>
      </div>
    );
  };
  validateProperty = ({ name, value }) => {
    const { error } = Joi.validate(
      { [name]: value },
      { [name]: this.schema[name] }
    );
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema);
    if (!error) {
      return null;
    } else {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    const data = { ...this.state.data };
    data[name] = value;

    const errors = { ...this.state.errors };
    const error = this.validateProperty(input);
    if (error) {
      errors[name] = error;
    } else {
      delete errors[name];
    }
    this.setState({ data, errors });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { errors } = this.validate();
    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({ loading: true });
      const { data } = this.state;
      if (data.id) {
        await this.props.updateImg(data);
      } else {
        await this.props.saveImg(this.state.data);
      }
      this.setState({ loading: false });
      this.props.history.push("/imgs");
    }
  };
  render() {
    const { title, url } = this.state.data;
    const { title: titleErr, url: urlErr } = this.state.errors;
    const { loading } = this.state;
    return (
      <form
        className={classnames("ui form", {
          error: titleErr || urlErr,
          loading
        })}
        onSubmit={this.handleSubmit}
      >
        <h1>新增图片</h1>
        <div className={classnames("field", { error: Boolean(titleErr) })}>
          <label>
            标题
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          {titleErr && this.errorMessage("标题不符合要求", titleErr)}
        </div>
        <div className={classnames("field", { error: Boolean(urlErr) })}>
          <label>
            Cover Url
            <input
              type="text"
              name="url"
              value={url}
              onChange={this.handleChange}
            />
          </label>
          {urlErr && this.errorMessage("路径出错了", urlErr)}
        </div>
        <div className="field">
          {url !== "" && (
            <img src={url} alt="cover" className="ui small bordered image" />
          )}
        </div>
        <div className="field">
          <button className="ui primary button">提交</button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { saveImg, updateImg }
)(ImgForm);
