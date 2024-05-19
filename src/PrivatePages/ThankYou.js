import React,{useEffect} from 'react'
import axios from "axios";
import img from "../resource/icon/submit.png";

function ThankYou(props) {
    let path = props.location.pathname;
    console.log(path);
    let id_path = path.split("/");
    console.log(id_path[2]);
    let id = id_path[2];
    useEffect(() => {
        let data={
            user_id:id,
        }
        axios
        .post(`api/v1/auth/thankyou/${id}`,data)
        .then((response) => {
          console.log(response, "response---------");
          if (response.status === 200) {
          }
          // history.push('/createProject/uploadTb')
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
      }, []);

  return (
    <>
    {/* <div class="content">
        <div class="wrapper-1">
      <div class="wrapper-2">
        <h1>Thank you !</h1>
        <h4>Email Activated</h4>
      </div>
      <div class="footer-like">
        <p>Please Click to Sign In?
         <a href="http://localhost:3000">Click here to Sign in</a>
        </p>
      </div>
    </div>
    </div> */}
    <div class="container-fluid mt-5">
    <div class="row">
        <div class="col-lg-8 offset-2">
            <div class="card shadow">
                <div class="card-body">
                        <div class="box">                                                                                                                                                                          
                            <div class="container">
                            <center><img src={img} alt="" style={{height: "102px"}}/></center>
                        <h1><center>Thank you! Your Account is Activated.</center></h1>
                            <h4><center><p>Please Click to Sign In?
                                <a href="https://myfinalyst.icodexa.com/">Click here to Sign in</a>
                                </p></center>
                            </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</div>
    </>
  )
}

export default ThankYou