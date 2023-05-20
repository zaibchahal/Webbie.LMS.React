import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import "./style.css";

const NoData = (props) => {
    const {
        message,
        showNew = false,
        opacities,
        isLink = false,
        addNewTitle,
        height,
        ...rest
    } = props;
    const checkHeight = () => {
        return window.innerHeight;
    };
    useEffect(() => {
        const handleResize = () => {
            checkHeight();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            style={{
                ...props.style,
                height: height || `calc(${checkHeight()}px - 480px)`,
            }}

            className="NoDataWrapper"
        >
            <div>
                <div
                    style={{
                        transform: "translate(-30%, -30%)",
                        top: "50%",
                        left: "50%",
                        position: "absolute",
                        textAlign: "center",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="39"
                        viewBox="0 0 42 39"
                    >
                        <path
                            fill="#363A3E"
                            fillRule="evenodd"
                            d="M1.917 22.254l3.879-1.066.223.8 3.924-1.065.446 1.555 9.897-2.666v7.062l-7.266 11.15 1.515.976 6.599-10.217L27.733 39l1.515-.977-7.222-11.149v-7.551l9.586-2.577.268 1.065L42 16.612 37.451 0l-9.317 4.086.268 1.066-21.223 5.73.446 1.556L3.7 13.503l.223.8L0 15.368l1.917 6.886zM36.293 2.443l3.433 12.615-6.51.8-2.942-10.75 6.019-2.665zM28.891 6.84l2.23 8.172-19.53 5.33-2.228-8.172L28.89 6.84zm-20.82 7.33l1.382 5.062-2.229.622-1.383-5.063 2.23-.622zM4.37 16.034l.937 3.465-2.14.578-.981-3.466 2.184-.577z"
                            opacity=".507"
                        />
                    </svg>
                    <div
                        style={{
                            fontSize: "14px",
                            color: "#363a3e",
                            opacity: "0.51",
                            paddingTop: "3px",
                            fontWeight: "bold",
                            letterSpacing: "-0.36px",
                        }}
                    >
                        {message || "Nothing to see here !"}
                    </div>
                    {showNew ? (
                        <div
                            {...rest}
                            className="lineHover"
                            style={{
                                fontSize: "13.5px",
                                color: "#ef7db2",
                                paddingTop: "3px",
                                fontWeight: "normal",
                                letterSpacing: "-0.36px",
                                display: "flex",
                                justifyContent: "center",
                                opacity: opacities,
                                cursor: "pointer",
                            }}
                        >
                            <span
                                style={{
                                    color: "#ef7db2",
                                    marginRight: "5px",
                                    marginBottom: "2px",
                                }}
                            >
                                {addNewTitle || "Add new"}
                            </span>
                            <span className="pluseIconStyle">+</span>
                        </div>
                    ) : null}
                    {isLink ? (
                        <div
                            {...rest}
                            style={{
                                fontSize: "13.5px",
                                paddingTop: "3px",
                                fontWeight: "normal",
                                letterSpacing: "-0.36px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <p
                                style={{
                                    color: "#007bff",
                                    cursor: "pointer",
                                    marginRight: "15px",
                                }}
                                target="_blank"
                                to={{ pathname: isLink }}
                            >
                                {addNewTitle || "Add new"}
                            </p>{" "}
                            <span
                                className="plusButton"
                                style={{
                                    position: "relative",
                                    fontSize: "22.5px",
                                    top: "-5px",
                                    color: "#007bff",
                                    cursor: "default",
                                }}
                            >
                                +
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};


NoData.propTypes = {
    message: PropTypes.string,
    showNew: PropTypes.bool,
    opacities: PropTypes.number,
    isLink: PropTypes.bool,
    addNewTitle: PropTypes.string,
    height: PropTypes.string,
    style: PropTypes.object,
};

export default NoData;
