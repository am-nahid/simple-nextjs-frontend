
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Parse cookies from the request headers
  const cookies = parse(req.headers.cookie || '');

  // Access a specific cookie value
  const token = cookies.token;

  // Do something with the cookie value
  console.log(token);

  // Return a response
  res.status(200).json({ message: 'Cookie value logged' });
};
