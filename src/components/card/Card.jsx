import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleNotification = (type) => {
    (type === 1 || type === 2) && setIsLiked(!isLiked);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleMessage = () => {
    setOpen(!open);
    socket.emit("sendMessage", {
      senderName: user,
      receiverName: post.username,
      text: messageText,
    });
  };

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
        {isLiked ? (
          <img
            src={HeartFilled}
            alt="HeartFilledIcon"
            className="cardIcon"
            onClick={() => {
              handleNotification(1);
            }}
          />
        ) : (
          <img
            src={Heart}
            alt="HeartIcon"
            className="cardIcon"
            onClick={() => {
              handleNotification(2);
            }}
          />
        )}
        <img
          src={Comment}
          alt="CommentIcon"
          className="cardIcon"
          onClick={() => {
           
            setOpen(!open);
          }}
        />
        <img
          src={Share}
          alt="ShareIcon"
          className="cardIcon"
          onClick={() => {
            handleNotification(4);
          }}
        />
        <img src={Info} alt="InfoIcon" className="cardIcon infoIcon" />
        {open && (
          <div className="messages">
            <input
              type="text"
              id="msg"
              name="msg"
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
            />
            <button
            
              onClick={() => {
                handleMessage(); 
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
