import { NextResponse } from 'next/server';
import { auth } from "@/auth"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = auth(async function GET(request) {

  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  return NextResponse.json({ message: "Authenticated" });
})


export const POST = auth(async function POST(request) {

  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  if (!request.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const body = await request.json();

  const testTableData = await prisma.test.findMany();

  return NextResponse.json({ message: "Authenticated", body, testTableData });
})
