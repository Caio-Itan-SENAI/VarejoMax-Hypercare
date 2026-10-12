# VarejoMax — Projeto de demonstração Git

Projeto acadêmico local para demonstrar controle de versão, branches de hotfix e validação básica.

## Requisitos
- Node.js instalado
- Git instalado

## Instalação
No terminal, dentro desta pasta:

```bash
npm install
npm start
```

Abra http://localhost:3000 no navegador.

## Rotas de demonstração
- `GET /api/pedidos` — lista pedidos.
- `POST /api/pagamento` — endpoint local de demonstração, sem transação financeira real.

O código inicial contém dois comportamentos de falha controlados para permitir reproduzir e corrigir os bugs em branches separadas:
- O pagamento falha quando o campo `codigoTeste` é `FALHA`.
- A API de pedidos retorna erro 500 quando o parâmetro `?erro=1` é informado.

Esses comportamentos são exclusivamente locais e acadêmicos. Nenhum pagamento real é realizado.

## Fluxo de Git planejado
- `main` — versão inicial.
- `hotfix/BUG-001-falha-pagamento` — correção do comportamento de pagamento.
- `hotfix/BUG-002-erro-http-500` — correção do tratamento do erro HTTP 500.

Crie cada branch a partir de `main` e faça commits separados. Não considere um bug corrigido até que o teste correspondente passe.
