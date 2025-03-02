import { useState } from "react";

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState(false);

  const handleCaptcha = async (token: string | null) => {
    try {
      if (!token) {
        console.error('No captcha token provided');
        return;
      }

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captcha: token }),
      });

      if (!res.ok) {
        console.error('Captcha verification failed');
        return;
      }

      const success = await res.json();
      
      if (success) {
        setCaptcha(true);
      } else {
        console.error('Captcha verification failed');
      }
    } catch (error) {
      console.error('Error during captcha verification');
    }
  };

  return { captcha, handleCaptcha };
};
