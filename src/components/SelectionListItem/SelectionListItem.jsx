export default function SelectionListItem({ selectionItem, handleAddToOrder }) {
    return (
      <div className="SelectionListItem">
        <div className="emoji flex-ctr-ctr">{selectionItem.brand}</div>
        <div className="name">{selectionItem.name}</div>
        <div className="buy">
          <span>${selectionItem.price.toFixed(2)}</span>
          <button className="btn-sm" onClick={() => handleAddToOrder(selectionItem._id)}>
            ADD
          </button>
        </div>
      </div>
    );
  }