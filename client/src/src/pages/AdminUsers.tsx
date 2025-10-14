import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
}

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch users data
  const { data: usersResponse, isLoading, error } = useQuery<{success: boolean, users: UserData[]}>({
    queryKey: ['/api/admin/users'],
    retry: 1,
  });

  const users = usersResponse?.users || [];

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort users by email
  const sortedUsers = filteredUsers.sort((a, b) => a.email.localeCompare(b.email));

  // Export users to CSV
  const exportToCSV = () => {
    if (sortedUsers.length === 0) {
      toast({
        title: "Nessun dato da esportare",
        description: "Non ci sono utenti da esportare",
        variant: "destructive",
      });
      return;
    }

    const csvHeader = "Email,Nome,Cognome,Telefono\n";
    const csvContent = sortedUsers
      .map(user => `"${user.email}","${user.first_name || ''}","${user.last_name || ''}","${user.phone || ''}"`)
      .join("\n");
    
    const csvData = csvHeader + csvContent;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `utenti_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export completato",
        description: `${sortedUsers.length} utenti esportati con successo`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gray-100 animate-pulse rounded w-2/3"></div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 animate-pulse rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Errore nel caricamento degli utenti</p>
              <p className="text-sm text-gray-500 mt-2">
                Assicurati di essere autenticato come amministratore
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-montserrat">
          Gestione Utenti
        </h1>
        <p className="text-gray-600">
          Visualizza e gestisci tutti gli utenti registrati
        </p>
      </div>

      {/* Users Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>Utenti Registrati</CardTitle>
              <Badge variant="secondary" className="bg-[#FFD100] text-black">
                {sortedUsers.length} utenti
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={exportToCSV}
                variant="outline" 
                size="sm" 
                className="gap-2 hover:bg-[#FFD100] hover:text-black"
                disabled={sortedUsers.length === 0}
              >
                <Download className="h-4 w-4" />
                Esporta CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cerca per email, nome, cognome o telefono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-[#FFD100] focus:border-[#FFD100]"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                {sortedUsers.length} risultati trovati per "{searchTerm}"
              </p>
            )}
          </div>

          {/* Users Table */}
          {sortedUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="mx-auto h-16 w-16 mb-4 text-gray-300" />
              {searchTerm ? (
                <div>
                  <p className="text-lg font-medium mb-2">Nessun utente trovato</p>
                  <p className="text-sm">
                    Prova a modificare i termini di ricerca
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">Nessun utente registrato</p>
                  <p className="text-sm">
                    Gli utenti appariranno qui quando si registreranno
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[60px] font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Nome</TableHead>
                    <TableHead className="font-semibold">Cognome</TableHead>
                    <TableHead className="font-semibold">Telefono</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers.map((user, index) => (
                    <TableRow 
                      key={index} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-mono text-sm text-gray-500">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-gray-900">
                          {user.email}
                        </span>
                      </TableCell>
                      <TableCell>
                        {user.first_name ? (
                          <span className="text-gray-700 capitalize">
                            {user.first_name}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            Non specificato
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.last_name ? (
                          <span className="text-gray-700 capitalize">
                            {user.last_name}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            Non specificato
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.phone ? (
                          <span className="font-mono text-gray-700">
                            {user.phone}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-sm">
                            Non specificato
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Stats Footer */}
          {sortedUsers.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                  <strong>{sortedUsers.length}</strong> utenti totali
                </span>
                <span>
                  <strong>{sortedUsers.filter(u => u.first_name && u.last_name).length}</strong> con nome completo
                </span>
                <span>
                  <strong>{sortedUsers.filter(u => u.phone).length}</strong> con numero di telefono
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}