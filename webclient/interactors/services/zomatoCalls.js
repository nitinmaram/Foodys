
module.exports = {
  getResturantFromQuery:function(data,successFunction, errorFunction){
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search?q='+data.rcity+'&entity_id='+data.cityId+'&cuisines='+data.cusine+'&lat='+data.lat+'&lon='+data.lon+'&entity_type=city&sort=real_distance',
        type: 'get',
        beforeSend: function(request) {
            request.setRequestHeader('user-key', 'e7d66af9fb8c94906a2e8ed0f4c3c203');
        },
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  getResturantByLoc:function(data,successFunction, errorFunction){
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search?lat='+data.lat+'&lon='+data.lon+'&sort=real_distance',
        type: 'get',
        beforeSend: function(request) {
            request.setRequestHeader('user-key', 'e7d66af9fb8c94906a2e8ed0f4c3c203');
        },
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  getResturantByDropLoc:function(data,successFunction, errorFunction){
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+data.cityId+'&entity_type=city',
        type: 'get',
        beforeSend: function(request) {
            request.setRequestHeader('user-key', 'e7d66af9fb8c94906a2e8ed0f4c3c203');
        },
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  },
  getCitiesByQuery:function(data,successFunction, errorFunction){
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/cities?q='+data.query,
        type: 'get',
        beforeSend: function(request) {
            request.setRequestHeader('user-key', 'e7d66af9fb8c94906a2e8ed0f4c3c203');
        },
        data:data,
        success:successFunction ,
        error: errorFunction
    })
  }
}
