import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { captcha } = req.body;

  const googleVerifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;

  const response = await fetch(googleVerifyURL, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  });

  const data = await response.json();

  if (data.success) {
    res.status(200).json(true);
  } else {
    res.status(400).json(false);
  }
};

export default handler;
