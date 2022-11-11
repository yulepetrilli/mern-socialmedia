const { ApolloServer } = require('apollo-server');
const { mongoose } = require('mongoose');

const { MONGODBCOMPASS } = require('./config.js');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}) 
});

mongoose.connect(MONGODBCOMPASS, { useNewUrlParser: true }).then(() => {
    console.log('Conected to MongoDB successfully!')
    return server.listen({port: 5000})
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
  
