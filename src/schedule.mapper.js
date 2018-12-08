const {
  assoc,
  curry,
  head,
  isNil,
  lensProp,
  map,
  not,
  omit,
  over,
  pick,
  pipe,
  propSatisfies,
  split,
  when,
} = require('ramda');
const log = curry((tag, value) => { console.log(tag, value); return value })

const toISOString = value => value.toISOString()
const parseISODateToDate = pipe(split('T'), head)

const setPropIfNotNil = curry((prop, fn) => when(
  propSatisfies(pipe(isNil, not), prop),
  over(lensProp(prop), fn),
))

const mapSchedule = pipe(
  setPropIfNotNil('beginDate', parseISODateToDate),
  setPropIfNotNil('endDate', parseISODateToDate),
)
const mapSchedules = map(mapSchedule)
const mapCreateScheduleInput = pipe(
  pick(['employee', 'beginDate', 'endDate']),
  setPropIfNotNil('beginDate', pipe(toISOString, parseISODateToDate)),
  setPropIfNotNil('endDate', pipe(toISOString, parseISODateToDate)),
  assoc('status', 'Pending')
)
const mapUpdateScheduleInput = pipe(
  pick(['employee', 'beginDate', 'endDate', 'id']),
  assoc('status', 'Pending'),
  setPropIfNotNil('beginDate', pipe(toISOString, parseISODateToDate)),
  setPropIfNotNil('endDate', pipe(toISOString, parseISODateToDate)),
  schedule => ({ data: omit(['id'], schedule), where: {id: schedule.id} }),
)

module.exports = {
  mapCreateScheduleInput,
  mapSchedule,
  mapSchedules,
  mapUpdateScheduleInput,
}