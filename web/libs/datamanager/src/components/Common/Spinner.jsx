import { inject } from "mobx-react";
import React from "react";

const injector = inject(({ store }) => {
  return {
    SDK: store?.SDK,
  };
});

export const Spinner = injector(({ SDK, visible = true, ...props }) => {
  const size = React.useMemo(() => {
    switch (props.size) {
      case "large":
        return SDK?.spinnerSize?.large ?? 128;
      case "middle":
        return SDK?.spinnerSize?.middle ?? 48;
      case "small":
        return SDK?.spinnerSize?.small ?? 24;
      default:
        return SDK?.spinnerSize?.middle ?? 48;
    }
  }, [props.size]);

  const videoStyles = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  const ExternalSpinner = SDK?.spinner;

  return visible ? (
    <div
      {...props}
      style={{ width: size, height: size }}
      children={
        <div style={{ width: "100%", height: "100%" }}>
          {ExternalSpinner ? (
            <ExternalSpinner size={size} />
          ) : (
            <svg viewBox="0 0 50 50" style={videoStyles} role="img" aria-label="loading" focusable="false">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="31.4 188.4"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          )}
        </div>
      }
    />
  ) : null;
});
