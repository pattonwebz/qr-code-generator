import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import InputFields from './components/InputFields';

import './styles.scss';
import QrCodePanel from "./components/QrCodePanel";
import SavedQrCodes from "./components/SavedQrCodes";

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

  return (
    <>
      <main className="content container hero is-fullheight">
          <div className="columns">
              <div className="column is-5">
                  <h1 className="title">QR Code Generator</h1>
                  <p className="subtitle">
                      This is the simplest QR code generator I could come up with to fill my needs.
                  </p>
                  <InputFields
                      qrCodeValue={qrCodeValue}
                      setQrCodeValue={setQrCodeValue}
                      qrCodes={qrCodes}
                      setQrCodes={setQrCodes}
                  />
              </div>
              <div className="column">
                  <QrCodePanel qrCodeValue={qrCodeValue}/>
              </div>
              <div className="column is-4">
                  <SavedQrCodes qrCodes={qrCodes} setQrCodes={setQrCodes} setQrCodeValue={setQrCodeValue}/>
              </div>
          </div>
      </main>
      <footer className="footer navbar is-fixed-bottom">
          <div className="navbar-item is-fullwidth has-text-centered">
              <p>
                  <strong>Simple QR Code Generator</strong> by <a href="https://www/pattonwebz.com/">William Patton</a>. The source code is licensed <a href="https://opensource.org/licenses/isc-license.php">ISC</a>. The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
              </p>
          </div>
      </footer>
    </>
  )
};

ReactDOM.render(<App/>, document.getElementById('root'));
