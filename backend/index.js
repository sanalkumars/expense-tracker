import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import  mergedResolvers  from './resolvers/index.js'
import  mergedTypeDef from './typeDefs/index.js';
import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import passport from 'passport';
import { buildContext } from 'graphql-passport';
import { configurePassport } from './passport/passport.config.js';

dotenv.config();
configurePassport();
const app = express();

const httpServer = http.createServer(app);

const MongoStore = connectMongo(session)

const store = new MongoStore({
  uri: process.env.MONGO_URI,
  collection: "session",
})

/* the following is the code for bug fixing */

store.on("error", (err)=>{
  console.log(err);
})
/*  bug fixing end*/

// calling the session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave:false, //used for making the session not to get saved on each request
    saveUninitialized:false,
    cookie:{
      maxAge: 1000*60*60*24*7,
      httpOnly: true //this prevents cross-site scripting(xss) attacks
    },
    store: store
  })
)

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
    typeDefs: mergedTypeDef,
    resolvers : mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

app.use(
  '/graphql',
  cors({
    origin:"http://localhost:3000",
    credentials:true
  }),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) =>buildContext({ req}),
  }),
);
   
  
   
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);