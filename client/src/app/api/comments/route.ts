import { getCommentsAction } from "@/actions/comment";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)

    const postId = searchParams.get('postId');
    const page = searchParams.get('page');

    const postIdInt = postId ? parseInt(postId, 10) : 0
    const pageInt =  page ? parseInt(page, 10) : 1

   const comments = await getCommentsAction(postIdInt, pageInt)

    return NextResponse.json(comments)

}