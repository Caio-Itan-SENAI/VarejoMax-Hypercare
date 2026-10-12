const estado = document.querySelector("#estado");
const areaPedidos = document.querySelector("#pedidos");

async function carregarPedidos(url = "/api/pedidos") {
  estado.textContent = "Consultando pedidos...";
  areaPedidos.innerHTML = "";
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    if (!resposta.ok) {
      estado.textContent = `Falha ao carregar pedidos (HTTP ${resposta.status}).`;
      return;
    }
    estado.textContent = `${dados.pedidos.length} pedido(s) encontrado(s).`;
    dados.pedidos.forEach((pedido) => {
      const card = document.createElement("article");
      card.className = "pedido";
      card.innerHTML = `
        <h3>Pedido #${pedido.id}</h3>
        <p><strong>Cliente:</strong> ${pedido.cliente}</p>
        <p><strong>Status:</strong> ${pedido.status}</p>
        <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2).replace(".", ",")}</p>
      `;
      areaPedidos.appendChild(card);
    });
  } catch {
    estado.textContent = "Não foi possível conectar à API local.";
  }
}

document.querySelector("#atualizar").addEventListener("click", () => carregarPedidos());

document.querySelector("#pagar").addEventListener("click", async () => {
  const resultado = document.querySelector("#resultadoPagamento");
  resultado.textContent = "Enviando solicitação de teste...";
  try {
    const resposta = await fetch("/api/pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pedidoId: Number(document.querySelector("#pedidoId").value),
        codigoTeste: document.querySelector("#codigoTeste").value
      })
    });
    const dados = await resposta.json();
    resultado.textContent = `${resposta.ok ? "Sucesso" : "Falha"} (HTTP ${resposta.status}): ${dados.mensagem || dados.erro}`;
  } catch {
    resultado.textContent = "Não foi possível conectar à API local.";
  }
});

document.querySelector("#consultarNormal").addEventListener("click", async () => {
  const resposta = await fetch("/api/pedidos");
  document.querySelector("#resultadoApi").textContent =
    `HTTP ${resposta.status}\n${JSON.stringify(await resposta.json(), null, 2)}`;
});

document.querySelector("#consultarErro").addEventListener("click", async () => {
  const resposta = await fetch("/api/pedidos?erro=1");
  document.querySelector("#resultadoApi").textContent =
    `HTTP ${resposta.status}\n${JSON.stringify(await resposta.json(), null, 2)}`;
});

carregarPedidos();
