import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, User, MapPin, Package, Settings, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { PhoneInput } from "@/components/ui/phone-input";

interface UserProfileProps {
  onClose?: () => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

interface AddressData {
  firstName?: string;
  lastName?: string;
  street: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
  isDefault: boolean;
}

interface OrderItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  snipcartOrderId: string;
  total: number;
  status: string;
  items: OrderItem[];
  shippingAddress?: any;
  billingAddress?: any;
  createdAt: string;
  updatedAt: string;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [savingProfile, setSavingProfile] = useState(false);
  const [addingAddr, setAddingAddr] = useState(false);
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();

  // Profile form
  const profileForm = useForm<ProfileData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      province: "",
      country: "Italia",
    },
  });

  // Address form
  const addressForm = useForm<AddressData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      postalCode: "",
      province: "",
      country: "Italia",
      isDefault: false,
    },
  });

  // Load user data
  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        province: user.province || "",
        country: user.country || "Italia",
      });
    }
  }, [user, profileForm]);

  // Fetch user addresses
  const { data: addresses = [], refetch: refetchAddresses } = useQuery({
    queryKey: ["/api/addresses"],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/addresses", undefined, { suppressAuthModal: true });
      // Server restituisce direttamente l'array, non { addresses: [...] }
      return Array.isArray(res) ? res : [];
    },
  });

  const { data: ordersResponse, refetch: refetchOrders } = useQuery({
    queryKey: ["/api/orders"],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/orders", undefined, { suppressAuthModal: true });
      return res;
    },
  });

  const orders = ordersResponse?.orders || [];

  useEffect(() => {
    if (user) {
      refetchAddresses();
      refetchOrders();
    }
  }, [user, refetchAddresses, refetchOrders]);

  // Mutation per aggiungere un indirizzo
  const addAddressMutation = useMutation({
    mutationFn: async (data: AddressData) => {
      // Transform data to match API expectations
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.street, // API expects "address" but saves as "street"
        city: data.city,
        postalCode: data.postalCode,
        province: data.province,
        country: data.country,
        isDefault: data.isDefault
      };
      return apiRequest("POST", "/api/addresses", payload, { suppressAuthModal: true, timeoutMs: 2000 });
    },
    onSuccess: () => {
      toast({
        title: "Indirizzo aggiunto",
        description: "Il nuovo indirizzo è stato salvato",
      });
      refetchAddresses();
      addressForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'aggiunta dell'indirizzo",
        variant: "destructive",
      });
    },
  });

  // Mutation per eliminare un indirizzo
  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: number) => {
      return apiRequest("DELETE", `/api/addresses/${addressId}`, undefined, { suppressAuthModal: true, timeoutMs: 2000 });
    },
    onSuccess: () => {
      toast({
        title: "Indirizzo eliminato",
        description: "L'indirizzo è stato rimosso",
      });
      refetchAddresses();
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'eliminazione dell'indirizzo",
        variant: "destructive",
      });
    },
  });

  // Mutation per impostare un indirizzo come predefinito
  const setDefaultAddressMutation = useMutation({
    mutationFn: async (addressId: number) => {
      return apiRequest("PUT", `/api/addresses/${addressId}/default`, undefined, { suppressAuthModal: true, timeoutMs: 2000 });
    },
    onSuccess: () => {
      toast({
        title: "Indirizzo predefinito aggiornato",
        description: "Le impostazioni dell'indirizzo sono state aggiornate",
      });
      refetchAddresses();
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Errore nell'aggiornamento dell'indirizzo predefinito",
        variant: "destructive",
      });
    },
  });

  const handleProfileSubmit = async (data: ProfileData) => {
    const payload = { firstName: data.firstName, lastName: data.lastName, phone: data.phone };
    setSavingProfile(true);
    const timer = setTimeout(() => setSavingProfile(false), 2200);
    try {
      console.log("[PROFILE] Saving profile", payload);
      const res = await updateProfile(payload);
      console.log("[PROFILE] Save response", res);
      toast({
        title: "Profilo aggiornato",
        description: "Le tue informazioni sono state salvate",
      });
      // Aggiorna i campi con i dati confermati dal backend
      const refreshed = res?.user ?? null;
      if (refreshed) {
        console.log("[PROFILE] Resetting form with refreshed data", refreshed);
        profileForm.reset({
          firstName: refreshed.firstName || payload.firstName,
          lastName: refreshed.lastName || payload.lastName,
          phone: refreshed.phone || payload.phone || "",
          address: refreshed.address || "",
          city: refreshed.city || "",
          postalCode: refreshed.postalCode || "",
          province: refreshed.province || "",
          country: refreshed.country || "Italia",
        });
      }
    } catch (error: any) {
      console.log("[PROFILE] Save error", error);
      toast({
        title: "Errore",
        description: error?.message || "Impossibile salvare le modifiche",
        variant: "destructive",
      });
    } finally {
      clearTimeout(timer);
      setSavingProfile(false);
    }
  };

  const handleAddressSubmit = (data: AddressData) => {
    setAddingAddr(true);
    const timer = setTimeout(() => setAddingAddr(false), 2200);
    addAddressMutation.mutate(data, {
      onSettled: () => {
        clearTimeout(timer);
        setAddingAddr(false);
      }
    });
  };

  const handleDeleteAddress = (addressId: number) => {
    deleteAddressMutation.mutate(addressId);
  };

  // Don't show profile and orders tabs for admin users
  const isAdmin = user?.isAdmin;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-gray-900">Il tuo profilo</h1>
          <p className="text-gray-600">Gestisci i tuoi dati personali e indirizzi</p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Chiudi
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {!isAdmin && (
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profilo
            </TabsTrigger>
          )}
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Indirizzi
          </TabsTrigger>
          {!isAdmin && (
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Ordini ({orders.length})
            </TabsTrigger>
          )}
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Impostazioni
          </TabsTrigger>
        </TabsList>

        {/* Tab Ordini - Hidden for admin */}
        {!isAdmin && (
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>I tuoi ordini</CardTitle>
                <CardDescription>
                  Visualizza la cronologia dei tuoi acquisti
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessun ordine ancora</h3>
                    <p className="text-gray-600">I tuoi acquisti appariranno qui una volta completati.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: Order) => (
                      <Card key={order.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">Ordine #{order.snipcartOrderId}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString('it-IT')}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={
                                  order.status === 'completed' ? 'default' : 
                                  order.status === 'pending' ? 'secondary' : 'destructive'
                                }
                                className="flex items-center gap-1"
                              >
                                {order.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                                {order.status === 'pending' && <Clock className="w-3 h-3" />}
                                {order.status === 'cancelled' && <AlertCircle className="w-3 h-3" />}
                                {order.status === 'completed' ? 'Completato' : 
                                 order.status === 'pending' ? 'In elaborazione' : 'Annullato'}
                              </Badge>
                              <span className="font-semibold">€{(order.total / 100).toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.items?.map((item: OrderItem, index: number) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name} - {item.variant}</span>
                                <span>x{item.quantity} • €{(item.price / 100).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Dettagli ordine
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Dettagli Ordine #{order.snipcartOrderId}</DialogTitle>
                                  <DialogDescription>
                                    Informazioni complete sull'ordine del {new Date(order.createdAt).toLocaleDateString('it-IT')}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Prodotti ordinati:</h4>
                                    <div className="space-y-2">
                                      {order.items?.map((item: OrderItem, index: number) => (
                                        <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                                          <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">{item.variant}</p>
                                          </div>
                                          <div className="text-right">
                                            <p>Quantità: {item.quantity}</p>
                                            <p className="font-semibold">€{(item.price / 100).toFixed(2)}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {order.shippingAddress && (
                                    <div>
                                      <h4 className="font-semibold mb-2">Indirizzo di spedizione:</h4>
                                      <p className="text-sm text-gray-600">
                                        {typeof order.shippingAddress === 'string' 
                                          ? order.shippingAddress 
                                          : JSON.stringify(order.shippingAddress)}
                                      </p>
                                    </div>
                                  )}
                                  
                                  <div className="pt-3 border-t border-gray-200">
                                    <div className="flex justify-between text-lg font-semibold">
                                      <span>Totale:</span>
                                      <span>€{(order.total / 100).toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Tab Profilo - Hidden for admin */}
        {!isAdmin && (
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Dati personali</CardTitle>
                <CardDescription>
                  Aggiorna le tue informazioni personali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        {...profileForm.register("firstName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Cognome</Label>
                      <Input
                        id="lastName"
                        {...profileForm.register("lastName")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Controller
                      name="phone"
                      control={profileForm.control}
                      render={({ field }) => (
                        <PhoneInput
                          id="phone"
                          label="Telefono (opzionale)"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Inserisci il tuo numero"
                        />
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={savingProfile}
                    className="bg-[#FFD100] text-black hover:bg-[#FFD100]/90"
                  >
                    {savingProfile ? "Salvando..." : "Salva modifiche"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Tab Indirizzi */}
        <TabsContent value="addresses">
          <div className="space-y-6">
            {/* Indirizzi esistenti */}
            <Card>
              <CardHeader>
                <CardTitle>I tuoi indirizzi</CardTitle>
                <CardDescription>
                  Gestisci gli indirizzi di spedizione e fatturazione
                </CardDescription>
              </CardHeader>
              <CardContent>
                {addresses.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    Non hai ancora aggiunto nessun indirizzo
                  </p>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address: any) => (
                      <div key={address.id} className="border rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {address.isDefault && (
                              <Badge className="bg-[#FFD100] text-black">Predefinito</Badge>
                            )}
                          </div>
                          {(address.firstName || address.lastName) && (
                            <p className="font-medium">{address.firstName} {address.lastName}</p>
                          )}
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">
                            {address.postalCode ? `${address.city}, ${address.postalCode}` : address.city}
                            {address.province && ` (${address.province})`}
                          </p>
                          {address.country && address.country !== 'Italia' && (
                            <p className="text-gray-600">{address.country}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {!address.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDefaultAddressMutation.mutate(address.id)}
                              disabled={setDefaultAddressMutation.isPending}
                              className="border-[#FFD100] text-[#FFD100] hover:bg-[#FFD100] hover:text-black"
                            >
                              Imposta come predefinito
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            disabled={deleteAddressMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Aggiungi nuovo indirizzo */}
            <Card>
              <CardHeader>
                <CardTitle>Aggiungi nuovo indirizzo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressFirstName">Nome</Label>
                      <Input
                        id="addressFirstName"
                        {...addressForm.register("firstName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressLastName">Cognome</Label>
                      <Input
                        id="addressLastName"
                        {...addressForm.register("lastName")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="addressStreet">Indirizzo</Label>
                    <Input
                      id="addressStreet"
                      {...addressForm.register("street")}
                      placeholder="Via, numero civico"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressCity">Città</Label>
                      <Input
                        id="addressCity"
                        {...addressForm.register("city")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressPostalCode">CAP</Label>
                      <Input
                        id="addressPostalCode"
                        {...addressForm.register("postalCode")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressProvince">Provincia</Label>
                      <Input
                        id="addressProvince"
                        {...addressForm.register("province")}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={addingAddr}
                    className="bg-[#FFD100] text-black hover:bg-[#FFD100]/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {addingAddr ? "Aggiungendo..." : "Aggiungi indirizzo"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>



        {/* Tab Impostazioni */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni account</CardTitle>
              <CardDescription>
                Personalizza la tua esperienza di acquisto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferenze generali</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifiche email</Label>
                    <p className="text-sm text-gray-600">
                      Ricevi aggiornamenti sui tuoi ordini via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Newsletter</Label>
                    <p className="text-sm text-gray-600">
                      Ricevi offerte speciali e novità sui prodotti
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Salva automaticamente nel carrello</Label>
                    <p className="text-sm text-gray-600">
                      Mantieni i prodotti nel carrello tra le sessioni
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Accessibilità</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modalità per daltonici</Label>
                    <p className="text-sm text-gray-600">
                      Attiva contrasti e colori migliorati per l'accessibilità
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Sicurezza account</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email account</Label>
                    <Input value={user?.email} disabled className="bg-gray-50" />
                  </div>
                  
                  <Button variant="outline" className="w-full justify-start">
                    Cambia password
                  </Button>
                  
                  {!isAdmin && (
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      Elimina account
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
