import './index.css'

const SimilarProductItem = props => {
  const {productItem} = props
  const {
    id,
    imageUrl,
    title,
    style,
    price,
    description,
    brand,
    totalReviews,
    rating,
    availability,
  } = productItem

  return (
    <li>
      <img src={imageUrl} className="image" />
      <h1> {title} </h1>
      <p> {brand} </p>
      <div>
        <p> {rating} </p>
        <p> {price}</p>
      </div>
    </li>
  )
}
export default SimilarProductItem
