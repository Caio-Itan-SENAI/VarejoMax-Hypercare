const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const pedidos = [
  { id: 1001, cliente: "Cliente Exemplo", status: "Em separação", total: 129.90 },
  { id: 1002, cliente: "Cliente Demonstração", status: "Enviado", total: 249.50 }
];

app.get("/api/pedidos", (req, res) => {
  // Falha reproduzível para o exercício BUG-002.
  if (req.query.erro === "1") {
    return res.status(500).json({ erro: "Erro interno ao consultar pedidos." });
  }
  res.json({ pedidos });
});

app.post("/api/pagamento", (req, res) => {
  const { pedidoId, codigoTeste } = req.body || {};

  if (!pedidoId) {
    return res.status(400).json({ erro: "Informe o número do pedido." });
  }

  // Falha reproduzível para o exercício BUG-001.
  if (codigoTeste === "FALHA") {
    return res.status(503).json({ erro: "Pagamento temporariamente indisponível." });
  }

  res.json({
    aprovado: true,
    pedidoId,
    mensagem: "Pagamento de demonstração aprovado. Nenhuma cobrança real foi realizada."
  });
});

app.listen(PORT, () => {
  console.log(`VarejoMax disponível em http://localhost:${PORT}`);
});
