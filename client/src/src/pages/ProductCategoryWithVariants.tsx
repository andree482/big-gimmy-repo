import { useState } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { productCategories } from "@/lib/constants";
import { Search, Filter, Grid, List, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductWithVariants from "@/components/ProductWithVariants";

interface BaseProduct {
  id: number;
  name: string;
  slug: string;
  brand_name: string;
  category_name: string;
  description: string;
  long_description: string;
  available_flavors: string[];
  available_quantities: string[];
  price_range_min: number;
  price_range_max: number;
  base_image: string;
}

export default function ProductCategoryWithVariants() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Trova la categoria corrente
  const currentCategory = productCategories.find(cat => cat.slug === category);

  // Fetch prodotti base con varianti per questa categoria
  const { data: baseProducts, isLoading } = useQuery({
    queryKey: ['/api/base-products', category],
    queryFn: async () => {
      const response = await fetch(`/api/base-products/${category}`);
      if (!response.ok) throw new Error('Failed to fetch base products');
      return response.json() as BaseProduct[];
    },
  });

  // Fetch anche i prodotti normali (senza varianti multiple)
  const { data: regularProducts } = useQuery({
    queryKey: ['/api/products', category],
    queryFn: async () => {
      const response = await fetch(`/api/products/${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  // Filtra prodotti che non hanno varianti multiple (non sono nei base_products)
  const filteredRegularProducts = regularProducts?.filter((product: any) => {
    const baseName = product.name
      .replace(/ (750g|1kg|2kg|500g|300g|400g|350g|250g)/g, '')
      .replace(/ (Chocolate|Vanilla|Strawberry|Natural|Banana|Orange|Lemon|Coffee|Coconut|Cioccolato|Vaniglia|Fragola|Naturale|Caffè|Cocco|Limone|Arancia)/g, '');
    
    return !baseProducts?.some((bp: BaseProduct) => bp.name === baseName.trim());
  }) || [];

  const brands = [...new Set([
    ...(baseProducts?.map(p => p.brand_name) || []),
    ...(filteredRegularProducts?.map((p: any) => p.brand || 'BigGimmy') || [])
  ])];

  const filteredBaseProducts = baseProducts?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedBrand === "" || product.brand_name === selectedBrand)
  ) || [];

  const filteredSingleProducts = filteredRegularProducts?.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedBrand === "" || (product.brand || 'BigGimmy') === selectedBrand)
  ) || [];

  const totalProducts = filteredBaseProducts.length + filteredSingleProducts.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria non trovata</h1>
          <Link href="/prodotti">
            <Button>Torna ai Prodotti</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/prodotti">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alle Categorie
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {currentCategory.name}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {currentCategory.description}
          </p>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {totalProducts} prodotti
            </Badge>
            <Badge variant="outline" className="text-sm">
              {filteredBaseProducts.length} con varianti
            </Badge>
          </div>
        </div>

        {/* Filtri */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cerca prodotti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFD100] focus:border-transparent"
              >
                <option value="">Tutti i brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Griglia Prodotti */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {/* Prodotti Base con Varianti */}
          {filteredBaseProducts.map((baseProduct) => (
            <ProductWithVariants 
              key={`base-${baseProduct.id}`} 
              baseProduct={baseProduct} 
            />
          ))}

          {/* Prodotti Singoli (senza varianti multiple) */}
          {filteredSingleProducts.map((product: any) => (
            <div key={`single-${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={`/images/products/${product.slug}.jpg`}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/products/default.jpg";
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{product.brand || 'BigGimmy'}</Badge>
                  <Link href={`/product/${product.slug}`}>
                    <Button size="sm" className="bg-[#FFD100] hover:bg-[#FFD100]/90 text-black">
                      Dettagli
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalProducts === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nessun prodotto trovato
            </h3>
            <p className="text-gray-500">
              Prova a modificare i filtri di ricerca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}