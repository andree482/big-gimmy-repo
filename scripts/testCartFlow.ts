const base = "http://localhost:5000";

async function main() {
  const loginResp = await fetch(base + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@example.com", password: "XNCahKl09P!298Gq20LkAns!1" })
  });
  const cookie = loginResp.headers.get("set-cookie") || "";
  const meResp = await fetch(base + "/api/auth/me", { headers: { cookie } });
  const me = await meResp.json();
  const optsResp = await fetch(base + "/api/product/75-protein-bar/options", { headers: { cookie } });
  const opts = await optsResp.json();
  const opt = Array.isArray(opts) ? opts.find((o: any) => o.size === "75g") : null;
  const addResp = await fetch(base + "/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ product_option_id: opt?.id, quantity: 2 })
  });
  const cartResp = await fetch(base + "/api/cart/" + (me?.user?.id ?? ""), { headers: { cookie } });
  const cart = await cartResp.json();
  console.log(JSON.stringify({ loginStatus: loginResp.status, me, addStatus: addResp.status, cart }, null, 2));
}

main().catch((e) => {
  console.log(JSON.stringify({ error: String(e) }));
});
