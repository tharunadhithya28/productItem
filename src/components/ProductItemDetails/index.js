import {Component} from 'react'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    dataInput: '',
    similarData: '',
    api: apiStatus.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({api: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = `https://apis.ccbp.in/products/25`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        brand: fetchedData.brand,
        totalReviews: fetchedData.total_reviews,
        rating: fetchedData.rating,
        availability: fetchedData.availability,
        price: fetchedData.price,
        description: fetchedData.description,
      }
      const similarProducts = fetchedData.similar_products.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        title: eachItem.title,
        style: eachItem.style,
        price: eachItem.price,
        description: eachItem.description,
        brand: eachItem.brand,
        totalReviews: eachItem.total_reviews,
        rating: eachItem.rating,
        availability: eachItem.availability,
      }))

      this.setState({
        dataInput: updatedData,
        similarData: similarProducts,
        api: apiStatus.success,
      })
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  listenIncrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  listenDecrease = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  renderFailureItem = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error"
      />
      <h1> Product Not Found </h1>
      <button> Continue Shopping</button>
    </>
  )

  renderLoadingItem = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductItem = () => {
    const {similarData, quantity} = this.state
    const {dataInput} = this.state
    console.log(similarData)
    const {
      id,
      imageUrl,
      title,
      brand,
      totalReviews,
      rating,
      availability,
      price,
      description,
    } = dataInput
    return (
      <>
        <div>
          <div>
            <img src={imageUrl} className="image1" />
          </div>
          <div>
            <h1 className="summa"> {title} </h1>
            <p> Rs {price}</p>
            <div>
              <p> {rating} </p>
              <p> {totalReviews} </p>
            </div>
            <p> {description} </p>
            <p> {availability} </p>
            <p> {brand} </p>
            <div>
              <button onClick={this.listenIncrease} data-testid="plus">
                <BsPlusSquare />
              </button>
              <p> {quantity} </p>

              <button onClick={this.listenDecrease} data-testid="minus">
                <BsDashSquare />
              </button>
              <button> ADD TO CART</button>
            </div>
          </div>
          <h1> Similar Products </h1>
          <ul className="similar-container">
            {similarData.map(eachItem => (
              <SimilarProductItem productItem={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {dataInput, similarData, api} = this.state
    console.log(similarData)
    const summa = this.props
    const summa1 = summa.match
    console.log(summa1)

    switch (api) {
      case apiStatus.success:
        return this.renderProductItem()
      case apiStatus.failure:
        return this.renderFailureItem()
      case apiStatus.inProgress:
        return this.renderLoadingItem()
      default:
        return null
    }
  }
}
export default ProductItemDetails
