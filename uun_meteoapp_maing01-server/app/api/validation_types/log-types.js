/* eslint-disable */

const logDeleteDtoInType = shape({
  code: string(200).isRequired()
})

const logCreateDtoInType = shape({
    temperature: string(200).isRequired(),
    sensorCode: string(200).isRequired(),
    humidity: string(200).isRequired(),
    datetime: string(200).isRequired(),
  })

const logBulkCreateDtoInType = shape({
  array: array(
    shape({
      temperature: string(200).isRequired(),
      sensorCode: string(200).isRequired(),
      humidity: string(200).isRequired(),
      datetime: string(200).isRequired(),
    })
  ).isRequired()
})


const logGetDtoInType = shape({
  code: string(200).isRequired()
})

const logListDtoInType = shape({
  sortBy: oneOf(["datetime"]),
  order: oneOf(["asc", "desc"]),
  dateFrom:string(200),
  dateTo:string(200),
  state: oneOf(["active", "deleted"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
const listBySensorCodeDtoInType = shape({
  sensorCode: string(200).isRequired(),
  sortBy: oneOf(["datetime"]),
  order: oneOf(["asc", "desc"]),
  dateFrom:string(200),
  dateTo:string(200),
  state: oneOf(["active", "deleted"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
const listByLocationCodeDtoInType = shape({
  locationCode: string(200).isRequired(),
  sortBy: oneOf(["datetime"]),
  order: oneOf(["asc", "desc"]),
  dateFrom:string(200),
  dateTo:string(200),
  state: oneOf(["active", "deleted"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
