'use server'

import { z } from 'zod'
import { turso } from '@/db/clientTurso'
import { revalidatePath } from 'next/cache'
import { error } from 'console'

const articleSchema = z.object({
  title: z.string().min(1, { message: 'El título es requerido' }),
  url: z.string().url({ message: 'Por favor ingrese una URL válida' }),
  description: z.string().optional(),
})

export async function createArticle(prevState: any, formData: FormData) {
  const validatedFields = articleSchema.safeParse({
    title: formData.get('title'),
    url: formData.get('url'),
    description: formData.get('description'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const res = await fetch(`${process.env.DOMAIN_URL}api/article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: validatedFields.data.title,
        url: validatedFields.data.url,
        description: validatedFields.data.description,
      })
    })

    const json = await res.json()

    revalidatePath('/')
    return json
  } catch (e) {
    console.error({ message: 'Error al agregar el artículo', error: e })
    return e
  }
}

export async function deleteArticle(id: string) {
  try {
    const res = await fetch(`${process.env.DOMAIN_URL}api/article?id=${id}`, {
      method: 'DELETE',
    })

    const json = await res.json()

    if (res.ok) {
      revalidatePath('/')
    }

    return json
  } catch (e) {
    console.error({ message: 'Error al eliminar el artículo', error: e })
    return {
      status: 500,
      message: 'Error al eliminar el artículo'
    }
  }
}
