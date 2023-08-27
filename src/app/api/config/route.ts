import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("wireguard");
  const allPosts = await db.collection("configs").find({}).toArray();

  return NextResponse.json({ status: 200, data: allPosts });
}
