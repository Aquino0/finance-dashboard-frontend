# Finance Dashboard MVP - Frontend

Frontend da aplicação Finance Dashboard MVP, construído com **React** + **Vite** e estilizado com **CSS moderno**, integrando-se com o backend em FastAPI para exibir cotações e gráficos de ações e moedas.

## 📊 Funcionalidades

- Consulta de preços e variações de ações (ex: AAPL, URPR11)
- Consulta de cotações de moedas (ex: USDBRL)
- Gráfico histórico de 90 dias (Recharts)
- Sugestão de códigos com tecla Enter
- Estilização responsiva e moderna
- Integração direta com API REST do backend

## 🤨 Tecnologias utilizadas

- React 18
- Vite
- Recharts
- CSS puro (personalizado)
- Docker

---

## ⚖️ Instalação e execução do frontend (localmente)

### 1. Acesse a pasta do projeto:
```bash
cd frontend
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Rode o projeto:
```bash
npm run dev
```

> Por padrão o frontend roda em: http://localhost:5173

> Certifique-se de que o backend está rodando em http://localhost:8000

---

## 🚧 Docker (execução via container)

Se preferir executar o projeto com Docker, use os comandos abaixo:

```bash
# A partir da raiz do projeto (onde está o docker-compose.yml)
docker-compose up --build
```

- Frontend acessível em: http://localhost:3000
- Backend acessível em: http://localhost:8000

---

## 📈 Fluxo da aplicação

![Fluxo do Frontend](../docs/fluxo-frontend.png)

> O frontend envia requisições para o backend, que busca dados via API pública (yfinance ou awesomeapi) e devolve os resultados para exibição.

---

## 👤 Autor

**Cristopher Aquino**  
[LinkedIn](https://www.linkedin.com/in/%F0%9F%8E%AF-cristopher-aquino-4992b251/)  
Contato: (21) 98005-9430

---

## 🌐 Considerações

- Todos os dados exibidos são consumidos de fontes **públicas**.
- O frontend foi projetado para ser **intuitivo**, responsivo e de fácil leitura.
- Requisições e erros são tratados para garantir boa experiência ao usuário.

---

Para o backend, veja o arquivo [`backend/README.md`](../backend/README.md).

---
