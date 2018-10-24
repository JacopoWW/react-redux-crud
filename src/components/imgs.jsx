import React, { Component } from "react";
import { connect } from "react-redux";
import ImgList from "./imgList";
import PropTypes from "prop-types";
import { fetchImgs, deleteImg } from "../action";

class ImgsPage extends Component {
  componentDidMount() {
    this.props.fetchImgs();
  }
  render() {
    const { imgs, deleteImg } = this.props;
    return (
      <div>
        <h2>图片页面</h2>
        <ImgList imgs={imgs} deleteImg={deleteImg} />
      </div>
    );
  }
}

ImgsPage.propTypes = {
  imgs: PropTypes.array.isRequired
};

function mapState(state) {
  return {
    imgs: state.imgs
  };
}

export default connect(
  mapState,
  { fetchImgs, deleteImg }
)(ImgsPage);
