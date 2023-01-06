import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import Footer from "../Footer/Footer"
import  AnimatedRoutes  from "../AnimatedRoutes/AnimatedRoutes";


export default function App() {
    return (
      <div>
        <Router>
          <AnimatedRoutes />
        <Footer/>
        </Router>
      </div>
    );
  // }
}