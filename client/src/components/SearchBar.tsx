import React, { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  placeholder?: string;
  showCategoryFilter?: boolean;
  currentCategory?: string;
  initialValues?: Partial<SearchFilters>;
}

interface SearchFilters {
  searchQuery: string;
  brandSlug: string;
  categorySlug?: string;
  priceRange: string;
  sortBy: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Cerca prodotti...",
  showCategoryFilter = false,
  currentCategory,
  initialValues = {}
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValues.searchQuery || '');
  const [brandSlug, setBrandSlug] = useState(initialValues.brandSlug || 'all');
  const [priceRange, setPriceRange] = useState(initialValues.priceRange || 'all');
  const [sortBy, setSortBy] = useState(initialValues.sortBy || 'name');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch brands for filter dropdown (contextual filtering)
  const { data: brands = [] } = useQuery({
    queryKey: ['brands', currentCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      // Aggiungi la categoria corrente se disponibile
      if (currentCategory) {
        params.append('category', currentCategory);
      }
      
      // Aggiungi il termine di ricerca se disponibile e non vuoto
      if (searchQuery && searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }
      
      const url = params.toString() ? `/api/brands?${params}` : '/api/brands';
      const response = await fetch(url);
      if (!response.ok) return [];
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minuti cache per performance migliori
    gcTime: 30 * 60 * 1000, // 30 minuti in background
  });

  // Fetch categories for filter dropdown (if needed)
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) return [];
      return response.json();
    },
    enabled: showCategoryFilter,
    staleTime: 5 * 60 * 1000, // 5 minuti cache
    gcTime: 10 * 60 * 1000, // 10 minuti in background
  });

  // Handler per la ricerca
  const handleSearch = () => {
    const filters: SearchFilters = {
      searchQuery: searchQuery.trim(),
      brandSlug,
      priceRange,
      sortBy,
      ...(currentCategory && { categorySlug: currentCategory })
    };
    onSearch(filters);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setBrandSlug('all');
    setPriceRange('all');
    setSortBy('name');
    
    const filters: SearchFilters = {
      searchQuery: '',
      brandSlug: 'all',
      priceRange: 'all',
      sortBy: 'name',
      ...(currentCategory && { categorySlug: currentCategory })
    };
    onSearch(filters);
  };

  // Auto-search quando cambiano i filtri
  useEffect(() => {
    handleSearch();
  }, [brandSlug, priceRange, sortBy]);

  const priceRanges = [
    { value: 'all', label: 'Tutte le fasce di prezzo' },
    { value: '0-25', label: 'Fino a €25' },
    { value: '25-50', label: '€25 - €50' },
    { value: '50-100', label: '€50 - €100' },
    { value: '100+', label: 'Oltre €100' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z' },
    { value: 'name-desc', label: 'Nome Z-A' },
    { value: 'price-desc', label: 'Dal più caro al meno costoso' },
    { value: 'price-asc', label: 'Dal meno caro al più costoso' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-6">
      {/* Barra di ricerca principale */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Input di ricerca */}
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="hidden md:block absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-4 md:pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            />
          </div>
        </div>

        {/* Pulsanti azione */}
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-[#FFD100] hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-md transition-colors duration-200 whitespace-nowrap"
          >
            Cerca
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            <Filter className="h-5 w-5" />
            Filtri
            <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sezione filtri (collapsible) */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Filtro Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <select
                value={brandSlug}
                onChange={(e) => setBrandSlug(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
              >
                <option value="all">Tutte le marche</option>
                {brands.map((brand: any) => (
                  <option key={brand.slug} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro fascia di prezzo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fascia di prezzo
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordinamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordinamento
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pulsante reset filtri */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              Pulisci filtri
            </button>
          </div>
        </div>
      )}

      {/* Indicatori filtri attivi */}
      {(searchQuery || brandSlug !== 'all' || priceRange !== 'all' || sortBy !== 'name') && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Filtri attivi:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                "{searchQuery}"
                <button onClick={() => {setSearchQuery(''); setTimeout(handleSearch, 0)}}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {brandSlug !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                {brands.find((b: any) => b.slug === brandSlug)?.name || brandSlug}
                <button onClick={() => setBrandSlug('all')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {priceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                {priceRanges.find(p => p.value === priceRange)?.label}
                <button onClick={() => setPriceRange('all')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {sortBy !== 'name' && (
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                {sortOptions.find(s => s.value === sortBy)?.label}
                <button onClick={() => setSortBy('name')}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;