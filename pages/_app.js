// Import Font Awesome config BEFORE importing the CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Disable automatic CSS injection
import "@fortawesome/fontawesome-svg-core/styles.css";

// Global styles
import '../styles/globals.css';

// Third-party styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
