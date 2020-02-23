/**
 * Footer
 */
import React from 'react';
// app config
import AppConfig from 'Constants/AppConfig';

const Footer = () => (
   <div className="rct-footer d-flex justify-content-between align-items-center">
      <ul className="list-inline footer-menus mb-0">
      </ul>
      <h5 className="mb-0">{AppConfig.copyRightText}</h5>
   </div>
);

export default Footer;
