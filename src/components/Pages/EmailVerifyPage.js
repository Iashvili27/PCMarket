import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { auth } from "../../firebase";
import CardLoader from "../Sceletons/CardLoader";

function EmailVerifyPage(props) {
  const { signUp, user, emailVerification } = useUserAuth();
  const [emailVerify, setEmailVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(auth);
  // const emailVerify = async () => {
  //   emailVerification().then(() => {
  //     console.log("verified");
  //   });
  // };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (user.emailVerified === false) {
      const interval = setInterval(function () {
        user?.reload().then(() => setEmailVerify(user.emailVerified));
        console.log("counting");
      }, 2000);

      setTimeout(() => {
        clearInterval(interval);
      }, 60000);
    } else if (user.emailVerified === true) {
      setEmailVerify(true);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div>
          <CardLoader />
        </div>
      ) : (
        <div className="verifycontainer">
          <div className="verifyBackground" />
          {emailVerify === false ? (
            <div className="verifycontainer">
              <div className="verifyCloseBtn">
                <button>X</button>
              </div>
              <div className="verifytitle">
                <h3>Item Succesfully Added.</h3>
              </div>
              <div className="verifyfooter">
                <button>Ok</button>
              </div>
            </div>
          ) : (
            <div>you already verified</div>
          )}
        </div>
      )}
    </>
  );
}

export default EmailVerifyPage;
