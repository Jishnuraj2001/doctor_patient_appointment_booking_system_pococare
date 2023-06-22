const register=document.getElementById("register_form");
register.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    obj["name"]=document.getElementById("name").value;
    obj["email"]=document.getElementById("email").value;
    obj["password"]=document.getElementById("password").value;
    obj["gender"]=document.getElementById("gender").value;
    obj["role"]=document.getElementById("role").value;
    obj["location"]=document.getElementById("location").value;
    if(obj["role"]=="doctor"){
        obj["doctor_specialization"]=document.getElementById("doctor_specialization").value;
    }
    userRegisterFn(obj); 
})


async function userRegisterFn(obj){
    try {
        let res=await fetch(`http://localhost:3100/register`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        })
        let fin=await res.json();
        if(res.status==201){
            alert(fin.msg);
            window.location.href="../html/login.html";
        }else{
            alert(fin.msg);
        }
    } catch (error) {
        alert("unable to do registering");
    }
}