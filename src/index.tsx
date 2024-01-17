import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';
import InputFields from './components/InputFields';

import { toast } from 'bulma-toast';

import './styles.scss';

export interface QrCodeInterface {
    value: string;
    timestamp: number;
}

const App = () => {

  const [qrCodes, setQrCodes] = useState<QrCodeInterface[]>([]);
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
      const retrievedArrayString = localStorage.getItem('qrCodes');
      const parsedQrCodes = retrievedArrayString ? JSON.parse(retrievedArrayString) : [];

      setQrCodes(parsedQrCodes);

      if (parsedQrCodes.length > 0) {
        setQrCodeValue(parsedQrCodes[parsedQrCodes.length - 1].value);
      }
  }, []);

  const restoreQrCode = (event: React.MouseEvent<HTMLPreElement, MouseEvent>) => {
    const qrCodeValue = event.currentTarget.innerText;
    setQrCodeValue(qrCodeValue);
  }

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
    <main className="content container">
      <div className="columns">
        <div className="column is-5">
          <h1 className="title">QR Code Generator</h1>
          <p className="subtitle">
            This is the simplest QR code generator I could come up with to fill my needs.
          </p>
          <p>You can save your past QR codes to local storage as well in case you need to retrieve them later.</p>
          <InputFields
            qrCodeValue={qrCodeValue}
            setQrCodeValue={setQrCodeValue}
            qrCodes={qrCodes}
            setQrCodes={setQrCodes}
            />
        </div>
        <div className="column">
          <div className="qrcode">
            <h2>QR Code</h2>
            <div className="qrcode--container">
              <QRCode value={qrCodeValue}/>
            </div>
            <button className="button is-primary has-text-dark" onClick={handleSaveSvgClick}>Save SVG</button>
          </div>
        </div>
        <div className="column is-variable">
          <h2>Saved QR Codes</h2>

          <p>QR Codes get saved in your browser local storage and never sent out of your browser.</p>

          {qrCodes.length === 0
            ? (<p>No saved QR codes</p>)
            :(<p>Click any of these codes to restore it in the QR code value section</p>)
          }
            <ul className="savedCodes">
              {qrCodes.map ((qrCode: QrCodeInterface) => {
                return (
                    <li key={qrCode.timestamp}>
                      <pre>{qrCode.value}</pre>

                      <div className="buttons is-fullwidth">
                        <button className="button is-primary has-text-dark is-small" onClick={() => {
                          setQrCodeValue(qrCode.value);
                        }}>Restore
                        </button>

                        <button className="button is-warning has-text-dark is-small" onClick={() => {
                          navigator.clipboard.writeText(qrCode.value);
                          toast({
                            message: "Copied to clipboard!",
                            type: "is-success",
                            position: "bottom-right",
                            duration: 5000
                          });
                        }}>Copy
                        </button>
                        <button className="button is-danger is-small" onClick={() => {
                          const filteredQrCodes = qrCodes.filter((code: QrCodeInterface) => code.value !== qrCode.value);
                          setQrCodes(filteredQrCodes);
                          localStorage.setItem('qrCodes', JSON.stringify(filteredQrCodes));
                        }}>Delete
                        </button>
                      </div>

                    </li>
                )
              })}
            </ul>

        </div>
      </div>
    </main>
  )
};

ReactDOM.render(<App/>, document.getElementById('root'));
