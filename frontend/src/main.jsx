/**
 * @project     WhatsApp Food Automation
 * @author      Vanessa Gomes <vanessagomes@gmail.com>
 * @copyright   2026 Vanessa Gomes. Todos os direitos reservados.
 * @license     Proprietary / All rights reserved
 * * Este código é de autoria exclusiva e não pode ser redistribuído 
 * ou alterado sem autorização prévia.
 */
// Assinatura de Autoria 
console.log(
  "%c🛡️ SISTEMA PROTEGIDO",
  "background: #4f46e5; color: white; padding: 5px 10px; border-radius: 5px; font-weight: bold;"
);
console.log(
  "%cEste software é propriedade de Vanessa Gomes. Todos os direitos reservados 2026.",
  "color: #6366f1; font-style: italic;"
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
