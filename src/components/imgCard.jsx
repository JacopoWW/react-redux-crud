import React from "react";
import { Link } from "react-router-dom";

const ImgCard = ({ img, deleteImg }) => {
  const { url, title, _id } = img;
  return (
    <div className="ui card">
      <div className="image">
        <img src={url} alt={title} />
      </div>
      <div className="content">
        <div className="header">{title}</div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link className="ui basic button green" to={"/imgs/" + _id}>
            Edit
          </Link>
          <div className="ui basic button red" onClick={deleteImg}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgCard;
