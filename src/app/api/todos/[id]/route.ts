import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import prisma from "../../../../lib/prisma";

interface Segments {
  params: {
    id: string;
  }
}

export async function GET(request: NextRequest, { params }: Segments) {

  const todo = await prisma.todo.findFirst({ where: { id: params.id } });

  if (!todo) {
    return NextResponse.json({ message: "Todo no encontrado" }, { status: 404 })
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional()
})

export async function PUT(request: NextRequest, { params }: Segments) {
  const { id } = params;

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({ message: "Todo no encontrado" }, { status: 404 });
  }

  try {
    const { complete, description, ...rest } = await putSchema.validate(await request.json());
  
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description }
    });
  
    return NextResponse.json(updatedTodo);

  } catch (err) {
    return NextResponse.json(err, {status:400});
  }
}