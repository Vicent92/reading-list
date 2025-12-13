'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
// import { createClient } from '@/lib/supabase/server'

const articleSchema = z.object({
  title: z.string().min(1, { message: 'El título es requerido' }),
  url: z.string({ message: 'Por favor ingrese una URL válida' }),
  description: z.string().optional(),
})

// const loginSchema = z.object({
//   email: z.email({ message: 'Por favor ingrese un correo válido' }),
//   password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
// })

// const registerSchema = z.object({
//   name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
//   email: z.email({ message: 'Por favor ingrese un correo válido' }),
//   password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: 'Las contraseñas no coinciden',
//   path: ['confirmPassword'],
// })

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
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')

    const res = await fetch(`${process.env.DOMAIN_URL}api/article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
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
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')

    const res = await fetch(`${process.env.DOMAIN_URL}api/article?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Cookie': cookieHeader
      }
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

// export async function loginUser(prevState: any, formData: FormData) {
//   const validatedFields = loginSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   })

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }

//   try {
//     const supabase = await createClient()
    
//     const { email, password } = validatedFields.data
    
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     })

//     if (error) {
//       return {
//         message: error.message || 'Credenciales inválidas',
//         success: false,
//       }
//     }

//     // Redirigir a la página principal después de un login exitoso
//     redirect('/')
//   } catch (e) {
//     console.error({ message: 'Error al iniciar sesión', error: e })
//     return {
//       message: 'Error al iniciar sesión',
//       success: false,
//     }
//   }
// }

// export async function logoutUser() {
//   try {
//     const supabase = await createClient()
//     const { error } = await supabase.auth.signOut()

//     if (error) {
//       console.error('Error al cerrar sesión:', error)
//       return {
//         message: error.message || 'Error al cerrar sesión',
//         success: false,
//       }
//     }

//     // Redirigir a login después de cerrar sesión
//     redirect('/login')
//   } catch (e) {
//     console.error({ message: 'Error al cerrar sesión', error: e })
//     return {
//       message: 'Error al cerrar sesión',
//       success: false,
//     }
//   }
// }

// export async function registerUser(prevState: any, formData: FormData) {
//   const validatedFields = registerSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirmPassword: formData.get('confirmPassword'),
//   })

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }

//   try {
//     const supabase = await createClient()
  
//     const { name, email, password } = validatedFields.data
    
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: name
//         }
//       }
//     })

//     if (error) {
//       return {
//         message: error.message || 'Error al registrar el usuario',
//         success: false,
//       }
//     }

//     // Redirigir a login después de un registro exitoso
//     redirect('/login')
//   } catch (e) {
//     console.error({ message: 'Error al registrar el usuario', error: e })
//     return {
//       message: 'Error al registrar el usuario',
//       success: false,
//     }
//   }
// }
