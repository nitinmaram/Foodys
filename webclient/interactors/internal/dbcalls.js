
module.exports = {
  addUser:function(data,successFunction, errorFunction){
    $.ajax({
        url: '/users/add',
        type: 'post',
        datatype: 'JSON',
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  loginUser:function(data,successFunction, errorFunction){
    $.ajax({
        url: '/users/login',
        type: 'post',
        datatype: 'JSON',
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  logoutUser:function(successFunction, errorFunction){
    $.ajax({
        url: '/users/logout',
        type: 'get',
        success:successFunction ,
        error: errorFunction
    })
  },
  getFavourite:function(data,successFunction, errorFunction){
    $.ajax({
        url: '/restaurants',
        type: 'post',
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  addFavourites:function(data,successFunction, errorFunction){
    $.ajax({
        url: '/restaurants/add',
        type: 'post',
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  deleteFavourite:function(data,successFunction, errorFunction){
    $.ajax({
        url: '/restaurants/delete',
        type: 'delete',
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  updateComments:function(data,successFunction, errorFunction){
    $.ajax({
        url: '/restaurants/update/'+data.id,
        type: 'patch',
        data: data,
        success:successFunction ,
        error: errorFunction
    })
  }
}
