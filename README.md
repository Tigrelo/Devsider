# 📲 Disparador WhatsApp com Fluxos Automáticos

Projeto desenvolvido como desafio técnico para implementação de um sistema de disparo de mensagens com suporte a campanhas e fluxos automáticos, utilizando Node.js, Prisma ORM e SQLite.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- Multer (upload CSV)
- csv-parser
- Worker assíncrono (processamento contínuo)

---

## 🏗 Arquitetura do Sistema

O sistema é dividido em:

### 🔹 API (Backend)
Responsável por:
- Gerenciar contatos
- Criar campanhas
- Criar fluxos e etapas
- Agendar envios na fila
- Importar contatos via CSV

### 🔹 Worker
Processo separado responsável por:
- Verificar mensagens pendentes na fila
- Executar envios automaticamente
- Processar execuções de fluxo
- Garantir funcionamento independente do navegador

O envio de WhatsApp está mockado via `console.log`, podendo ser facilmente integrado ao WPPConnect.

---

## 📦 Estrutura do Banco de Dados

Tabelas principais:

- Contato
- Campanha
- FilaEnvio
- Fluxo
- FluxoEtapa
- ExecucaoFluxo

Relacionamentos e constraints importantes:

- `telefone` é único
- `@@unique([fluxoId, ordem])`
- `@@unique([contatoId, fluxoId])`
- Índice em `FilaEnvio(status, agendadoPara)`

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Configurar ambiente

Crie um arquivo `.env` na raiz:

```
DATABASE_URL="file:./dev.db"
```

### 3️⃣ Rodar migrações

```bash
npx prisma migrate dev
```

### 4️⃣ Rodar API

```bash
npm run dev
```

### 5️⃣ Rodar Worker (em outro terminal)

```bash
npm run worker
```

---

## 📌 Endpoints Principais

### 👤 Contatos

Criar contato:

```
POST /contatos
```

Listar contatos:

```
GET /contatos
```

Importar CSV:

```
POST /contatos/importar
```

Formato CSV esperado:

```
nome,telefone
Joao,5531999999999
Maria,5531888888888
```

---

### 📢 Campanhas

Criar campanha:

```
POST /campanhas
```

Disparar campanha:

```
POST /campanhas/:id/disparar
```

---

### 🔄 Fluxos

Criar fluxo:

```
POST /fluxos
```

Criar etapa:

```
POST /fluxos/:id/etapas
```

Adicionar contatos ao fluxo:

```
POST /fluxos/:id/adicionar-contatos
```

---

## 🔁 Funcionamento do Worker

O worker roda continuamente e:

- Busca execuções de fluxo com `proximaExecucao <= agora`
- Cria registros na `FilaEnvio`
- Busca envios pendentes
- Marca como `enviado`
- Finaliza fluxos automaticamente

Processamento assíncrono com persistência no banco.

---

## 🎯 Regras Atendidas do Desafio

✔ Backend com persistência  
✔ Execução automática independente do navegador  
✔ Processamento assíncrono  
✔ Fila persistente  
✔ Cada contato executa fluxo individual  
✔ Não utiliza setTimeout isolado para controle total  
✔ Não executa disparos no controller  

---

## 🧠 Observações Técnicas

- Envio WhatsApp está mockado
- Sistema preparado para integração com WPPConnect
- Banco SQLite facilita execução local
- Arquitetura separada em controllers, services e worker

---

## 👨‍💻 Autor

Isaac Ferreira Rodrigues
