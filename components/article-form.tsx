'use client'

import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { createArticle } from '@/app/actions'

const initialState = {
  message: undefined,
  errors: {} as {
    title?: string[]
    url?: string[]
    description?: string[]
  },
}

export function ArticleForm() {
  const [state, formAction] = useActionState(createArticle, initialState)

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Agregar Nuevo Artículo
        </CardTitle>
        <CardDescription>Completa los campos para guardar un artículo en tu lista</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Nombre del artículo *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ej: Cómo mejorar la productividad"
                required
              />
              {state.errors?.title && <p className="text-red-500 text-xs">{state.errors.title[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Enlace del artículo *</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://ejemplo.com/articulo"
                required
              />
              {state.errors?.url && <p className="text-red-500 text-xs">{state.errors.url[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Breve descripción o notas sobre el artículo..."
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Artículo
          </Button>
          {state.message && <p className="text-green-500 text-xs">{state.message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}