import { useMemo, useState } from "react";

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("todos");

  const PIX = "046.095.265-06";
  const WHATS = "5511983273805";

  const produtos = [
    // 🎀 FÍSICOS
    { id: 1, nome: "Kit Mini", preco: 149.9, tipo: "fisico" },
    { id: 2, nome: "Kit P", preco: 229.9, tipo: "fisico" },
    { id: 3, nome: "Kit M", preco: 349.9, tipo: "fisico" },
    { id: 4, nome: "Kit G", preco: 499.9, tipo: "fisico" },

    // 💻 DIGITAIS
    { id: 5, nome: "Kit Digital Mini", preco: 25, tipo: "digital" },
    { id: 6, nome: "Kit Digital P", preco: 45, tipo: "digital" },
    { id: 7, nome: "Kit Digital M", preco: 65, tipo: "digital" },
    { id: 8, nome: "Kit Digital G", preco: 85, tipo: "digital" }
  ];

  const filtrados = produtos.filter((p) => {
    if (categoria === "todos") return true;
    return p.tipo === categoria;
  });

  const total = useMemo(
    () => carrinho.reduce((a, i) => a + i.preco, 0),
    [carrinho]
  );

  function add(item) {
    setCarrinho([...carrinho, item]);
  }

  function whatsapp() {
    const lista = carrinho.map(i => `• ${i.nome}`).join("%0A");

    return `https://wa.me/${WHATS}?text=Olá! Meu nome é ${nome}%0A%0AQuero:%0A${lista}%0A%0ATotal: R$${total}`;
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>

      <h1>🎀 Ateliê Poppy</h1>

      {/* 👤 NOME */}
      <input
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      {/* 🔘 BOTÕES DE CATEGORIA */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setCategoria("todos")}>Todos</button>
        <button onClick={() => setCategoria("fisico")}>Físicos</button>
        <button onClick={() => setCategoria("digital")}>Digitais</button>
      </div>

      <h2>Produtos</h2>

      {/* 🛍 PRODUTOS FILTRADOS */}
      {filtrados.map(p => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <p>
            {p.nome} - R$ {p.preco}
          </p>

          <button onClick={() => add(p)}>
            Adicionar
          </button>
        </div>
      ))}

      <hr />

      <p>🛒 Total: R$ {total}</p>
      <p>PIX: {PIX}</p>

      <a href={whatsapp()} target="_blank">
        Finalizar no WhatsApp
      </a>

    </div>
  );
}