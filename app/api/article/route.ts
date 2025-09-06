import { turso } from "@/db/clientTurso"

export async function GET(req: Request) {
    const articleList = await turso.execute(`SELECT * FROM articles`)

    return new Response(JSON.stringify(articleList.rows), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })    
}