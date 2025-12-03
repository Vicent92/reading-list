'use client'

import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { registerUser } from '@/app/actions'

const initialState = {
  message: undefined,
  errors: {} as {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
  },
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Crear Cuenta
        </CardTitle>
        <CardDescription>Completa los campos para registrarte</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Pérez"
              required
            />
            {state.errors?.name && <p className="text-red-500 text-xs">{state.errors.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
            {state.errors?.email && <p className="text-red-500 text-xs">{state.errors.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            {state.errors?.password && <p className="text-red-500 text-xs">{state.errors.password[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
            {state.errors?.confirmPassword && <p className="text-red-500 text-xs">{state.errors.confirmPassword[0]}</p>}
          </div>
          <Button type="submit" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Registrarse
          </Button>
          {state.message && (
            <p className={`text-xs ${state.message.includes('exitoso') ? 'text-green-500' : 'text-red-500'}`}>
              {state.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
