import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface ProductVariant {
  id: number;
  slug: string;
  name: string;
  flavor: string | null;
  quantity: string | null;
  description: string;
}

interface GroupedProduct {
  id: number;
  slug: string;
  name: string;
  brand_name: string;
  category_name: string;
  description: string;
  variant_count: number;
  variants: ProductVariant[];
}

export default function ProductVariants() {
  const { category } = useParams();
  
  const { data: groupedProducts, isLoading } = useQuery({
    queryKey: ['/api/products-grouped', category],
    queryFn: async () => {
      const response = await fetch(`/api/products-grouped/${category}`);
      if (!response.ok) throw new Error('Failed to fetch grouped products');
      return response.json() as GroupedProduct[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1).replace('-', ' ') || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link href={`/products/${category}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla lista prodotti
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {categoryName} - Varianti Raggruppate
          </h1>
          <p className="text-lg text-gray-600">
            Prodotti organizzati per gruppo con tutte le varianti disponibili
          </p>
        </div>

        <div className="grid gap-6">
          {groupedProducts?.map((group) => (
            <Card key={group.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-gray-900">
                      {group.name}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      <Badge variant="secondary" className="mr-2">{group.brand_name}</Badge>
                      {group.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {group.variant_count} varianti
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {JSON.parse(group.variants).map((variant: ProductVariant) => (
                    <div key={variant.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <Link href={`/product/${variant.slug}`}>
                        <div className="cursor-pointer">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {variant.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {variant.flavor && (
                              <Badge variant="outline" className="text-xs">
                                {variant.flavor}
                              </Badge>
                            )}
                            {variant.quantity && (
                              <Badge variant="outline" className="text-xs">
                                {variant.quantity}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
                            {variant.description && variant.description.length > 90 
                              ? `${variant.description.substring(0, 87)}...` 
                              : variant.description || "Descrizione del prodotto non disponibile"}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {groupedProducts?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nessun prodotto raggruppato trovato
            </h3>
            <p className="text-gray-500">
              Non ci sono prodotti con varianti multiple in questa categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}