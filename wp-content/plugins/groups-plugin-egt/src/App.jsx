import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/home'
import Members from './pages/members'
import Media from './pages/media'
import Discussions from './pages/discussions'
import About from './pages/about'
import Groups from './pages/groups'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups/:groupId/members" element={<Members />} />
          <Route path="/groups/:groupId/media" element={<Media />} />
          <Route path="/groups/:groupId/discussions" element={<Discussions />} />
          <Route path="/groups/:groupId/about" element={<About />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
