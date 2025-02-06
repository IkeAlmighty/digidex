import TrashButton from "./TrashButton";

export default function SubscriptionComponent({ tag, onTrash }) {

    const styles = {
        rootContainer: {
            display: "flex",
            alignItems: "center",
            flexDirection: 'row',
            maxWidth: "400px",
            justifyContent: "space-between",
            backgroundColor: "lightgray",
            padding: "0.3rem",
            borderRadius: "5px"
        },
        buttonContainer: {

        }
    }

    return (
        <div style={styles.rootContainer}>
            <span>{tag}</span>
            <span style={styles.buttonContainer}>
                <TrashButton onClick={onTrash} />
            </span>
        </div>
    );
}