import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";

const LastSeen = ({ timestamp }) => {
  const [relativeTime, setRelativeTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setRelativeTime(
        formatDistanceToNow(new Date(timestamp), { addSuffix: true })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [timestamp]);
  return <span>{relativeTime}</span>;
};

export default LastSeen;
