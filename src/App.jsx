import { auth } from "./auth/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./App.css";

function App() {
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

    signInWithPhoneNumber(auth, "+923463824121", appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("sending successful, ", confirmationResult);
      })
      .catch((error) => {
        console.log("sending err, ", error);
        window.recaptchaVerifier.render().then(function (widgetId) {
          window.grecaptcha.reset(widgetId);
        });
      });
  };

  console.log("passed = ", window.recaptchaVerifier);
  return (
    <div className="App">
      <div>
        <h1>OTP VERIFICATION</h1>
        <div id="recaptcha-container"></div>
      </div>
      <div>
        <button onClick={() => onSignUp()}>Login via Phone</button>
      </div>
    </div>
  );
}

export default App;
