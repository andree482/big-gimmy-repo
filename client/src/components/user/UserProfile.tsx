import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, User, MapPin, Settings, Eye, EyeOff, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { PhoneInput } from "@/components/ui/phone-input";
import { supabase } from "@/lib/supabase";

// Opzioni per la modalità daltonici
const COLORBLIND_OPTIONS = [
  { value: "normal", label: "Visualizzazione normale" },
  { value: "protanopia", label: "Protanopia (rosso-verde)" },
  { value: "deuteranopia", label: "Deuteranopia (verde-rosso)" },
  { value: "tritanopia", label: "Tritanopia (blu-giallo)" },
] as const;

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


export default function UserProfile({ onClose }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [savingProfile, setSavingProfile] = useState(false);
  const [addingAddr, setAddingAddr] = useState(false);
  const isSubmittingAddress = useRef(false); // Ref sincrona per prevenire doppia chiamata
  const { toast } = useToast();
  const { user, updateProfile } = useAuth();

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [cartPersistence, setCartPersistence] = useState(true);
  const [colorblindMode, setColorblindMode] = useState("normal");

  // Change password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [sendingResetEmail, setSendingResetEmail] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Delete account modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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
    // Previeni doppia chiamata usando ref sincrona
    if (isSubmittingAddress.current) {
      console.log("[ADDRESSES] Richiesta ignorata - submit già in corso");
      return;
    }
    isSubmittingAddress.current = true;
    setAddingAddr(true);
    const timer = setTimeout(() => {
      setAddingAddr(false);
      isSubmittingAddress.current = false;
    }, 2200);
    addAddressMutation.mutate(data, {
      onSettled: () => {
        clearTimeout(timer);
        setAddingAddr(false);
        isSubmittingAddress.current = false;
      }
    });
  };

  const handleDeleteAddress = (addressId: number) => {
    deleteAddressMutation.mutate(addressId);
  };

  // Load user settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('bg_user_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.emailNotifications !== undefined) setEmailNotifications(settings.emailNotifications);
        if (settings.cartPersistence !== undefined) setCartPersistence(settings.cartPersistence);
        if (settings.colorblindMode) setColorblindMode(settings.colorblindMode);
      } catch {}
    }
  }, []);

  // Apply colorblind mode using data-vision attribute (matches existing CSS)
  useEffect(() => {
    const root = document.documentElement;
    if (colorblindMode === 'normal') {
      root.removeAttribute('data-vision');
    } else {
      root.setAttribute('data-vision', colorblindMode);
    }
  }, [colorblindMode]);

  // Save settings to localStorage
  const saveSettings = (key: string, value: any) => {
    const savedSettings = localStorage.getItem('bg_user_settings');
    const settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings[key] = value;
    localStorage.setItem('bg_user_settings', JSON.stringify(settings));
  };

  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    saveSettings('emailNotifications', checked);
    toast({ title: "Impostazione salvata", description: checked ? "Notifiche email attivate" : "Notifiche email disattivate" });
  };

  const handleCartPersistenceChange = (checked: boolean) => {
    setCartPersistence(checked);
    saveSettings('cartPersistence', checked);
    if (!checked) {
      // Clear cart from localStorage if disabled
      localStorage.removeItem('bg_cart');
    }
    toast({ title: "Impostazione salvata", description: checked ? "Carrello salvato tra sessioni" : "Carrello non verrà salvato" });
  };

  const handleColorblindModeChange = (value: string) => {
    setColorblindMode(value);
    saveSettings('colorblindMode', value);
    toast({
      title: "Modalità accessibilità aggiornata",
      description: COLORBLIND_OPTIONS.find(o => o.value === value)?.label || value
    });
  };

  // Change password handler - invia email di reset
  const handleSendResetEmail = async () => {
    if (!user?.email) {
      toast({ title: "Errore", description: "Email non disponibile", variant: "destructive" });
      return;
    }

    setSendingResetEmail(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({ title: "Errore", description: error.message, variant: "destructive" });
        return;
      }

      setResetEmailSent(true);
      toast({ title: "Email inviata", description: "Controlla la tua casella di posta per reimpostare la password" });
    } catch (error: any) {
      toast({ title: "Errore", description: error?.message || "Errore durante l'invio dell'email", variant: "destructive" });
    } finally {
      setSendingResetEmail(false);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast({ title: "Errore", description: "Inserisci la password per confermare", variant: "destructive" });
      return;
    }

    setDeletingAccount(true);
    try {
      // Verify password first
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: deletePassword,
      });

      if (signInError) {
        toast({ title: "Errore", description: "Password non corretta", variant: "destructive" });
        return;
      }

      // Call API to delete account (server will handle Supabase deletion)
      await apiRequest("DELETE", "/api/auth/account", { password: deletePassword });

      // Sign out
      await supabase.auth.signOut();

      toast({ title: "Account eliminato", description: "Il tuo account è stato eliminato con successo" });

      // Redirect to home
      window.location.href = '/';
    } catch (error: any) {
      toast({ title: "Errore", description: error?.message || "Errore durante l'eliminazione", variant: "destructive" });
    } finally {
      setDeletingAccount(false);
    }
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
        <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {!isAdmin && (
            <TabsTrigger value="profile">
              Profilo
            </TabsTrigger>
          )}
          <TabsTrigger value="addresses">
            Indirizzi
          </TabsTrigger>
          <TabsTrigger value="settings">
            Impostazioni
          </TabsTrigger>
        </TabsList>

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
                    <Label>Notifiche email ordini</Label>
                    <p className="text-sm text-gray-600">
                      Ricevi aggiornamenti sui tuoi ordini via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={handleEmailNotificationsChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Salva carrello tra sessioni</Label>
                    <p className="text-sm text-gray-600">
                      Mantieni i prodotti nel carrello quando chiudi il browser
                    </p>
                  </div>
                  <Switch
                    checked={cartPersistence}
                    onCheckedChange={handleCartPersistenceChange}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Accessibilità</h3>

                <div className="space-y-3">
                  <div className="space-y-0.5">
                    <Label>Modalità per daltonici</Label>
                    <p className="text-sm text-gray-600">
                      Attiva contrasti e colori migliorati per l'accessibilità
                    </p>
                  </div>
                  <Select value={colorblindMode} onValueChange={handleColorblindModeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORBLIND_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Sicurezza account</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email account</Label>
                    <Input value={user?.email} disabled className="bg-gray-50" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Cambia password
                  </Button>

                  {!isAdmin && (
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Elimina account
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Cambio Password */}
      <Dialog open={showPasswordModal} onOpenChange={(open) => {
        setShowPasswordModal(open);
        if (!open) setResetEmailSent(false);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cambia password</DialogTitle>
            <DialogDescription>
              {resetEmailSent
                ? "Controlla la tua casella di posta"
                : "Ti invieremo un'email per reimpostare la password"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {resetEmailSent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Email inviata!</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Abbiamo inviato un link a <strong>{user?.email}</strong>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Clicca sul link nell'email per reimpostare la tua password.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Invieremo un'email a <strong>{user?.email}</strong> con un link per reimpostare la password.
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            {resetEmailSent ? (
              <Button
                onClick={() => setShowPasswordModal(false)}
                className="bg-[#FFD100] text-black hover:bg-[#e6bc00]"
              >
                Chiudi
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                  Annulla
                </Button>
                <Button
                  onClick={handleSendResetEmail}
                  disabled={sendingResetEmail}
                  className="bg-[#FFD100] text-black hover:bg-[#e6bc00]"
                >
                  {sendingResetEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    "Invia email"
                  )}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Elimina Account */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Elimina account</DialogTitle>
            <DialogDescription>
              Questa azione è irreversibile. Tutti i tuoi dati verranno eliminati permanentemente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                Per confermare l'eliminazione, inserisci la tua password.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deletePassword">Password</Label>
              <div className="relative">
                <Input
                  id="deletePassword"
                  type={showDeletePassword ? "text" : "password"}
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowDeletePassword(!showDeletePassword)}
                >
                  {showDeletePassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Annulla
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deletingAccount}
            >
              {deletingAccount ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminazione...
                </>
              ) : (
                "Elimina definitivamente"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
