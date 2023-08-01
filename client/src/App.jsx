import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddNote from "./routes/Home/add-note";
import Update from "./routes/Home/note";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/note/:id" element={<Update />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
