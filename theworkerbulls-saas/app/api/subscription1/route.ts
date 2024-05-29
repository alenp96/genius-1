import { auth, currentUser,useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";


const settingsUrl = absoluteUrl("/settings");

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { name, keyword },
    method,
  } = request;
  console.log(name, keyword, method);

  // do nothing fancy and simply return a string concatenation
  return response.status(200).json({ query: name + " " + keyword });
};
