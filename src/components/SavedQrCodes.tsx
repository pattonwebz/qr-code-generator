import React, { Dispatch, SetStateAction } from "react";
import {toast} from "bulma-toast";

import {QrCodeInterface} from "../index";

interface SavedQrCodesProps {
    qrCodes: QrCodeInterface[];
    setQrCodes: Dispatch<SetStateAction<QrCodeInterface[]>>;
    setQrCodeValue: Dispatch<SetStateAction<string>>;
}

const savedQrCodes = ({qrCodes, setQrCodes, setQrCodeValue}: SavedQrCodesProps) => {

    const [deleting, setDeleting] = React.useState<string[]>([]);

    const cancelDelete = (qrCodeValue: string) => {
        const updatedDeleting = deleting.filter(value => value !== qrCodeValue);
        setDeleting(updatedDeleting);
    };

    return (
        <>
            <h2>Saved QR Codes</h2>

            <p>QR Codes get saved in your browser local storage and never sent out of your browser.</p>

            {qrCodes.length === 0
                ? (<p>No saved QR codes</p>)
                : (<p>Click any of these codes to restore it in the QR code value section</p>)
            }
            <ul className="savedCodes">
                {qrCodes.map((qrCode: QrCodeInterface) => {
                    return (
                        <li key={qrCode.timestamp}>
                            <pre className="mb-0">{qrCode.value}</pre>

                            <div className="buttons is-fullwidth">
                                <button className="button is-primary has-text-dark is-small" onClick={() => {
                                    setQrCodeValue(qrCode.value);
                                }}>Restore
                                </button>

                                <button className="button is-warning has-text-dark is-small" onClick={() => {
                                    navigator.clipboard.writeText(qrCode.value).then(r => {
                                        toast({
                                            message: "Copied to clipboard!",
                                            type: "is-success",
                                            extraClasses: "has-text-dark",
                                            position: "bottom-right",
                                            duration: 5000
                                        });
                                    });
                                }}>Copy
                                </button>
                                <button className="button is-danger is-small" onClick={() => {

                                    toast({
                                        message: "QR Code deleting in 5 seconds! Cancel by refreshing the page.",
                                        type: "is-danger",
                                        position: "bottom-right",
                                        duration: 5000
                                    });

                                    setDeleting([...deleting, qrCode.value]);

                                    setTimeout(() => {
                                        const filteredQrCodes = qrCodes.filter((code: QrCodeInterface) => code.value !== qrCode.value);
                                        setQrCodes(filteredQrCodes);
                                        localStorage.setItem('qrCodes', JSON.stringify(filteredQrCodes));
                                    }, 5000);

                                }}>Delete
                                </button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default savedQrCodes;
