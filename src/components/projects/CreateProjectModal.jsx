export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");
    if (onCreate) {
      onCreate({ name, description });
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Create project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input name="name" required />
          </label>
          <label>
            <span>Description</span>
            <textarea name="description" rows="3" />
          </label>
          <div className="modal__actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
