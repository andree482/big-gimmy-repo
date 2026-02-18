import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { stores } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

const REQUEST_TYPES = [
  { value: "informazioni", label: "Informazioni generali" },
  { value: "prodotti", label: "Informazioni sui prodotti" },
  { value: "ordine", label: "Informazioni su un ordine" },
  { value: "richiesta_di_rimborso", label: "Richiesta di rimborso" },
  { value: "altro", label: "Altro" },
];

const contactSchema = z.object({
  name: z.string().min(3, { message: "Il nome deve essere di almeno 3 caratteri." }),
  email: z.string().email({ message: "Inserisci un indirizzo email valido." }),
  phone: z.string().min(5, { message: "Inserisci un numero di telefono valido." }),
  requestType: z.string().default("informazioni"),
  orderId: z.string().optional(),
  message: z.string().min(10, { message: "Il messaggio deve essere di almeno 10 caratteri." }),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Devi accettare la Privacy Policy per continuare.",
  }),
}).refine((data) => {
  if (data.requestType === "richiesta_di_rimborso" && (!data.orderId || data.orderId.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Inserisci il numero dell'ordine per la richiesta di rimborso.",
  path: ["orderId"],
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      requestType: "informazioni",
      orderId: "",
      message: "",
      privacy: false,
    },
  });

  const selectedRequestType = watch("requestType");

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: (response) => {
      // Verifico lo stato dell'invio email
      const emailStatus = response.emailStatus || { 
        adminNotified: false, 
        userConfirmationSent: false,
        simulationMode: false
      };
      
      // Se è una richiesta di rimborso, mostra messaggio specifico
      if (response.message?.includes('rimborso')) {
        toast({
          title: "Richiesta di rimborso inviata!",
          description: "Abbiamo ricevuto la tua richiesta di rimborso. Ti risponderemo entro 48 ore lavorative.",
        });
        reset();
        setSubmitting(false);
        return;
      }

      // Se siamo in modalità simulazione, mostriamo un messaggio appropriato
      if (emailStatus.simulationMode) {
        toast({
          title: "Messaggio ricevuto in modalità simulazione",
          description: `Il tuo messaggio è stato salvato correttamente! In modalità di test non vengono inviate email reali, ma i dati vengono comunque salvati nel sistema.`,
        });
      } else if (emailStatus.adminNotified && emailStatus.userConfirmationSent) {
        toast({
          title: "Messaggio inviato con successo!",
          description: `Grazie per averci contattato! Ti abbiamo inviato un'email di conferma. Ti risponderemo al più presto.`,
        });
      } else if (emailStatus.adminNotified) {
        toast({
          title: "Messaggio ricevuto",
          description: "Abbiamo ricevuto il tuo messaggio, ma potrebbe esserci un problema con l'invio dell'email di conferma.",
        });
      } else {
        toast({
          title: "Messaggio salvato",
          description: "Il tuo messaggio è stato salvato, ma c'è stato un problema con il sistema di notifica. Ti contatteremo comunque al più presto.",
          variant: "default",
        });
      }
      
      reset();
      setSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Errore",
        description: `Si è verificato un errore: ${error.message}`,
        variant: "destructive",
      });
      setSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      {/* Contact Hero */}
      <section className="bg-[#212121] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            <span className="text-[#FFD100]">Contattaci</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            Hai domande sui nostri prodotti o vuoi ricevere una consulenza personalizzata? Compila il form sottostante e ti risponderemo al più presto.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contatti" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-3xl font-montserrat font-bold mb-6">
                Inviaci un <span className="text-[#FFD100]">Messaggio</span>
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-montserrat font-semibold mb-2">
                    Nome e Cognome
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full px-4 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD100]`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-montserrat font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD100]`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block font-montserrat font-semibold mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-4 py-2 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD100]`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="requestType" className="block font-montserrat font-semibold mb-2">
                    Tipo di Richiesta
                  </label>
                  <select
                    id="requestType"
                    {...register("requestType")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD100] bg-white"
                  >
                    {REQUEST_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                {(selectedRequestType === "richiesta_di_rimborso" || selectedRequestType === "ordine") && (
                  <div className="mb-4">
                    <label htmlFor="orderId" className="block font-montserrat font-semibold mb-2">
                      Numero Ordine {selectedRequestType === "richiesta_di_rimborso" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      id="orderId"
                      placeholder="Es. AB12CD34"
                      {...register("orderId")}
                      className={`w-full px-4 py-2 border ${
                        errors.orderId ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD100]`}
                    />
                    {errors.orderId && (
                      <p className="text-red-500 text-sm mt-1">{errors.orderId.message}</p>
                    )}
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="message" className="block font-montserrat font-semibold mb-2">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className={`w-full px-4 py-2 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD100]`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("privacy")}
                      className={`mr-2 ${errors.privacy ? "border-red-500" : ""}`}
                    />
                    <span className="text-sm">
                      Ho letto e accetto la{" "}
                      <Link href="/privacy-policy" className="text-[#FFD100] hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-[#FFD100] hover:bg-yellow-500 text-[#212121] font-montserrat font-bold px-6 py-3 rounded-md transition-all ${
                    submitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "Invio in corso..." : "Invia Messaggio"}
                </button>
              </form>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-[#F5F5F5] p-8 rounded-lg">
                <h3 className="font-montserrat font-bold text-xl mb-6">
                  Informazioni di Contatto
                </h3>

                {stores.map((store, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-montserrat font-semibold text-lg mb-2">{store.name}</h4>
                    <p className="mb-1 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-[#FFD100]" /> {store.address}
                    </p>
                    <p className="mb-1 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-[#FFD100]" /> {store.phone}
                    </p>

                    <p className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-[#FFD100] mt-1" /> 
                      <span style={{ whiteSpace: "pre-line" }}>{store.hours}</span>
                    </p>
                  </div>
                ))}

                <div>
                  <h4 className="font-montserrat font-semibold text-lg mb-2">
                    Seguici sui Social
                  </h4>
                  <div className="flex space-x-4">
                    <a href="https://www.facebook.com/p/BIG-GIMMY-Integratori-100063525402348/" target="_blank" rel="noopener noreferrer" className="text-[#212121] hover:text-[#FFD100] transition-all">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/biggimmyintegratori/" target="_blank" rel="noopener noreferrer" className="text-[#212121] hover:text-[#FFD100] transition-all">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-[#212121] hover:text-[#FFD100] transition-all">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;