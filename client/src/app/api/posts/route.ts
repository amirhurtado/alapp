import { getPosts } from "@/actions/post";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const feed = searchParams.get("feed") === "true";

    const pageStr = searchParams.get("page");
    const page = pageStr ? parseInt(pageStr, 10) : 1;


    const posts = await getPosts(id!, feed, page);
    return NextResponse.json(posts);

}