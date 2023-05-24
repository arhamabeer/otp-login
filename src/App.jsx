import { auth } from "./auth/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "./App.css";

function App() {
  const handleClick = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {},
        },
        auth
      );
    }
    console.log("passed = ", window.recaptchaVerifier);
    // signInWithPhoneNumber(auth, +923020217792,)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //     // ...
    //     console.log("passed = ", confirmationResult);
    //   })
    //   .catch((error) => {
    //     console.log("err = ", error);
    //     // Error; SMS not sent
    //     // ...
    //   });
  };
  return (
    <div className="App">
      <div>
        <h1>OTP VERIFICATION</h1>
        <div id="recaptcha-container"></div>
      </div>
      <div>
        <button onClick={() => handleClick()}>Login via Phone</button>
      </div>
    </div>
  );
}

export default App;
