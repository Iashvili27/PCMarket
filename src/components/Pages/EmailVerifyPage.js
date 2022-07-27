import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

import CardLoader from "../Sceletons/CardLoader";
import "./EmailVerifyPage.css";

function EmailVerifyPage(props) {
  const { user, emailVerification } = useUserAuth();
  const [emailVerify, setEmailVerify] = useState(false);
  const [loading, setLoading] = useState(true);

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
          {emailVerify === false ? (
            <div className="verifycard">
              <h3>{`Verification link has been sent to ${user.email}`}</h3>
              <p>Check your email and spam folder..</p>
              <p>If you have not received link send another one</p>
              <button>Resend</button>
            </div>
          ) : (
            <h1>Your account is verified</h1>
          )}
        </div>
      )}
    </>
  );
}

export default EmailVerifyPage;
