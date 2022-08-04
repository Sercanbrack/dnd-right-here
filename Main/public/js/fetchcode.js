//first do: npm install node-fetch


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const initFetch = () => {
    fetch("https://www.dnd5eapi.co/api/spells/acid-arrow")
      .then(res => res.json())
      .then(data => aResults = data)
      .then(() => console.log(aResults))
}

initFetch()
