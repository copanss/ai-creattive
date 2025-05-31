
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...urls]);
  };

  const handleRemix = async () => {
    if (!prompt) {
      alert('Enter a prompt!');
      return;
    }

    const res = await axios.post('/api/generate', { prompt });
    setGeneratedImages(res.data.images);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">AI Image Remixer</h1>

      <input type="file" multiple accept="image/*" onChange={handleUpload} className="mb-4" />

      <div className="flex flex-wrap gap-4 mb-6">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Uploaded ${i}`} className="w-40 h-40 object-cover rounded" />
        ))}
      </div>

      <input
        type="text"
        placeholder="Describe how you want to remix these"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border px-4 py-2 rounded w-80 mb-4"
      />
      <button onClick={handleRemix} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
        Remix Images
      </button>

      <div className="flex flex-wrap gap-4 mt-6">
        {generatedImages.map((src, i) => (
          <img key={i} src={src} alt={`Remixed ${i}`} className="w-40 h-40 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}
