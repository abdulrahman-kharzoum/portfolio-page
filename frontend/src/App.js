import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { N8n } from '@lobehub/icons';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// 3D Robot Model Component
const RobotModel = () => {
  const { scene } = useGLTF('/models/ai_robot.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={[1, 1, 1]} 
      rotation={[0, -Math.PI / 6, 0]} // 30 degrees to the left
      position={[0, 0, 0]}
    />
  );
};

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div>
      <header className="App-header">
        <a
          className="App-link"
          href="https://emergent.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" />
        </a>
        
        <div className="mt-8 flex flex-col items-center space-y-6">
          <p className="text-xl">Building something incredible ~!</p>
          
          {/* AI Automation Project Section */}
          <div className="flex items-center justify-center space-x-8">
            {/* n8n Logo */}
            <div className="flex flex-col items-center">
              <N8n.Combine size={56} type={'color'}/>
              <p className="mt-2 text-sm text-gray-300">n8n Automation</p>
            </div>
            
            {/* 3D Robot Model */}
            <div className="w-32 h-32">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Stage environment="city" intensity={0.6}>
                  <RobotModel />
                </Stage>
              </Canvas>
            </div>
            
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-300">AI Robot Assistant</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
