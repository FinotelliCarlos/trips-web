## Sua agência de viagens!

### Esta aplicação possibilita a busca por um local para passar alguns dias de férias, unindo o usuário a facilidade de aquisição de uma data exclusiva aos locais mais requisitados.

<img src="public/logo.png" alt="logo" width="300">

[Visite a aplicação clicando aqui](https://ez-travels-web.vercel.app)

<br>

## Funcionalidades da aplicação:

- Autenticação com google.
  - Utilizando Next-Auth
- Filtro de viagens através de parametros de rota.
  - Palavras chave
  - Por data
  - Por orçamento
- Agendamento de viagem.
  - Validação de datas em aberto
  - Validação de quantidade de hóspedes
- Tratamento de formulários e validação de campos.
  - Utilizando React-Hook-Form
- Pagamento utilizando cartão de crédito. (Modo teste)
  - Criádo WebHook para ourvir ação de pagamento e validar compra.
- Listagem de viagens do usuário.
  - Possivel cancelar a viagem.

<br>

## Tecnologias utilizadas

- React.js
- Typescript
- Next.js
- Server-components
- Client-components
- Next-Auth
- React-hook-form
- React-toastify
- Stripe-js
- Prisma
- Supabase
- Google Cloud Console
- Tailwindcss

<br>

## Imagens

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<img src="public/home.png" width="300">
<img src="public/search.png" width="300">
<img src="public/travel-details.png" width="300">
<img src="public/confirmation.png" width="300">
<img src="public/my-travels.png" width="300">
</div>

<br>

# Instalação
#### Pré-requisitos

```
  - node.js
  - stripe CLI
```

#### Clonar projeto

```
git clone https://github.com/FinotelliCarlos/ez-travels-web.git
cd ez-travels-web
```

#### Instalar dependências 

```
npm install
# ou
yarn
```

#### Necessário configurar algumas variáveis de hambiente
Crie um arquivo `.env` e adicione essas variáveis

```env
DATABASE_URL=postgresql://postgres:xxxxxxxxxxx@xx.xxxxxxxxxxxx.supabase.co:5432/postgres

GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_STRIPE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

HOST_URL=http://localhost:3000

NEXTAUTH_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

  ⌨ <strong>#Como executar o projeto</strong>

<br>

```bash
# Clonar o repositório
git clone https://github.com/FinotelliCarlos/ez-travels-web

# Entrar no diretório
cd ez-travels-web

# Baixar as dependências
npm install | yarn

# Executar o servidor
npm run dev | yarn dev

# Este passo necessita que você tenha o docker rodando em sua maquina e tenha a imagem postgress instalada
# Também pode ser utilizado algum provedor online como foi feito neste projeto e inserir o link de conecção a .env DATABASE_URL
# Executar seed ao banco de dados
npx prisma db seed

```

</div>
