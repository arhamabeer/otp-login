import { auth } from "./auth/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./App.css";
import { useState } from "react";

function App() {
  const [otpSend, setOptSend] = useState(false);
  const [otpVerify, setotpVerify] = useState(false);
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [invalidphone, setInvalidphone] = useState(false);
  const [number, setNumber] = useState("");
  const [Otp, setOtp] = useState("");
  const [user, setUser] = useState({});

  const handleClick = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {
            console.log("expired-callback err, ");
          },
        },
        auth
      );
    }
  };
  const onSignUp = () => {
    handleClick();
    const appVerifier = window.recaptchaVerifier;
    console.log("sending response", appVerifier);

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("sending successful, ", confirmationResult);
        setOptSend(true);
      })
      .catch((error) => {
        console.log("sending err, ", error);
        window.recaptchaVerifier.render().then(function (widgetId) {
          window.grecaptcha.reset(widgetId);
        });
      });
  };
  const onOtpVerify = () => {
    window.confirmationResult
      .confirm(Otp)
      .then((result) => {
        // User signed in successfully.
        setUser(result.user);
        setotpVerify(true);
        console.log("USER => ", result);
        // ...
      })
      .catch((error) => {
        console.log("USER errr => ", error);
        setInvalidOTP(true);
      });
  };
  console.log("passed = ", window.recaptchaVerifier);
  return (
    <div className="App">
      <div>
        <h1>OTP VERIFICATION</h1>
        <div id="recaptcha-container"></div>
      </div>
      {otpVerify ? (
        <>
          <h1>LOGGED IN SUCCESSFULLY</h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <text>
              User Phone: <b>{user.phoneNumber}</b>
            </text>
            <text>
              User Creation Time: <b>{user.metadata.creationTime}</b>
            </text>
            <text>
              User ID: <b>{user.uid}</b>
            </text>
          </div>
        </>
      ) : (
        <>
          {!otpSend ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                onChange={(e) => setNumber(e.target.value)}
                placeholder="+923101234567"
              />
              <button onClick={() => onSignUp()}>Login via Phone</button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="number"
                placeholder="Enter the OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <text style={{ color: "darkgreen" }}>
                Enter the OTP received on your number
              </text>
              <button onClick={() => onOtpVerify()}>Verify</button>
              {invalidOTP && <text style={{ color: "red" }}>Invalid OTP</text>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
