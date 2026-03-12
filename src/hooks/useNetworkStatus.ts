import { useEffect, useState } from "react";

export function useNetworkStatus(
  pingUrl: string = "https://fieldsync.onrender.com/",
) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const checkConnection = async () => {
      try {
        const res = await fetch(pingUrl, { method: "HEAD" });
        setIsOnline(res.ok);
      } catch {
        setIsOnline(false);
      }
    };
    checkConnection();
    interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, [pingUrl]);

  return isOnline;
}
