import clientPromise from "@/lib/mongodb";
import { Configs } from "@/types/configs";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development")
    return NextResponse.json({ status: 200 });

  const client = await clientPromise;
  const db = client.db("wireguard");
  const allConfigs = await db.collection("configs").find({}).toArray();

  return NextResponse.json({ status: 200, data: allConfigs });
}

export async function POST(req: Request) {
  const { file, server_status }: Configs = await req.json();

  const owner = process.env.NODE_ENV === "development" ? "ME" : "OTHER";

  const client = await clientPromise;
  const db = client.db("wireguard");

  const newConfigs = await db
    .collection("configs")
    .insertOne({ file, server_status, owner });

  return NextResponse.json({ status: 201, newConfigs: newConfigs.ops });
}
