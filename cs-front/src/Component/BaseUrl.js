const BaseUrl = 'http://127.0.0.1:8000/'
let user = null

if(localStorage.getItem('access_token') !== null){
    user = (JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).user_id)
    
}
else{
    user = false;
    
}
//  
//checking and taking user from token, if exist then can write the question/answer or if not exist then giving the alert to login    
export {BaseUrl, user}

 