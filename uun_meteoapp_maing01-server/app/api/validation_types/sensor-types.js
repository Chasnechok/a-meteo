/* eslint-disable */
const sensorCreateDtoInType = shape({
  name: string(200),
  code: string(200).isRequired(),
  locationCode: string(200),
  state: string(200)

})

const sensorGetDtoInType = shape({
  id: mongoId().isRequired()
})
const sensorDeleteDtoInType = shape({
  id: mongoId().isRequired()
})

const sensorUpdateDtoInType = shape({
  id: mongoId().isRequired(),
  name: string(200).isRequired()
})
const sensorListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  state: oneOf(["initial", "active", "passive", "forbidden"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
