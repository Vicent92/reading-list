// import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink, Plus, Trash2 } from "lucide-react"

interface Article {
  id: string
  title: string
  url: string
  description: string
  dateAdded: string
}

export default async function ReadingListApp() {
  const res = await fetch(`${process.env.DOMAIN_URL}api/article`)
  const dataArticles: Article[] = await res.json()



  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Mi Lista de Lectura</h1>
          </div>
          <p className="text-muted-foreground text-balance">Guarda artículos interesantes para leer más tarde</p>
        </div>

        {/* Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Agregar Nuevo Artículo
            </CardTitle>
            <CardDescription>Completa los campos para guardar un artículo en tu lista</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Nombre del artículo *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Cómo mejorar la productividad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Enlace del artículo *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://ejemplo.com/articulo"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Breve descripción o notas sobre el artículo..."
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Artículo
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Artículos Guardados</h2>
            <Badge variant="secondary" className="text-sm">
              {dataArticles.length} {dataArticles.length === 1 ? "artículo" : "artículos"}
            </Badge>
          </div>

          {dataArticles.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-2">No tienes artículos guardados aún</p>
                <p className="text-muted-foreground text-sm">
                  Usa el formulario de arriba para agregar tu primer artículo
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {dataArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground mb-2 text-pretty">{article.title}</h3>
                        {article.description && (
                          <p className="text-muted-foreground mb-3 text-pretty">{article.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Agregado: {article.dateAdded}</span>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Ver artículo
                          </a>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
