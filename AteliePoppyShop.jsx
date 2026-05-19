import { useMemo, useState } from "react";

export default function AteliePoppyShop() {
  const [categoria, setCategoria] = useState("todos");
  const [carrinho, setCarrinho] = useState([]);
  const [modalCheckout, setModalCheckout] = useState(false);
  const [cupom, setCupom] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");

  const PIX_KEY = "046.095.265-06";
  const INFINITEPAY_LINK = "https://seu-link-infinitepay-aqui";

  const WHATSAPP_NUMBER = "5511983273805";

  const produtos = [
    {
      id: 1,
      nome: "KIT MINI",
      preco: 149.9,
      tipo: "kit",
      descricao: "Até 10 pessoas",
      imagem: "https://via.placeholder.com/300",
      digital: false,
      itens: ["Topo de bolo", "12 toppers", "12 rostinhos", "12 forminhas", "Bandeirola", "Chapeuzinho"]
    },
    {
      id: 2,
      nome: "KIT DIGITAL - PERSONALIZADO",
      preco: 29.9,
      tipo: "digital",
      descricao: "Arquivos PNG enviados no WhatsApp",
      imagem: "https://via.placeholder.com/300",
      digital: true,
      itens: ["Topo PNG", "Toppers PNG", "Caixinhas PDF", "Bandeirola digital"]
    },
    {
      id: 3,
      nome: "KIT P",
      preco: 229.9,
      tipo: "kit",
      descricao: "Até 20 pessoas",
      imagem: "https://via.placeholder.com/300",
      digital: false,
      itens: ["Topo de bolo", "Toppers sortidos", "Forminhas", "Saias cupcake", "Tags", "Caixinhas"]
    },
    {
      id: 4,
      nome: "KIT M",
      preco: 349.9,
      tipo: "kit",
      descricao: "Até 30 pessoas",
      imagem: "https://via.placeholder.com/300",
      digital: false,
      itens: ["Topo luxo", "Toppers variados", "Forminhas", "Displays", "Convite digital"]
    }
  ];

  const filtrados = categoria === "todos" ? produtos : produtos.filter(p => p.tipo === categoria);

  const total = useMemo(() => {
    let soma = carrinho.reduce((acc, i) => acc + i.preco, 0);

    if (cupom === "POP10") soma *= 0.9;

    return soma;
  }, [carrinho, cupom]);

  function addCarrinho(item) {
    setCarrinho([...carrinho, item]);
  }

  function whatsappMsg() {
    const lista = carrinho.map(i => `• ${i.nome} - R$${i.preco}`).join("%0A");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Meu nome é ${nomeCliente}%0AEmail: ${emailCliente}%0A%0AQuero comprar:%0A${lista}%0A%0ATotal: R$${total.toFixed(2)}`;
  }

  return (
    <div className="min-h-screen bg-pink-50">

      <div className="bg-pink-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">🎀 Ateliê Poppy</h1>
        <p className="text-sm">Kits físicos + Digitais personalizados</p>
      </div>

      <div className="p-3 bg-white space-y-2">
        <input
          placeholder="Seu nome"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Seu WhatsApp ou email"
          value={emailCliente}
          onChange={(e) => setEmailCliente(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto p-3 bg-white">
        {['todos','kit','digital'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className="px-3 py-1 rounded-full border"
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 p-3">
        {filtrados.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow">

            <img src={p.imagem} className="rounded-t-xl" />

            <div className="p-2">
              <h2 className="font-bold text-pink-600">{p.nome}</h2>
              <p className="text-sm text-gray-500">{p.descricao}</p>
              <p className="font-semibold">R$ {p.preco.toFixed(2)}</p>

              {p.digital && (
                <p className="text-xs text-purple-600">📩 Entrega via WhatsApp (PNG/PDF)</p>
              )}

              <button
                onClick={() => addCarrinho(p)}
                className="w-full bg-pink-500 text-white mt-2 py-1 rounded"
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-xl">
        <p>🛒 Itens: {carrinho.length} | Total: R$ {total.toFixed(2)}</p>
        <button
          onClick={() => setModalCheckout(true)}
          className="bg-green-500 text-white w-full py-2 mt-2 rounded"
        >
          Finalizar Pedido
        </button>
      </div>

      {modalCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-xl w-full max-w-md">

            <h2 className="font-bold text-lg mb-2">Finalizar Pedido</h2>

            <div className="bg-gray-100 p-2 rounded mb-2">
              <p className="font-semibold">💳 PIX</p>
              <p className="text-sm break-all">{PIX_KEY}</p>
            </div>

            <div className="bg-gray-100 p-2 rounded mb-2">
              <p className="font-semibold">💳 Cartão</p>
              <a href={INFINITEPAY_LINK} target="_blank" className="text-blue-600 underline">
                Pagar no cartão (InfinitePay)
              </a>
            </div>

            <a
              href={whatsappMsg()}
              target="_blank"
              className="bg-green-500 text-white block text-center py-2 rounded"
            >
              Confirmar Pedido no WhatsApp
            </a>

            <button
              onClick={() => setModalCheckout(false)}
              className="mt-2 w-full bg-gray-300 py-2 rounded"
            >
              Fechar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
