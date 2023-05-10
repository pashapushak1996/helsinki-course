import './Notification.css';

export const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    const { type, body } = message;

    const className = type === 'success' ? 'notification--success' : 'notification--error';

    return (
        <div className={ `notification ${className}` }>
            { body }
        </div>
    );
};