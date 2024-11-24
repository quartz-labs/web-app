"use client";

import { useCallback } from "react";
import defaultStyles from "../DefaultLayout/DefaultLayout.module.css";
import wrapperStyles from "../Modal.module.css";
import { useError } from "@/context/error-provider";

export default function ErrorModal() {
  const { propsDetails, detailsEnabled, hideDetails } = useError();
  // const propsDetails = null;
  // const detailsEnabled = false;
  // const hideDetails = () => {};

  const handleWrapperClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        hideDetails();
      }
    },
    [hideDetails],
  );

  if (!propsDetails) return <></>;
  const { message, body, errorId } = propsDetails;

  const limitedBody = body.length > 500 ? `${body.substring(0, 500)}...` : body;
  const email = `mailto:iarla@quartzpay.io?subject=Error%20Report:%20${errorId}`;

  if (!detailsEnabled) return <></>;
  return (
    <div className={`${wrapperStyles.modalWrapper} ${wrapperStyles.errorModalWrapper}`} onClick={handleWrapperClick}>
      <div className={`glass ${wrapperStyles.modal} ${wrapperStyles.errorModal}`} onClick={(e) => e.stopPropagation()}>
        <div className={defaultStyles.contentWrapper}>
          <h2 className={`${defaultStyles.heading} ${defaultStyles.errorHeading}`}>Error</h2>

          <div className={defaultStyles.errorBodyWrapper}>
            <div className={defaultStyles.errorBody}>
              <p>{message}</p>
              <p>{limitedBody}</p>
            </div>

            <p className="small-text light-text">
              Contact support through{" "}
              <a href="https://discord.gg/K3byNmnKNm" target="_blank">
                Discord
              </a>{" "}
              or{" "}
              <a href={email} target="_blank">
                email
              </a>{" "}
              with the following <span className="no-wrap">Error ID: {errorId}</span>
            </p>
          </div>
        </div>

        <div className={defaultStyles.buttons}>
          <button className={`glass-button ghost ${defaultStyles.mainButton}`} onClick={hideDetails}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
