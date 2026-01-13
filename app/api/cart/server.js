import express from "express";
import cartRoutes from "./api/cart/cartRoutes.js";

const app = express();
app.use(express.json());

// Attiva routes del carrello:
app.use("/api/cart", cartRoutes);

app.listen(5000, () => console.log("Server attivo su http://localhost:8080"));