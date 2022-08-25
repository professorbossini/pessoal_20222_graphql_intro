import { createServer } from '@graphql-yoga/node'
const livros = [
  {
    id: '1',
    titulo: 'Effective Java',
    genero: 'Tecnico',
    edicao: 3,
    preco: 39.99
  },
  {
    id: '2',
    titulo: 'Concrete Mathematics',
    genero: 'Tecnico',
    edicao: 1,
    preco: 89.99
  }
]

const usuarios = [
  {
    id: '100',
    nome: 'Jose',
    livros: [
      {
        id: '1',
        titulo: 'Effective Java',
        genero: 'Tecnico',
        edicao: 3,
        preco: 39.99
      },
      {
        id: '2',
        titulo: 'Concrete Mathematics',
        genero: 'Tecnico',
        edicao: '1',
        preco: 89.99
      }
    ]
  },
  {
    id: '101',
    nome: 'Maria',
    livros: [
      {
        id: '5',
        titulo: 'Programming Challenges',
        genero: 'Tecnico',
        edicao: 1,
        preco: 39.99
      }
    ]
  }
]
const typeDefs = `
  type Query {
    usuarios: [Usuario!]!
    livros (precoMaximo: Float!): [Livro!]!
    effectiveJava: Livro!
    bemVindo (nome: String):String!
    notas: [Int!]!
    adicionar(numeros: [Float!]!): Float!
  }

  type Usuario {
    id: ID!,
    nome: String!,
    idade: Int!,
    livros: [Livro!]
  }
  type Livro {
    id: ID!
    titulo: String!
    genero: String!
    edicao: Int,
    preco: Float
  }
`;

const resolvers = {
  Query: {
    usuarios(){
      return usuarios
    },
    livros (parent, args, ctx, info){
      return livros.filter (l => l.preco <= args.precoMaximo)
    },
    adicionar (parent, args, ctx, info){
      return args.numeros.length === 0 ? 0 : args.numeros.reduce((ac, atual) => ac + atual)
    },
    notas (parent, args, ctx, info){
      return [10, 2, 7, 7, 8]
    },
    effectiveJava() {
      return {
        id: '123456',
        titulo: null,
        genero: 'Técnico',
        edicao: 3,
        preco: 43.9
      }
    },
    bemVindo(parent, args, ctx, info){
      console.log(`parent: ${JSON.stringify(parent)}`)
      console.log(`args: ${JSON.stringify(args)}`)
      console.log(ctx)
      console.log(`info: ${JSON.stringify(info)}`)
      return `
        Bem vindo ${args.nome ? args.nome : 'visitante'}
      `
    }
  }
};

const server = createServer ({
  schema: {
    typeDefs,
    resolvers
  }
})

server.start(() => {
  'Servidor no ar...'
})
