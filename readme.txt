npx create-react-app reh-mui-stock --template typescript
yarn add @mui/material @emotion/react @emotion/styled
yarn add @mui/icons-material
yarn add @reduxjs/toolkit react-redux
yarn add react-router-dom



https://mui.com/material-ui/customization/how-to-customize/


State	Global class name
active	.Mui-active
checked	.Mui-checked
completed	.Mui-completed
disabled	.Mui-disabled
error	.Mui-error
expanded	.Mui-expanded
focus visible	.Mui-focusVisible
focused	.Mui-focused
required	.Mui-required
selected	.Mui-selected



- npx tailwindcss init -p
- In index.css, add the last line

  @tailwind components;
  @tailwind utilities;

- In tailwind.config.js, update content and important

    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    important: '#root',
    theme: {
        extend: {},
    },
    plugins: [],
    }

- copy and paste InjectTailwind.tsx in src
- In index.tsx,   
  import InjectTailwind from './InjectTailwind' 
    and 
  <InjectTailwind>
      <App />
  </InjectTailwind>




# vscode extension for tailwind
bradlc.vscode-tailwindcss

# document
https://tailwindcss.com/

# Useful example 
<div className="hover:text-yellow-400">1234</div>


# youtube
https://www.youtube.com/watch?v=hgMP2ulxPlA


1. add packages 
yarn add @craco/craco

2. create craco.config.js

        const path = require('path')

        module.exports = {
        webpack: {
            alias: {
            '@': path.resolve(__dirname, 'src')
            }
        }
        }


3. revise tsconfig.json

"baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/features/*": ["features/*"],
      "@/hooks/*": ["hooks/*"],
      "@/types/*": ["types/*"],
      "@/utils/*": ["utils/*"]
    }

4. update package.json

  "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "craco eject"
    },

4. stop and start again

5. everytime you need to add more alias, you have to add in paths: {...}   