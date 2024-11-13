import MainButton from "../../../../components/main-button";
import Layout from "../../../layout";
import useAddToList from "./useAddToList";

export default function AddToList() {
  const { articleData, displayForm, lists, addToList, createList, cancelCreateList, onNameChange, onPrivateChange, submitList } = useAddToList();

  return (
    <Layout>
      <h2>Add to list</h2>
      <p>Article : <strong>{ articleData?.title }</strong></p>

      <br />
      <hr />
      <h3>Lists</h3>
      <br />
      { !displayForm && (<MainButton onClick={createList}>Create a new list</MainButton>) }
      { displayForm && (
        <form onSubmit={ submitList }>
          <label htmlFor="listName">List Name</label><br />
          <input type="text" id="listName" onChange={ onNameChange }/>
          <br />
          <label htmlFor="private">Private list</label>
          <input type="checkbox" id="private" onChange={ onPrivateChange } />
          <br />
          <MainButton>Create</MainButton>
          <MainButton onClick={cancelCreateList}>Cancel</MainButton>
        </form>
      ) }
      <br />
      {
        lists.length === 0 ? (<p>No lists found</p>) : (
          <ul>
            { lists.map(list => (
              <li key={list}>
                <p onClick={() => addToList(list.ID_List)}>Add to {list.list_name}</p>
              </li>
            )) }
          </ul>
        )
      }
    </Layout>
  )
}
