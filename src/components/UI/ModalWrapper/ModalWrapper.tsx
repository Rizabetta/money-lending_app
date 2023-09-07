import React, { ReactNode } from "react";
import "./ModalWrapper.scss";
import close from "../../../assets/svg/Close_square.svg";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../routers/routes";

type TModal = {
  denylActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

function ModalWrapper({ denylActive, setActive, children }: TModal) {
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__topcontainer">
          <h3>Deny application</h3>
          <Link to={denylActive ? RouteNames.HOME : "# "}>
            <img
              src={close}
              alt="close"
              onClick={() => {
                setActive(false);
              }}
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

export { ModalWrapper };