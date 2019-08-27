import { createGlobalStyle } from 'styled-components';

import IcomoonFontWoff from 'assets/fonts/icomoon.woff?za0i1s';
import IcomoonFontTtf from 'assets/fonts/icomoon.ttf?za0i1s';
import IcomoonFontEot from 'assets/fonts/icomoon.eot?za0i1s#iefix';
import IcomoonFontSvg from 'assets/fonts/icomoon.svg?za0i1s#icomoon';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  A {
    text-decoration: none;
    color: #4B3F8F;
  }

  A:hover {
    text-decoration: none;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  @media only screen and (max-width: 863px) {
    #app {
      min-height: calc(100vh - 56px);
    }
    body {
      height: calc(100vh - 56px);
    }
  }

  @font-face {
    font-family: 'icomoon';
    src:  url(${IcomoonFontWoff});
    src:  url(${IcomoonFontWoff}) format('woff'),
          url(${IcomoonFontEot}) format('embedded-opentype'),
          url(${IcomoonFontTtf}) format('truetype'),
          url(${IcomoonFontSvg}) format('svg');
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    font-size: 14pt;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-car_park:before {
    content: "\\e915";
  }
  .icon-coffea_tea_maker:before {
    content: "\\e916";
  }
  .icon-landry_service:before {
    content: "\\e917";
  }
  .icon-safety_deposit_boxes:before {
    content: "\\e918";
  }
  .icon-refrigerator:before {
    content: "\\e919";
  }
  .icon-room_service:before {
    content: "\\e91a";
  }
  .icon-airport_transfer:before {
    content: "\\e91b";
  }
  .icon-telephone:before {
    content: "\\e91c";
  }
  .icon-hair_dryer:before {
    content: "\\e91d";
  }
  .icon-ac:before {
    content: "\\e91e";
  }
  .icon-fan:before {
    content: "\\e91f";
  }
  .icon-sofa:before {
    content: "\\e920";
  }
  .icon-Wake-up_service:before {
    content: "\\e921";
  }
  .icon-mirror:before {
    content: "\\e922";
  }
  .icon-satellite:before {
    content: "\\e923";
  }
  .icon-garden:before {
    content: "\\e924";
  }
  .icon-swimming_pool:before {
    content: "\\e925";
  }
  .icon-bar:before {
    content: "\\e926";
  }
  .icon-spa:before {
    content: "\\e927";
  }
  .icon-shower:before {
    content: "\\e928";
  }
  .icon-massage:before {
    content: "\\e929";
  }
  .icon-wifi:before {
    content: "\\e92a";
  }
  .icon-pets_allowed:before {
    content: "\\e92b";
  }
  .icon-Pets_not_allowed:before {
    content: "\\e92c";
  }
  .icon-concierge:before {
    content: "\\e92d";
  }
  .icon-fitness_center:before {
    content: "\\e92e";
  }
  .icon-restaurant:before {
    content: "\\e92f";
  }
  .icon-free_breakfast:before {
    content: "\\e930";
  }
  .icon-elevator:before {
    content: "\\e931";
  }
  .icon-towels:before {
    content: "\\e932";
  }
  .icon-done:before {
    content: "\\e900";
  }
  .icon-menu:before {
    content: "\\e901";
  }
  .icon-new:before {
    content: "\\e902";
  }
  .icon-return:before {
    content: "\\e903";
  }
  .icon-viewer:before {
    content: "\\e904";
  }
  .icon-back:before {
    content: "\\e905";
  }
  .icon-close:before {
    content: "\\e906";
  }
  .icon-img:before {
    content: "\\e907";
  }
  .icon-notification:before {
    content: "\\e908";
  }
  .icon-go:before {
    content: "\\e909";
  }
  .icon-heart_empty:before {
    content: "\\e90a";
  }
  .icon-heart_full:before {
    content: "\\e90b";
  }
  .icon-map:before {
    content: "\\e90c";
  }
  .icon-ads:before {
    content: "\\e90d";
  }
  .icon-calendar:before {
    content: "\\e90e";
  }
  .icon-chat:before {
    content: "\\e90f";
  }
  .icon-search:before {
    content: "\\e910";
  }
  .icon-dashboard:before {
    content: "\\e911";
  }
  .icon-gains:before {
    content: "\\e912";
  }
  .icon-reservation:before {
    content: "\\e913";
  }
  .icon-bed:before {
    content: "\\e914";
  }

`;

export default GlobalStyle;
