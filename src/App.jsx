import { useMemo, useState } from "react";

export default function App() {
  const [nome, setNome] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [categoria, setCategoria] = useState("todos");

  // 🔐 ADMIN
  const [admin, setAdmin] = useState(false);
  const [senha, setSenha] = useState("");

  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Kit Mini", preco: 149.9, tipo: "fisico", img: "https://via.placeholder.com/300" },
    { id: 2, nome: "Kit P", preco: 229.9, tipo: "fisico", img: "https://via.placeholder.com/300" },
    { id: 3, nome: "Kit M", preco: 349.9, tipo: "fisico", img: "https://via.placeholder.com/300" },
    { id: 4, nome: "Kit Digital Mini", preco: 25, tipo: "digital", img: "https://via.placeholder.com/300" }
  ]);

  const [novo, setNovo] = useState({
    nome: "",
    preco: "",
    tipo: "fisico",
    img: ""
  });

  const PIX = "046.095.265-06";
  const WHATS = "5511983273805";

  const filtrados = produtos.filter(p =>
    categoria === "todos" ? true : p.tipo === categoria
  );

  const total = useMemo(
    () => carrinho.reduce((a, i) => a + i.preco, 0),
    [carrinho]
  );

  function addCarrinho(item) {
    setCarrinho([...carrinho, item]);
  }

  function whatsapp() {
    const lista = carrinho.map(i => `• ${i.nome}`).join("%0A");

    return `https://wa.me/${WHATS}?text=Olá! Meu nome é ${nome}%0A%0AQuero:%0A${lista}%0A%0ATotal: R$${total}`;
  }

  // 🔐 login admin simples
  function login() {
    if (senha === "1234") setAdmin(true);
    else alert("Senha errada");
  }

  // ➕ adicionar produto
  function addProduto() {
    setProdutos([
      ...produtos,
      {
        id: Date.now(),
        nome: novo.nome,
        preco: parseFloat(novo.preco),
        tipo: novo.tipo,
        img: novo.img || "https://via.placeholder.com/300"
      }
    ]);

    setNovo({ nome: "", preco: "", tipo: "fisico", img: "" });
  }

  return (
    <div style={{ fontFamily: "Arial", background: "#fff7fb", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(90deg,#ff4d8d,#ff8fb3)",
        color: "white",
        padding: 25,
        textAlign: "center"
      }}>
        <h1>🎀 Ateliê Poppy</h1>
        <p>Personalizados que encantam festas</p>
      </div>

      {/* LOGIN ADMIN */}
      <div style={{ padding: 10, textAlign: "center" }}>
        {!admin ? (
          <>
            <input
              placeholder="Senha admin"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{ padding: 8 }}
            />
            <button onClick={login}>Entrar</button>
          </>
        ) : (
          <p style={{ color: "green" }}>🔐 Admin ativo</p>
        )}
      </div>

      {/* ➕ ADMIN PAINEL */}
      {admin && (
        <div style={{
          padding: 15,
          background: "#fff",
          margin: 10,
          borderRadius: 10
        }}>
          <h3>➕ Adicionar produto</h3>

          <input placeholder="Nome" value={novo.nome}
            onChange={e => setNovo({ ...novo, nome: e.target.value })} />

          <input placeholder="Preço" value={novo.preco}
            onChange={e => setNovo({ ...novo, preco: e.target.value })} />

          <input placeholder="Imagem (URL)" value={novo.img}
            onChange={e => setNovo({ ...novo, img: e.target.value })} />

          <select value={novo.tipo}
            onChange={e => setNovo({ ...novo, tipo: e.target.value })}>
            <option value="fisico">Físico</option>
            <option value="digital">Digital</option>
          </select>

          <button onClick={addProduto}>Adicionar</button>
        </div>
      )}

      {/* INPUT NOME */}
      <div style={{ padding: 15 }}>
        <input
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 10 }}
        />
      </div>

      {/* CATEGORIAS */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setCategoria("todos")}>Todos</button>
        <button onClick={() => setCategoria("fisico")}>Físicos</button>
        <button onClick={() => setCategoria("digital")}>Digitais</button>
      </div>

      {/* PRODUTOS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 12,
        padding: 15
      }}>
        {filtrados.map(p => (
          <div key={p.id} style={{
            background: "white",
            borderRadius: 15,
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}>
            <img src={p.img} style={{ width: "100%" }} />

            <div style={{ padding: 10 }}>
              <h3>{p.nome}</h3>
              <p style={{ color: "#ff4d8d", fontWeight: "bold" }}>
                R$ {p.preco}
              </p>

              <button
                onClick={() => addCarrinho(p)}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "#ff4d8d",
                  color: "white",
                  border: "none",
                  borderRadius: 10
                }}
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CARRINHO */}
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "white",
        padding: 12
      }}>
        <p>🛒 Total: R$ {total}</p>
        <p>PIX: {PIX}</p>

        <a
          href={whatsapp()}
          target="_blank"
          style={{
            display: "block",
            background: "#25D366",
            color: "white",
            textAlign: "center",
            padding: 10,
            borderRadius: 10
          }}
        >
          Finalizar no WhatsApp
        </a>
      </div>

    </div>
  );
}
