/* eslint-disable */
const locationCreateDtoInType = shape({
    locationCode: string(200).isRequired(),
    name: string(200).isRequired(),
  })
  
const locationGetDtoInType = shape({
    locationCode: string(200).isRequired()
})