/* eslint-disable */
const locationCreateDtoInType = shape({
  name: string(200).isRequired(),
})
const locationGetDtoInType = shape({
  locationCode: string(200).isRequired()
})
const locationDeleteDtoInType = shape({
  locationCode: string(200).isRequired()
})
const locationUpdateDtoInType = shape({
  locationCode: string(200).isRequired(),
  name: string(200).isRequired()
})
const locationListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  state: oneOf(["active", "passive"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});