import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ExternalLink, Trash2, LogOut } from "lucide-react"
import { ArticleForm } from "@/components/article-form"
import { turso } from "@/db/clientTurso"
import { deleteArticle, logoutUser } from "@/app/actions"
import { cookies } from "next/headers"

interface Article {
  id: number
  title: string
  url: string
  description: string
  dateAdded: string
}

async function getArticles() {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ')

    const res = await fetch(`${process.env.DOMAIN_URL}api/article`, {
      headers: {
        'Cookie': cookieHeader
      }
    })
    const json = await res.json()
    return json
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function ReadingListApp() {
  const dataArticles: Article[] = await getArticles()
console.log(dataArticles)
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Mi Lista de Lectura</h1>
          </div>
          <p className="text-muted-foreground text-balance">Guarda artículos interesantes para leer más tarde</p>

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/chat">
              <Button variant="outline" className="gap-2 cursor-pointer">
                IA Chat
              </Button>
            </Link>
            <form action={logoutUser}>
              <Button variant="outline" type="submit" className="gap-2">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>

        {/* Two Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ArticleForm />
          </div>

          {/* Right Column - Articles List */}
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
                    Usa el formulario de la izquierda para agregar tu primer artículo
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
                            <span>Agregado: {new Date(article.dateAdded).toLocaleDateString()}</span>
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
                        <form action={deleteArticle.bind(null, article.id.toString())}>
                          <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
