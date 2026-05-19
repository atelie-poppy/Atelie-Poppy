import { useEffect, useMemo, useState } from "react";

export default function App() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [carrinho, setCarrinho] = useState([]);

  // 🔐 ADMIN
  const [admin, setAdmin] = useState(false);
  const [senha, setSenha] = useState("");

  const [produtos, setProdutos] = useState(() => {
    const saved = localStorage.getItem("produtos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, nome: "Kit Mini", preco: 149.9, tipo: "fisico" },
          { id: 2, nome: "Kit P", preco: 229.9, tipo: "fisico" },
          { id: 3, nome: "Kit M", preco: 349.9, tipo: "fisico" },
          { id: 4, nome: "Kit Digital", preco: 25, tipo: "digital" }
        ];
  });

  const [novo, setNovo] = useState({
    nome: "",
    preco: "",
    tipo: "fisico"
  });

  const PIX = "046.095.265-06";
  const WHATS = "5511983273805";

  // 💾 salvar automático
  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

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

    return `https://wa.me/${WHATS}?text=Olá! Meu nome é ${nome}%0A%0AQuero:%0A${lista}%0A%0ATotal: R$${total.toFixed(2)}`;
  }

  // 🔐 login admin
  function login() {
    if (senha === "1234") setAdmin(true);
    else alert("Senha errada");
  }

  // ➕ adicionar produto
  function addProduto() {
    if (!novo.nome || !novo.preco) return;

    setProdutos([
      ...produtos,
      {
        id: Date.now(),
        nome: novo.nome,
        preco: parseFloat(novo.preco),
        tipo: novo.tipo
      }
    ]);

    setNovo({ nome: "", preco: "", tipo: "fisico" });
  }

  // ❌ remover
  function remover(id) {
    setProdutos(produtos.filter(p => p.id !== id));
  }

  return (
    <div style={{
      fontFamily: "Poppins",
      background: "#fff",
      minHeight: "100vh"
    }}>

      {/* HEADER */}
      <div style={{
        textAlign: "center",
        padding: 20
      }}>
        <h1 style={{
          fontFamily: "Fredoka",
          color: "#E4572E",
          margin: 0
        }}>
          🎀 Ateliê <span style={{ color: "#2A9D8F" }}>Poppy</span>
        </h1>

        <p style={{ color: "#1D3557" }}>
          papelaria afetiva personalizada
        </p>
      </div>

      {/* LOGIN ADMIN */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
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

      {/* ADMIN PAINEL */}
      {admin && (
        <div style={{
          margin: 15,
          padding: 15,
          border: "2px dashed #E4572E",
          borderRadius: 12
        }}>
          <h3>➕ Adicionar produto</h3>

          <input
            placeholder="Nome"
            value={novo.nome}
            onChange={e => setNovo({ ...novo, nome: e.target.value })}
          />

          <input
            placeholder="Preço"
            value={novo.preco}
            onChange={e => setNovo({ ...novo, preco: e.target.value })}
          />

          <select
            value={novo.tipo}
            onChange={e => setNovo({ ...novo, tipo: e.target.value })}
          >
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
          onChange={e => setNome(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd"
          }}
        />
      </div>

      {/* CATEGORIAS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 10
      }}>
        <button onClick={() => setCategoria("todos")}>Todos</button>
        <button onClick={() => setCategoria("fisico")}>Físicos</button>
        <button onClick={() => setCategoria("digital")}>Digitais</button>
      </div>

      {/* PRODUTOS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 12,
        padding: 15,
        background: "rgba(168,218,220,0.15)"
      }}>
        {filtrados.map(p => (
          <div key={p.id} style={{
            background: "#fff",
            borderRadius: 18,
            padding: 10,
            border: "1px solid #eee"
          }}>
            <h3 style={{ color: "#1D3557" }}>{p.nome}</h3>
            <p style={{ color: "#E4572E", fontWeight: "bold" }}>
              R$ {p.preco.toFixed(2)}
            </p>

            <button
              onClick={() => addCarrinho(p)}
              style={{
                background: "#E4572E",
                color: "white",
                width: "100%",
                padding: 10,
                borderRadius: 50,
                border: "none"
              }}
            >
              Adicionar
            </button>

            {admin && (
              <button
                onClick={() => remover(p.id)}
                style={{
                  marginTop: 5,
                  color: "red",
                  background: "transparent",
                  border: "none"
                }}
              >
                Remover
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CARRINHO */}
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#fff",
        padding: 12,
        borderTop: "1px solid #ddd"
      }}>
        <p>🛒 Total: R$ {total.toFixed(2)}</p>

        <a
          href={whatsapp()}
          target="_blank"
          style={{
            display: "block",
            textAlign: "center",
            background: "#25D366",
            color: "white",
            padding: 12,
            borderRadius: 12,
            textDecoration: "none"
          }}
        >
          Finalizar no WhatsApp
        </a>

        <p style={{ fontSize: 12, marginTop: 5 }}>
          PIX: {PIX}
        </p>
      </div>

    </div>
  );
}
