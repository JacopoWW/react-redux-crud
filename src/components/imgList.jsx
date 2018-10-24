import React from "react";
import PropTypes from "prop-types";
import ImgCard from "./imgCard";

const ImgList = ({ imgs, deleteImg }) => {
  const empty = <p>目前数据库中没有游戏</p>;
  const imgList = (
    <div className="ui four cards">
      {imgs.map(item => (
        <ImgCard
          img={item}
          key={item._id}
          deleteImg={_ => deleteImg(item._id)}
        />
      ))}
    </div>
  );
  return imgs.length === 0 ? empty : imgList;
};

ImgList.PropType = {
  imgs: PropTypes.array.isRequired
};

export default ImgList;
