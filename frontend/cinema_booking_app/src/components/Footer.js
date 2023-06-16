import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const footerStyle = {
  backgroundColor: '#584B53',
  color: '#FEF5EF',
  position: 'relative',
  left: 0,
  bottom: 0,
  width: '100%',
  padding: '5px 0 0',
  margin: '-20px 0 0'
};

const aStyle = {
  padding: '5px',
  color: '#FEF5EF',
};

const centerContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  lineHeight: '0',
  paddingTop: '10px',
  paddingBottom: '10px',
};

export default function Footer() {
  return (
    <MDBFooter style={footerStyle}>
      <MDBContainer style={centerContentStyle}>
        <MDBRow style={{ margin: '0' }}>
          <MDBCol>
            <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
              <MDBIcon fab icon='facebook-f' />
            </a>
            <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
              <MDBIcon fab icon='twitter' />
            </a>
            <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
              <MDBIcon fab icon='youtube' />
            </a>
            <a style={aStyle} href='https://www.temporary-url.com/A9BA7'>
              <MDBIcon fab icon='instagram' />
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ margin: '0' }}>
          <MDBCol>
            <h5>Silver Screen Cinema</h5>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ margin: '0' }}>
          <MDBCol>
            <p>
              123 Main Street, Anytown | info@example.com | + 01 234 567 88
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}
