function Form({ button, keyboardEvent, register, update, remove, obj, cancel }) {
    return (
        <form>
            <input type="text" value={obj.name} onChange={keyboardEvent} name="name" placeholder="Name" className="form-control" />
            <input type="text" value={obj.brand} onChange={keyboardEvent} name="brand" placeholder="Brand" className="form-control" />

            {
                button
                    ?
                    <input type="button" value="Register" onClick={register} className="btn btn-primary" />
                    :
                    <div>
                        <input type="button" value="Update" onClick={update} className="btn btn-warning" />
                        <input type="button" value="Delete" onClick={remove} className="btn btn-danger" />
                        <input type="button" value="Cancel" onClick={cancel} className="btn btn-secondary" />
                    </div>
            }
        </form>
    )
}

export default Form;