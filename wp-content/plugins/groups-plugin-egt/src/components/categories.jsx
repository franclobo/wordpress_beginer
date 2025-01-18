import { useState, useEfect } from 'react'
const Categories = () => {
  const categories = [ "All", "Colombia", "Ecuador", "Peru", "Bolivia", "Chile" ]
  const [selected, setSelected] = useState('All')
  const [active, setActive] = useState(false)

  const handleClick = (category) => {
    setSelected(category)
    setActive(!active)
  }


  return (
    <div className="categories">
      <p>Country:</p>
      {active && (
        <div className="dropdown">
          {categories.map((category, index) => (
            <button key={index} onClick={() => handleClick(category)}>{category}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories
