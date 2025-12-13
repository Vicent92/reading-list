'use client'

import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
// import { loginUser } from '@/app/actions'

const initialState = {
  message: undefined,
  errors: {} as {
    email?: string[]
    password?: string[]
  },
}

export function LoginForm() {
  // const [state, formAction] = useActionState(loginUser, initialState)

  // return (
  //   <Card className="w-full max-w-md">
  //     <CardHeader>
  //       <CardTitle className="flex items-center gap-2">
  //         <LogIn className="h-5 w-5" />
  //         Iniciar Sesión
  //       </CardTitle>
  //       <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       <form action={formAction} className="space-y-4">
  //         <div className="space-y-2">
  //           <Label htmlFor="email">Correo electrónico *</Label>
  //           <Input
  //             id="email"
  //             name="email"
  //             type="email"
  //             placeholder="tu@email.com"
  //             required
  //           />
  //           {state.errors?.email && <p className="text-red-500 text-xs">{state.errors.email[0]}</p>}
  //         </div>
  //         <div className="space-y-2">
  //           <Label htmlFor="password">Contraseña *</Label>
  //           <Input
  //             id="password"
  //             name="password"
  //             type="password"
  //             placeholder="••••••••"
  //             required
  //           />
  //           {state.errors?.password && <p className="text-red-500 text-xs">{state.errors.password[0]}</p>}
  //         </div>
  //         <Button type="submit" className="w-full">
  //           <LogIn className="h-4 w-4 mr-2" />
  //           Iniciar Sesión
  //         </Button>
  //         {state.message && (
  //           <p className={`text-xs ${state.message.includes('exitosa') ? 'text-green-500' : 'text-red-500'}`}>
  //             {state.message}
  //           </p>
  //         )}
  //       </form>
  //     </CardContent>
  //   </Card>
  // )
}
