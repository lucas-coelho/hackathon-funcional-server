const { GraphQLServer } = require('graphql-yoga');
const { pipe, flatten, isNil, not } = require('ramda');
const { GraphQLDateTime, GraphQLDate } = require('graphql-iso-date');
const { prisma } = require('./generated/prisma-client');
const { mapSchedule, mapSchedules, mapCreateScheduleInput, mapUpdateScheduleInput } = require('./schedule.mapper')

const program = (...list) => acc => flatten(list).reduce( (acc,fn) => acc.then(fn), Promise.resolve(acc));

const resolvers = {
  GraphQLDateTime,
  GraphQLDate,
  Query: {
    schedules: (root, {status}) => pipe(
      prisma.schedules,
      program(mapSchedules),
    )({where: {status}}),
    schedule: (root, {id}) => prisma.schedule({id})
  },
  Mutation: {
    createSchedule: (root, args) => pipe(
      mapCreateScheduleInput,
      prisma.createSchedule,
      program(mapSchedule),
    )(args),
    updateSchedule: (root, args) => pipe(
      mapUpdateScheduleInput,
      prisma.updateSchedule,
      program(mapSchedule),
    )(args),
    deleteSchedule: (root, arg) => pipe(
      prisma.deleteSchedule,
      program(pipe(isNil, not))
    )(arg)
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Running on port 4000'));