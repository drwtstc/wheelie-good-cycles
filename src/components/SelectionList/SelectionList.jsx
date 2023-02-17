import SelectionListItem from '../SelectionListItem/SelectionListItem';

export default function SelectionList({ selectionItems, handleAddToOrder }) {
  const products = selectionItems.map(product =>
    <SelectionListItem
      key={product._id}
      handleAddToOrder={handleAddToOrder}
      selectionItem={product}
    />
  );
  return (
    <main className="MenuList">
      {products}
    </main>
  );
}