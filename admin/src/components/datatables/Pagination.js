/* eslint-disable prettier/prettier */
const Pagination = (db_data,nextPage,currentPage,perPage,displayColumns) => {
  const udata = []
  if (db_data) {
    var index = 0
    db_data.forEach((element) => {
      var prefix = ''
      if (db_data.length === (index+1) && nextPage === true) {
        prefix = currentPage*(index+1)
      } else {
        var suffix = ''
        if (perPage === 50){
          suffix = currentPage-1 === 0 ? '' : (currentPage-1)*5
        } else if (perPage === 40) {
          suffix = currentPage-1 === 0 ? '' : (currentPage-1)*4
        } else if (perPage === 30) {
          suffix = currentPage-1 === 0 ? '' : (currentPage-1)*3
        } else if (perPage === 20) {
          suffix = currentPage-1 === 0 ? '' : (currentPage-1)*2
        } else if (perPage === 10) {
          suffix = currentPage-1 === 0 ? '' : (currentPage-1)
        }
        if (db_data.length === (index+1) && nextPage === false && db_data.length >= 10) {
          prefix =  currentPage*(index+1)
        }else{
          prefix =  suffix+''+(index+1)
        }
      }
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
