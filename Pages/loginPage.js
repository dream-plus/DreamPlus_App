var Observable = require('FuseJS/Observable');

var ID = Observable("");
var Password = Observable("");

function SignIn(){

    var opts = ({
            	'username' : ID.value,
                'password' : Password.value
              });

	console.log(JSON.stringify(opts));
    console.log('sign'); //Sign_in 함수가 호출되었는지 확인
 

	fetch('http://18.222.99.74/users/signin',{
		// fetch('http://3ff05a06.ngrok.io/users/signin',{
	            method: "POST",
	            headers: {
	            	"Content-type": "application/JSON"
	            },
	            body : JSON.stringify(opts)
	               
	        }).then((res)=>{
	            // console.log(JSON.stringify(res));
	            // console.log(JSON.parse(res));
	            return res.json()
			}).then((res)=>{

	            console.log(res.success);


	            ID = ID.value;

	            if( JSON.parse(res.success) == true){
	            	// router.push("Home", ID);
	            	router.push("home",'ID');
	            	console.log("Move to MainPage");
	            	console.log(ID);
	            }
	            // JSON.parse(res._bodyInit).documents[1].address_name
	        }).catch((err)=>{
	            console.log(err);
	        });

}


function SignUp(){
	router.push("signupPage");
	console.log("Move to SignUp");
}


module.exports = {
	ID : ID,
	Password : Password,
	SignUp : SignUp,
	SignIn : SignIn
};
