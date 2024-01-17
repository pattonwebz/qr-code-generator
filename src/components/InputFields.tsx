import React from "react";
import {toast} from "bulma-toast";
import {QrCodeInterface} from "../index";

interface InputFieldsProps {
    qrCodeValue: string;
    setQrCodeValue: React.Dispatch<React.SetStateAction<string>>;
    qrCodes: QrCodeInterface[];
    setQrCodes: React.Dispatch<React.SetStateAction<QrCodeInterface[]>>;
}

const InputFields = ({qrCodeValue, setQrCodeValue, qrCodes, setQrCodes}: InputFieldsProps) => {


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQrCodeValue(event.target.value);
    };

    const handleSaveClick = () => {
        if (!qrCodeValue || qrCodeValue === '') {
            return;
        }

        // check if this value already exists
        const alreadyExists = qrCodes.find((qrCode: any) => qrCode.value === qrCodeValue);
        if (alreadyExists) {
            // notify and don't add it again
            toast({
                message: "QR Code already exists",
                type: "is-warning",
                position: "bottom-right",
                duration: 5000
            });
            return;
        }

        const codesToSave = [...qrCodes];

        codesToSave.push({
            value: qrCodeValue,
            timestamp: new Date().getTime(),
        });

        // update the state
        console.log('updating qrCodes');
        setQrCodes(codesToSave);

        localStorage.setItem('qrCodes', JSON.stringify(codesToSave));

        // notify about the save
        toast({
            message: "QR Code saved!",
            type: "is-success",
            position: "bottom-right",
            duration: 5000
        });
    };

    return (
        <div className="field">
            <label className="label">Content</label>
            <div className="control mb-3">
                <input className="input" type="text" placeholder="Text input" value={qrCodeValue}
                       onChange={handleInputChange}
                       maxLength={2048}
                />
            </div>
            <button className="button is-primary has-text-dark" onClick={handleSaveClick}>Save</button>
        </div>
    )
}

export default InputFields;
