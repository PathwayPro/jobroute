import { useState } from "react";

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState(false);

  const handleCaptcha = async (token: string | null) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ captcha: token }),
    });

    const success = await res.json();
    if (success) {
      setCaptcha(true);
    }
  };

  return { captcha, handleCaptcha };
};
