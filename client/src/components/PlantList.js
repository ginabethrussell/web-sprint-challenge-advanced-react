import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super()
    this.state = ({
      plants: []
    })
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios.get('http://localhost:3333/plants')
    .then(res => {
        const plantsData = res.data.plantsData;
  
        this.setState({
          plants: [...this.state.plants, ...plantsData]
        })
    })
    .catch(err => console.log(err))
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    // added searchTerm prop from app component input
    const filteredPlants = this.state.plants.filter(plant => plant.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()));
 
    return (
      <main className="plant-list">
        {/* switched this.state?.plants? for filteredState to use searchTerm */}
        {filteredPlants.map((plant) => (
          <div className="plant-card" key={plant.id} data-testid="plant-card">
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
