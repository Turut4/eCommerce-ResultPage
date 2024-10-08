import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Products from "./components/Products/Products";
import { StrictMode } from "react";

export default function App() {
  return (
    <>
      <StrictMode>
        <Header />
        <Banner />
        <Products />
        {/*<Footer /> */}
      </StrictMode>
    </>
  );
}
