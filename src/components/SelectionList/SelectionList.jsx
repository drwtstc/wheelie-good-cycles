import SelectionListItem from '../SelectionListItem/SelectionListItem';
import './SelectionList.css'

export default function SelectionList({ selectionItems, handleAddToOrder }) {
  const products = selectionItems.map(product =>
    <SelectionListItem
      key={product._id}
      handleAddToOrder={handleAddToOrder}
      selectionItem={product}
    />
  );
  return (
    <main className="SelectionList">
      {products}
    </main>
  );
}