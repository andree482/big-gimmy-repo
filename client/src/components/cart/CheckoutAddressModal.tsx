import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Plus, Loader2, Home, Edit } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: number;
  firstName?: string;
  lastName?: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
  isDefault: boolean;
}

interface CheckoutAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (addressId: number, notes: string) => void;
  cartTotal: number;
}

export function CheckoutAddressModal({
  isOpen,
  onClose,
  onConfirm,
  cartTotal,
}: CheckoutAddressModalProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Form per nuovo indirizzo
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "Italia",
  });

  // Carica indirizzi quando il modal si apre
  useEffect(() => {
    if (isOpen) {
      loadAddresses();
    }
  }, [isOpen]);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest("GET", "/api/addresses");
      const addressList = Array.isArray(data) ? data : [];
      setAddresses(addressList);

      // Seleziona l'indirizzo predefinito o il primo disponibile
      const defaultAddr = addressList.find((a: Address) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else if (addressList.length > 0) {
        setSelectedAddressId(addressList[0].id);
      } else {
        // Nessun indirizzo, mostra il form per crearne uno
        setShowNewAddressForm(true);
      }
    } catch (error) {
      console.error("Errore caricamento indirizzi:", error);
      setAddresses([]);
      setShowNewAddressForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNewAddress = async () => {
    // Validazione
    if (!newAddress.address || !newAddress.city || !newAddress.postalCode || !newAddress.province) {
      toast({
        title: "Campi obbligatori",
        description: "Compila tutti i campi dell'indirizzo",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const result = await apiRequest("POST", "/api/addresses", {
        firstName: newAddress.firstName,
        lastName: newAddress.lastName,
        address: newAddress.address,
        city: newAddress.city,
        postalCode: newAddress.postalCode,
        province: newAddress.province,
        country: newAddress.country,
        isDefault: addresses.length === 0, // Primo indirizzo diventa predefinito
      });

      if (result?.address?.id || result?.id) {
        const newId = result?.address?.id || result?.id;
        await loadAddresses();
        setSelectedAddressId(newId);
        setShowNewAddressForm(false);
        setNewAddress({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          postalCode: "",
          province: "",
          country: "Italia",
        });
        toast({
          title: "Indirizzo salvato",
          description: "Il nuovo indirizzo è stato aggiunto",
        });
      }
    } catch (error) {
      console.error("Errore salvataggio indirizzo:", error);
      toast({
        title: "Errore",
        description: "Impossibile salvare l'indirizzo",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedAddressId) {
      toast({
        title: "Seleziona un indirizzo",
        description: "Devi selezionare un indirizzo di spedizione",
        variant: "destructive",
      });
      return;
    }
    onConfirm(selectedAddressId, notes);
  };

  const formatAddress = (addr: Address) => {
    const parts = [addr.address, addr.postalCode, addr.city, addr.province];
    return parts.filter(Boolean).join(", ");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#FFD100]" />
            Indirizzo di Spedizione
          </DialogTitle>
          <DialogDescription>
            Seleziona o aggiungi un indirizzo per la consegna del tuo ordine
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#FFD100]" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Lista indirizzi esistenti */}
            {!showNewAddressForm && addresses.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">I tuoi indirizzi</Label>
                <RadioGroup
                  value={selectedAddressId?.toString() || ""}
                  onValueChange={(value) => setSelectedAddressId(Number(value))}
                >
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        selectedAddressId === addr.id
                          ? "border-[#FFD100] bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedAddressId(addr.id)}
                    >
                      <RadioGroupItem value={addr.id.toString()} id={`addr-${addr.id}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-gray-500" />
                          {addr.firstName && addr.lastName && (
                            <span className="font-medium">
                              {addr.firstName} {addr.lastName}
                            </span>
                          )}
                          {addr.isDefault && (
                            <span className="text-xs bg-[#FFD100] text-black px-2 py-0.5 rounded-full">
                              Predefinito
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatAddress(addr)}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setShowNewAddressForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi nuovo indirizzo
                </Button>
              </div>
            )}

            {/* Form nuovo indirizzo */}
            {showNewAddressForm && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    {addresses.length === 0 ? "Inserisci il tuo indirizzo" : "Nuovo indirizzo"}
                  </Label>
                  {addresses.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewAddressForm(false)}
                    >
                      Annulla
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-xs">Nome</Label>
                    <Input
                      id="firstName"
                      value={newAddress.firstName}
                      onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                      placeholder="Mario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-xs">Cognome</Label>
                    <Input
                      id="lastName"
                      value={newAddress.lastName}
                      onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                      placeholder="Rossi"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-xs">Indirizzo *</Label>
                  <Input
                    id="address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    placeholder="Via Roma, 123"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="city" className="text-xs">Città *</Label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      placeholder="Torino"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-xs">CAP *</Label>
                    <Input
                      id="postalCode"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                      placeholder="10100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="province" className="text-xs">Provincia *</Label>
                    <Input
                      id="province"
                      value={newAddress.province}
                      onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                      placeholder="TO"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-xs">Paese</Label>
                    <Input
                      id="country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      placeholder="Italia"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={handleSaveNewAddress}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvataggio...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Salva indirizzo
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Campo note */}
            {!showNewAddressForm && addresses.length > 0 && (
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Note per la spedizione (opzionale)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Es: Citofono 'Rossi', lasciare al portiere, consegnare dopo le 18..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Annulla
          </Button>
          {!showNewAddressForm && addresses.length > 0 && (
            <Button
              onClick={handleConfirm}
              disabled={!selectedAddressId}
              className="w-full sm:w-auto bg-[#FFD100] hover:bg-[#e6bc00] text-black font-semibold"
            >
              Procedi al Pagamento - €{cartTotal.toFixed(2)}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
