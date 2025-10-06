import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Not: Render süreci ile React Componentler doma yansır.
// Uygulamanın başlangıç noktasıdır.
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
