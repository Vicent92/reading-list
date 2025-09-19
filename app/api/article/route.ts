import { turso } from "@/db/clientTurso";

interface Article {
  title: string
  url: string
  description: string
}

export async function GET(request: Request) {
  try {
    const res = await turso.execute("SELECT id, title, url, description, dateAdded FROM articles")
    
    return new Response(JSON.stringify(res.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({
      message: 'error al traer los articulos'
    }), {
      status: 500
    })
  }
}
 
export async function POST(request: Request) {
  const {
    title,
    url,
    description
  }: Article = await request.json()
  try {
    await turso.execute({
      sql: 'INSERT INTO articles (title, url, description, dateAdded) VALUES (?, ?, ?, ?)',
      args: [title, url, description || '', new Date],
    })

    return new Response(JSON.stringify({
      status: 200,
      message: 'El articulo se creo exitosamente'
    }))
  } catch (e) {
    console.error({ message: 'Error al agregar el artículo', error: e })
    return new Response(JSON.stringify({
      status: 404,
      message: 'Error al agregar el artículo',
    }))
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return new Response(JSON.stringify({
        status: 400,
        message: 'ID del artículo es requerido'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const result = await turso.execute({
      sql: 'DELETE FROM articles WHERE id = ?',
      args: [id]
    })

    if (result.rowsAffected === 0) {
      return new Response(JSON.stringify({
        status: 404,
        message: 'Artículo no encontrado'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      status: 200,
      message: 'El artículo se eliminó exitosamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (e) {
    console.error({ message: 'Error al eliminar el artículo', error: e })
    return new Response(JSON.stringify({
      status: 500,
      message: 'Error al eliminar el artículo'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}