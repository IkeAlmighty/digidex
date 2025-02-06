import { useEffect, useState } from "react"
import SubscriptionComponent from "../components/SubscriptionComponent";

function ManageSubsPage() {

    const styles = {
        addButton: {
            padding: "0.3rem"
        }
    }

    const [subscriptions, setSubscriptions] = useState(["ike/work"]);
    const [newSubscription, setNewSubscription] = useState("");

    useEffect(loadSubscriptions, []);

    function loadSubscriptions() {

    }

    function handleRemoveSubscription(tag) {
        // console.log(e.target.getAttribute('tag'));
        setSubscriptions(subscriptions.filter(s => s !== tag))
    }

    function handleAddSubscription() {

        // update ui
        setSubscriptions([...subscriptions, newSubscription]);

        // TODO: update backend

        // TODO: if backend fails, remove the newly addedSubscription and send toast error:
    }

    return (
        <>
            <div>
                <h2>Manage Subscriptions Page</h2>
            </div>
            {subscriptions.map(tag => <SubscriptionComponent tag={tag} onTrash={() => handleRemoveSubscription(tag)} />)}

            <hr />
            <input style={styles.addButton} type="text" onChange={(e) => setNewSubscription(e.target.value)} />
            <button onClick={handleAddSubscription}>+</button>
        </>
    )
}

export default ManageSubsPage
