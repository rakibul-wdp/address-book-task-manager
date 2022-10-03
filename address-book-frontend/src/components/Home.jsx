import React from 'react'
import MainComponent from './MainComponent'
import Header from './Header'

const Home = () => {
  return (
    <>
      <div style={{ height: "fit-content", display: "flex", flexWrap: "wrap" }}>
        <Header />
        <MainComponent />
      </div>
    </>
  )
}

export default Home;