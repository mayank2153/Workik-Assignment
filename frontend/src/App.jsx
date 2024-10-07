import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login.jsx';
import GitHubRepos from './components/githubRepos.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/repos/:userId" element={<GitHubRepos />} />
      </Routes>
    </Router>
  );
}

export default App;
