import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactPage from "./components/Contact";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
