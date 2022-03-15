import { gql, ApolloServer } from "apollo-server-svelte-kit";
import { search, stream } from 'play-dl';

const typeDefs = gql`
  type Song {
    ref: String!
    title: String!
    thumbnail: String!
    length: Int!
    url: String!
  }

  type SongRef {
    url: String!
  }

  type Query {
    searchSongs(term: String!, limit: Int): [Song]!
    updateSong(ref: String!): SongRef!
  }
`;

const resolvers = {
  Query: {
    searchSongs: async (root: any, { term, limit }) => {
      const songs = await search(term, { source: { youtube: "video" }, limit: limit || 12 });

      return songs.map(async (metadata) => {
        const { url } = await stream(metadata.url);

        return {
          ref: metadata.url,
          title: metadata.title,
          thumbnail: metadata.thumbnails[0].url,
          length: metadata.durationInSec,
          url
        }
      });
    },
    updateSong: async (root: any, { ref }) => {
      const { url } = await stream(ref);
      return { url }
    }
  }
};

const handler = async (req) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  await apolloServer.start();

  const resp = await apolloServer.handleRequest(req);
  apolloServer.stop();

  return resp;
};

export const head = handler;
export const get = handler;
export const post = handler;