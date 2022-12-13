import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

const Card = ({ post }) => {
  const [isLiked,setIsLiked] = useState(false);
  return (
    <div className="card">
      <div className="info">
        <img
          src={post.userImg}
          alt={post.username + "'s Avatar"}
          className="userImg"
        />
        <span>{post.fullname}</span>
      </div>
      <img
        src={post.postImg}
        alt={post.username + "'s Post Image"}
        className="postImg"
      />
      <div className="interaction">
        {isLiked?(
        <img src={HeartFilled} alt="HeartFilledIcon" className="cardIcon" onClick={()=>{setIsLiked(!isLiked)}}/>

        ):(
          <img src={Heart} alt="HeartIcon" className="cardIcon" onClick={()=>{setIsLiked(!isLiked)}}/>

        )}
        <img src={Comment} alt="CommentIcon" className="cardIcon"/>
        <img src={Share} alt="ShareIcon" className="cardIcon"/>
        <img src={Info} alt="InfoIcon" className="cardIcon infoIcon"/>
      </div>
    </div>
  );
};

export default Card;
