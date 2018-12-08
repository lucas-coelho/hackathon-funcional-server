module.exports = {
        typeDefs: /* GraphQL */ `type AggregateSchedule {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createSchedule(data: ScheduleCreateInput!): Schedule!
  updateSchedule(data: ScheduleUpdateInput!, where: ScheduleWhereUniqueInput!): Schedule
  updateManySchedules(data: ScheduleUpdateManyMutationInput!, where: ScheduleWhereInput): BatchPayload!
  upsertSchedule(where: ScheduleWhereUniqueInput!, create: ScheduleCreateInput!, update: ScheduleUpdateInput!): Schedule!
  deleteSchedule(where: ScheduleWhereUniqueInput!): Schedule
  deleteManySchedules(where: ScheduleWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  schedule(where: ScheduleWhereUniqueInput!): Schedule
  schedules(where: ScheduleWhereInput, orderBy: ScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Schedule]!
  schedulesConnection(where: ScheduleWhereInput, orderBy: ScheduleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScheduleConnection!
  node(id: ID!): Node
}

type Schedule {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  employee: String!
  beginDate: DateTime!
  endDate: DateTime!
  status: Status!
}

type ScheduleConnection {
  pageInfo: PageInfo!
  edges: [ScheduleEdge]!
  aggregate: AggregateSchedule!
}

input ScheduleCreateInput {
  employee: String!
  beginDate: DateTime!
  endDate: DateTime!
  status: Status!
}

type ScheduleEdge {
  node: Schedule!
  cursor: String!
}

enum ScheduleOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  employee_ASC
  employee_DESC
  beginDate_ASC
  beginDate_DESC
  endDate_ASC
  endDate_DESC
  status_ASC
  status_DESC
}

type SchedulePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  employee: String!
  beginDate: DateTime!
  endDate: DateTime!
  status: Status!
}

type ScheduleSubscriptionPayload {
  mutation: MutationType!
  node: Schedule
  updatedFields: [String!]
  previousValues: SchedulePreviousValues
}

input ScheduleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScheduleWhereInput
  AND: [ScheduleSubscriptionWhereInput!]
  OR: [ScheduleSubscriptionWhereInput!]
  NOT: [ScheduleSubscriptionWhereInput!]
}

input ScheduleUpdateInput {
  employee: String
  beginDate: DateTime
  endDate: DateTime
  status: Status
}

input ScheduleUpdateManyMutationInput {
  employee: String
  beginDate: DateTime
  endDate: DateTime
  status: Status
}

input ScheduleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  employee: String
  employee_not: String
  employee_in: [String!]
  employee_not_in: [String!]
  employee_lt: String
  employee_lte: String
  employee_gt: String
  employee_gte: String
  employee_contains: String
  employee_not_contains: String
  employee_starts_with: String
  employee_not_starts_with: String
  employee_ends_with: String
  employee_not_ends_with: String
  beginDate: DateTime
  beginDate_not: DateTime
  beginDate_in: [DateTime!]
  beginDate_not_in: [DateTime!]
  beginDate_lt: DateTime
  beginDate_lte: DateTime
  beginDate_gt: DateTime
  beginDate_gte: DateTime
  endDate: DateTime
  endDate_not: DateTime
  endDate_in: [DateTime!]
  endDate_not_in: [DateTime!]
  endDate_lt: DateTime
  endDate_lte: DateTime
  endDate_gt: DateTime
  endDate_gte: DateTime
  status: Status
  status_not: Status
  status_in: [Status!]
  status_not_in: [Status!]
  AND: [ScheduleWhereInput!]
  OR: [ScheduleWhereInput!]
  NOT: [ScheduleWhereInput!]
}

input ScheduleWhereUniqueInput {
  id: ID
}

enum Status {
  Pending
  Approved
  Reproved
}

type Subscription {
  schedule(where: ScheduleSubscriptionWhereInput): ScheduleSubscriptionPayload
}
`
      }
    