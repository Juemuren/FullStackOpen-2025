interface NotificationProps {
  notification: string;
}

const Notification = ({ notification }: NotificationProps) => {
  const style = {
    color: 'red',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
