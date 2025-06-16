import '../styles/globals.css';
// pages/_app.js
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Prevent Font Awesome from automatically adding CSS

