import './App.css';
import { createContext } from "react";
import React, { useState, useEffect } from "react";
import moon from "./images/moon-icon.svg"
import sun from "./images/sun-solid.svg"
import MouseOnMode from "./components/mouseonmode.js"
import Icon from './components/icon'
export const ThemeContext = createContext(null);

// 👇 this is for setting localStorage, on refresh page keeps memory of the theme and mode
const useLocalState = (key, defaultValue) => {
  const [value,setValue] = useState(
    () => {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? defaultValue : JSON.parse(storedValue)
    }
  )
    useEffect(()=> {
      const listener = (e) => {
        if (e.storageArea === localStorage && e.key === key) {
          setValue(JSON.parse(e.newValue))
        }
      }
      window.addEventListener("storage", listener)

      return () => {
        window.removeEventListener("storage", listener)
      }

    }, [key])

  const setValueInLocalSstorage = (newValue) => {
    setValue((currentValue) => {

      const result = typeof newValue === "function" ? newValue(currentValue) : newValue
      localStorage.setItem(key, JSON.stringify(result))
      return result
    })
  }
  return[value, setValueInLocalSstorage]
}


function App() {
//👇 these hooks are for the theme and emoticon which is going to local storage
  const [theme, setTheme] = useLocalState("theme", "light");
  const [mode, setMode] = useLocalState("mode", sun)  

//👇toggleMode is for schanging the sun to moon during toggle theme//
function toggleMode() {
  setMode((setMode) => (setMode === sun ? moon : sun))
}
  const toggleTheme = () => {
  setTheme((curr) =>(curr === "light" ? "dark" : "light" ));
  toggleMode()
//toggle theme calls toggleMode as well, since they happen uniminaously
};

function handleClick() {
  toggleTheme()
  //all important theme functions go here.
}

function toggleRipple(e){
  //it just works this way
  handleClick()
  const btnWrap = document.getElementById('wrap')

  let ripples = document.createElement('span');
 btnWrap.appendChild(ripples);
  setTimeout(() => {
    ripples.remove()
  },950);
  
}

 function toggleSuggestion() {
    const tipSugg = document.getElementById('mouse-event')
        tipSugg.style.display = 'block'

//changes the text concerning current theme 👇 editing the component with textContent
if (mode === sun) {
  tipSugg.textContent = 'Switch to dark'
} else {
  tipSugg.textContent = 'Switch to light'
}
 }
 //👇 toggleSuggestions are a component that hides and shows when hovered on, giving a tip to the user
function toggleSuggestionOff() {
  const tipSugg = document.getElementById('mouse-event')
    tipSugg.style.display = 'none'
}
// function toggleMouseDown() {
//   const tipSugg = document.getElementById('mouse-event')
//     tipSugg.style.display = 'none'
// }

//👇 No functions() below this point 👇 
  return (
<ThemeContext.Provider value={{theme, toggleTheme}}> 

    <div className="App" id={theme}>
      <header>DarkMode Css and React</header>
      <main>
        <h2>Welcome to DarkMode 2.0 
        </h2>
        <p className="__paragraph">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum vero velit reiciendis enim ea pariatur dolore obcaecati illo nam. Optio incidunt voluptate provident quidem maiores!</p>

      <Icon toggleRipple={toggleRipple} toggleSuggestionOff={toggleSuggestionOff} toggleSuggestion={toggleSuggestion} mode={mode}/>
        
        
        <MouseOnMode />

      </main>


    </div>


    </ThemeContext.Provider>
  )
}

export default App;
