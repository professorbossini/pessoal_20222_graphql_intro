import { createServer } from '@graphql-yoga/node'
const typeDefs = `
  type Query {
    effectiveJava: Livro!
    bemVindo (nome: String):String!
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
      console.log(`ctx: ${JSON.stringify(ctx)}`)
      console.log(`info: ${JSON.stringify(info)}`)
      return 'Bem vindo'
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
