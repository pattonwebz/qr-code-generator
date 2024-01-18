import QRCode from "react-qr-code";
import React from "react";

interface QrCodePanelProps {
    qrCodeValue: string;
}

const QrCodePanel = ({qrCodeValue}: QrCodePanelProps )=> {

    const handleSaveSvgClick = () => {
        // Get the SVG element
        const svgElement = document.querySelector('.qrcode--container svg');

        if (!svgElement) {
            console.error('SVG element not found');
            return;
        }

        // Serialize the SVG to a string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);

        // Convert the SVG string to a data URI
        const dataUri = 'data:image/svg+xml;base64,' + btoa(svgString);

        // Create a new 'a' element
        const link = document.createElement('a');

        // Set the 'href' and 'download' attributes
        link.href = dataUri;
        link.download = 'qrcode.svg';

        // Trigger a click on the 'a' element to start the download
        link.click();
    };

    return (
        <div className="qrcode">
            <h2>QR Code</h2>
            <div className="qrcode--container mb-3">
                <QRCode value={qrCodeValue}/>
            </div>
            <button className="button is-primary has-text-dark" onClick={handleSaveSvgClick}>Save SVG</button>
        </div>
    );
}

export default QrCodePanel;
