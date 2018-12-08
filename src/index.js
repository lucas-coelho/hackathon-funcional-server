const { GraphQLServer } = require('graphql-yoga');
const { find, merge, pick, pipe, propEq, when } = require('ramda');
const { GraphQLDateTime, GraphQLDate } = require('graphql-iso-date');
let schedules = require('./schedules.json');

const idEq = propEq('id');
const doIfMatchingId = (id) => when(idEq(id));

const resolvers = {
  GraphQLDateTime,
  GraphQLDate,
  Query: {
    schedules: () => schedules,
    schedule: (root, { id }) => find(idEq(id), schedules)
  },
  Mutation: {
    createSchedule: (root, args) => pipe(
      pick(['url', 'description']),
      merge({ id: `link-${links.length}` }),
      (link) => {
        // OMG side-effect! O_o"
        links.push(link);

        return link;
      }
    )(args),
    updateSchedule: (root, args) => {
      let newLink;
      const updateLink = (link) => {
        newLink = merge(link, args);
        return newLink;
      };

      links = links.map(doIfMatchingId(args.id)(updateLink));

      return newLink;
    },
    deleteSchedule: (root, { id }) => {
      let linkToDelete;

      links.forEach((link, index) => {
        const matchAndRemove = (match) => {
          linkToDelete = match;
          links.splice(index, 1);
        };

        return doIfMatchingId(id)(matchAndRemove, link);
      });

      return linkToDelete;
    }
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Running on port 4000'));