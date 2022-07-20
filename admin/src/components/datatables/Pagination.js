/* eslint-disable prettier/prettier */
const Pagination = (db_data,nextPage,currentPage,perPage,displayColumns) => {
  const udata = []
  if (db_data) {
    var index = ((currentPage-1)*perPage)
    db_data.forEach((element) => {
      var prefix = ''
      prefix = (index+1)
      var values = Object.values(element)
      var total_data = []
      total_data["serial"] = prefix
      values.forEach((key,val) => {
        total_data[displayColumns[val]] = key
      })

      udata.push(total_data)
      index++
    })
  }
  return udata

}
export default Pagination
