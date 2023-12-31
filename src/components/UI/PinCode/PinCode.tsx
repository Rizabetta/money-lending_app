import { useEffect, useState } from "react";
import "./PinCode.scss";
import { api_loan } from "../../../api/loan";

type TPinCodeProps = {
  numberOfСells: number;
  setMessageActive: any;
};

function PinCode({ numberOfСells, setMessageActive }: TPinCodeProps) {
  const [pinReq, setPinReq] = useState("9600");
  const [pin, setPin] = useState<string[]>(
    Array.from({ length: numberOfСells }, () => "")
  );
  const [isActive, setisActive] = useState([false, false, false, false]);
  const [isValid, setisValid] = useState(true);
  const handleChange = (e: any, index: number) => {
    const { value } = e.target;
    const newPin = [...pin];
    newPin[index] = value;
    const shouldFocusNextInput = value && value !== 0;
    setPin(newPin);
    if (index < pin.length - 1) {
      setisActive((isActive) => ({ ...isActive, [index + 1]: true }));
    } else {
      newPin[index] = e.currentTarget.value;
      setPin(newPin);
    }
    if (shouldFocusNextInput) {
      const nextInput = document.getElementById(`pin${index + 1}`);
      nextInput?.focus();
    }
  };

  useEffect(() => {
    if (pin[pin.length - 1] !== "") {
      if (pin.includes("")) {
        setisValid(false);
      } else {
        setisValid(true);
        setPinReq(pin.join(""));
        api_loan
          .sendSESCode(Number(pinReq))
          .then((e) => setMessageActive(e.ok));
      }
    }
  }, [pin, pinReq, setMessageActive]);

  const handleBefore = (e: any) => {
    const isOnlyNumbers = /^[0-9]$/.test(e.data);
    const isCanBeChanged =
      isOnlyNumbers && e.target.value.length !== 1 && e.data;

    if (!isCanBeChanged) {
      e.preventDefault();
    }
  };
  return (
    <div className="pincode">
      <h3>Please enter confirmation code</h3>
      <div className="pincode__container">
        {pin.map((element, index) => (
          <div className="pincode__item" key={index}>
            {isActive[index] ? (
              <input
                id={`pin${index}`}
                type="number"
                required
                autoFocus
                onBlur={(e) =>
                  e.target.value === "" &&
                  setisActive((isActive) => ({ ...isActive, [index]: false }))
                }
                onChange={(e) => handleChange(e, index)}
                onBeforeInput={handleBefore}
              />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() =>
                  setisActive((isActive) => ({ ...isActive, [index]: true }))
                }
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9.25"
                  stroke="#808080"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      {!isValid && <p>Invalid confirmation code</p>}
    </div>
  );
}

export { PinCode };
