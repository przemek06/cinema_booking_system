import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBIcon } from 'mdb-react-ui-kit';

const footerStyle = {
    backgroundColor: '#584B53',
    color: '#FEF5EF',
    position: 'absolute',
    left:0,
    bottom:-40,
    right:0,
    padding: "5px"
  };

  const aStyle = {
    padding: "5px",
    color: '#FEF5EF'
  };

export default function Footer() {
  return (
    <MDBFooter style={footerStyle}>
      <section style={{textAlign: 'center', margin: '20px'}}>
        <div>
          <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
            <MDBIcon fab icon="youtube" />
          </a>
          <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
            <MDBIcon fab icon="instagram" />
          </a>
        </div>
      </section>
      <section style={{textAlign: 'center'}}>
        <MDBContainer>
          <MDBRow>
            <h5>
                Silver Screen Cinema
            </h5>
              <p>
                123 Main Street, Anytown | info@example.com | + 01 234 567 88
              </p>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}