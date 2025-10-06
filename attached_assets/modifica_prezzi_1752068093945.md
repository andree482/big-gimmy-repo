
---

📦 **Prompt per Replit – Correzioni finali su BigGimmyIntegratori.it**

Ciao! Segui **esattamente quanto descritto**, mantenendo l’integrità del database prodotti e dell’esperienza utente:

---

### ✅ 1. **Cambio nome prodotto**

* Il prodotto attualmente chiamato `HydroBV 90` deve essere **rinominato in tutto il sito e nel database in:**
  **`Hydrolyzed 104 DH4`**
* Cambialo ovunque: codice, oggetti, titoli, visualizzazione nelle categorie e pagine prodotto.

---

### 🚫 2. **Eliminazione definitiva di prodotti (completa e permanente)**

I seguenti prodotti devono essere **rimossi da TUTTE le sezioni** del sito e **dal codice**:

> **Elimina completamente da:**
>
> * `ProductVariant.ts`
> * `ProductDetail.tsx`
> * `ProductCategory.tsx`
> * Eventuali JSON, array o sorgenti correlate
> * Interfacce, dati e visualizzazioni frontend

**Lista prodotti da rimuovere:**

```
Glutamass  
Norincol  
Volamin BCAA  
Volamin Powder  
Burro di Arachidi Croccante  
Energize Advanced  
NergyFuel  
Grissini Proteici  
High Protein Shake  
Nocciola Crema Proteica  
Oatmeal PRO  
Perfect Cream  
Pistacchio Crema Proteica  
Powergel  
Premier Pancake  
Calcio 650  
Calcium  
Echinacea Purpurea  
Hard C Life Plus 1000  
Megavis 110mg Tablet  
Norincol Marine Collagen  
Olio di Lino  
Omega Complete Krill  
Star Gel+  
Vitamin D 2000 IU  
Vitamin D 800 IU  
Vitamin C 1000  
Creatyl  
Liquid Carbo+ Flash 80  
Leggings Donna WHY Sport
```

⚠️ **Assicurati che non compaiano in nessun punto visibile né vengano più letti dal backend.**

---

### 🟡 3. **Copertine dei prodotti – Prezzo minimo**

* Sulle **copertine visibili nelle categorie**, il prezzo in giallo deve essere **il prezzo più basso disponibile tra tutte le varianti del prodotto**, calcolato da `ProductVariant.ts`.
* **MODIFICA I PREZZI SOLO NELLE COPERTINE**
* **Non modificare** i prezzi delle varianti né quelli nelle schede prodotto.
* Solo il **prezzo visibile sulla card** deve essere aggiornato con il **minimo disponibile**.

🧠 Esempio:
Se un prodotto ha 3 varianti a 12.90€, 15.90€ e 9.90€, sulla **copertina dovrà mostrare 9.90€** (in giallo).

---

### 🔒 Requisiti

* Non cambiare o sovrascrivere strutture già funzionanti.
* Assicurati che la **navigazione, le pagine prodotto e Snipcart funzionino normalmente** dopo queste modifiche.
* Usa i dati esistenti. Non duplicare codice. Mantieni tutto coerente e pulito.

---

Se tutto è chiaro, puoi procedere. Fammi sapere quando è completato!
