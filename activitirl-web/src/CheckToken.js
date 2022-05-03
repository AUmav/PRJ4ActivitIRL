import jwtDecode from "jwt-decode";

const CheckToken = () => {
    let token = localStorage.getItem("loginToken");
    if(token != null){
        let payload = jwtDecode(token);
        let expiryTime = payload.exp;
        let timeNow = Date.now() / 1000;
        console.log(expiryTime, timeNow);
        if( timeNow > expiryTime ) {
            localStorage.removeItem("loginToken");
            alert("Login session expired.");
        }    
    }
    return(
        <div></div>
    );
}

export default CheckToken;