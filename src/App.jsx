//  import { useState } from 'react'

//  import reactLogo from './assets/react.svg'
//  import viteLogo from '/vite.svg'
//  import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// import { people } from './data.js';
// import { getImageUrl } from './utils.js';

// export default function List() {
//   const chemists = people.filter(person =>
//     person.profession !== 'chemist'
//   );

//   const everryoneElse = people.filter(person =>
//     person.profession !== 'chemist'
//   );
//   // ตะกร้าสินค้า
//   cons [cart, setCart] = useState([])

//   function addToCart(prd){
//     //เพิ่มรายการสินค้าในตะกร้า
//     //cart [ {prd} ]
//     setArtists( // Replace the state
//       [ // with a new array
//         ...artists, // that contains all the old items
//         { id: nextId++, name: name } // and one new item at the end
//       ]
//     );
//     console.log(cart);
//       }
//       return (
  
//         <article>
//           <h1>Shopping Cart</h1>
//           {cart.map(product=>
//           <p key={product.id}>{product.name}</p> )}
//           <ul>{listItems}</ul>
//         </article>);
          
//       }

import { useState } from 'react';
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
        onClick={()=>addToCart(person)}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );

  //ตะกร้าสินค้า
  const [cart, setCart] = useState([]);

  function addToCart(prd){
    //เพิ่มรายการสินค้าในตะกร้า
    // cart[ {prd},{prd},{prd}.. ]
    setCart( // Replace the state
      [ // with a new array
        ...cart, // that contains all the old items
        prd // and one new item at the end
      ]
    );
    console.log(cart);

  }
  return (
  
  <article>
    <h1>Shopping Cart</h1>
    {cart.map(product=>
    <p key={product.id}>{product.name}</p> )}
    <ul>{listItems}</ul>
  </article>);
    
}


