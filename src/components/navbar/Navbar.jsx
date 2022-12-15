import "./navbar.css";
import { useEffect, useState } from "react";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);

  const [notificationCounter, setNotificationCounter] = useState(0);
  const [messageCounter, setMessageCounter] = useState(0);

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "disLiked";
    } else if (type === 2) {
      action = "liked";
    } else if (type === 3) {
      action = "commented";
    } else if (type === 4) {
      action = "shared";
    }
    return (
      <span  key={Math.random()} className="notification">
        {`${senderName} has ${action} your post!`}
      </span>
    );
  };

  const displayMessage = ({ senderName, text }) => {
    return (
      <span key={Math.random()} className="notification">
        {`${senderName} send a message: ${text} `}
      </span>
    );
  };

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
      setNotificationCounter((prevCount) => prevCount + 1);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
      setMessageCounter((prevCount) => prevCount + 1);
    });
  }, [socket]);

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="icons">
        <div
          className="icon"
          onClick={() => {
            setOpenNotification(!openNotification);
          }}
        >
          <img src={Notification} className="iconImg" alt="Notification Icon" />
          {notificationCounter > 0 && (
            <div className="counter">{notificationCounter}</div>
          )}
        </div>
        <div
          className="icon"
          onClick={() => {
            setOpenMessages(!openMessages);
          }}
        >
          <img src={Message} className="iconImg" alt="Message Icon" />
          {messageCounter > 0 && (
            <div className="counter">{messageCounter}</div>
          )}
        </div>
        <div
          className="icon"
          onClick={() => {
           // setOpen(!open);
          }}
        >
          <img src={Settings} className="iconImg" alt="Settings Icon" />
          {/*           <div className="counter">2</div>
           */}{" "}
        </div>
      </div>

      {openNotification && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button
            style={{
              background: notificationCounter === 0 && "gray",
              cursor: notificationCounter === 0 && "default",
            }}
            onClick={() => {
              setNotificationCounter(0);
            }}
          >
            Mark as read
          </button>
        </div>
      )}

      {openMessages && (
        <div className="notifications">
          {messages.map((m) => displayMessage(m))}
          <button
            style={{
              background: messageCounter === 0 && "gray",
              cursor: messageCounter === 0 && "default",
            }}
            onClick={() => {
              setMessageCounter(0);
            }}
          >
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
